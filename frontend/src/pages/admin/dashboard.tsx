import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import AdminLayout from '@/components/AdminLayout';

interface Stats {
  totalPoems: number;
  totalStories: number;
  totalMusic: number;
  totalViews: number;
}

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    totalPoems: 0,
    totalStories: 0,
    totalMusic: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await apiClient.getDashboardStats();
        setStats(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  if (loading) return <div className="text-center p-8">লোডিং...</div>;

  return (
    <>
      <Head>
        <title>প্রশাসক ড্যাশবোর্ড | Bangla Kobita</title>
      </Head>

      <AdminLayout onLogout={handleLogout}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
              ড্যাশবোর্ড
            </h1>
            <p className="text-gray-600 dark:text-gray-400 bengali-text">
              আপনার সামগ্রী পরিচালনা করুন এবং পরিসংখ্যান দেখুন
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="text-gray-600 dark:text-gray-400 bengali-text text-sm">
                মোট কবিতা
              </div>
              <div className="text-3xl font-bold text-primary mt-2">
                {stats.totalPoems}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="text-gray-600 dark:text-gray-400 bengali-text text-sm">
                মোট গল্প
              </div>
              <div className="text-3xl font-bold text-secondary mt-2">
                {stats.totalStories}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="text-gray-600 dark:text-gray-400 bengali-text text-sm">
                মোট সঙ্গীত
              </div>
              <div className="text-3xl font-bold text-accent mt-2">
                {stats.totalMusic}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="text-gray-600 dark:text-gray-400 bengali-text text-sm">
                মোট দর্শন
              </div>
              <div className="text-3xl font-bold text-green-600 mt-2">
                {stats.totalViews}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/admin/upload-poem">
              <a className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer">
                <div className="text-2xl mb-2">✍️</div>
                <h3 className="font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                  কবিতা যোগ করুন
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 bengali-text">
                  নতুন কবিতা আপলোড করুন এবং প্রকাশ করুন
                </p>
              </a>
            </Link>

            <Link href="/admin/upload-story">
              <a className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer">
                <div className="text-2xl mb-2">📖</div>
                <h3 className="font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                  গল্প যোগ করুন
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 bengali-text">
                  নতুন গল্প বা উপন্যাস আপলোড করুন
                </p>
              </a>
            </Link>

            <Link href="/admin/upload-music">
              <a className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer">
                <div className="text-2xl mb-2">🎵</div>
                <h3 className="font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                  সঙ্গীত যোগ করুন
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 bengali-text">
                  নতুন গান বা অডিও ট্র্যাক আপলোড করুন
                </p>
              </a>
            </Link>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default DashboardPage;
