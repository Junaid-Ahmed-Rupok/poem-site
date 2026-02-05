import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/api-client';
import AdminLayout from '@/components/AdminLayout';

const UploadMusicPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titleBengali: '',
    titleEnglish: '',
    artist: '',
    album: '',
    audio: null as File | null,
    image: null as File | null,
    duration: 0,
    isPublished: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormData(prev => ({ ...prev, [name]: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!formData.audio) {
      setError('অডিও ফাইল আপলোড করুন');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('title_bengali', formData.titleBengali);
      data.append('title_english', formData.titleEnglish);
      data.append('artist', formData.artist);
      data.append('album', formData.album);
      data.append('audio', formData.audio);
      if (formData.image) {
        data.append('image', formData.image);
      }
      data.append('duration', String(formData.duration));
      data.append('is_published', String(formData.isPublished));

      await apiClient.createMusicTrack(data);
      setSuccess(true);
      setFormData({
        titleBengali: '',
        titleEnglish: '',
        artist: '',
        album: '',
        audio: null,
        image: null,
        duration: 0,
        isPublished: true,
      });

      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload music');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  return (
    <>
      <Head>
        <title>সঙ্গীত যোগ করুন | Bangla Kobita Admin</title>
      </Head>

      <AdminLayout onLogout={handleLogout}>
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
            নতুন সঙ্গীত যোগ করুন
          </h1>
          <p className="text-gray-600 dark:text-gray-400 bengali-text mb-8">
            আপনার গান বা অডিও ট্র্যাক আপলোড করুন এবং শ্রোতাদের সাথে ভাগ করুন
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              সঙ্গীত সফলভাবে আপলোড হয়েছে! ড্যাশবোর্ডে ফিরছি...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="titleBengali"
                placeholder="গানের শিরোনাম (বাংলা)"
                value={formData.titleBengali}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bengali-text"
                required
              />
              <input
                type="text"
                name="titleEnglish"
                placeholder="Song Title (English)"
                value={formData.titleEnglish}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                name="artist"
                placeholder="শিল্পী"
                value={formData.artist}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bengali-text"
                required
              />
              <input
                type="text"
                name="album"
                placeholder="অ্যালবাম"
                value={formData.album}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bengali-text"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 bengali-text font-semibold mb-2">
                অডিও ফাইল (MP3, WAV, M4A, FLAC)
              </label>
              <input
                type="file"
                name="audio"
                accept="audio/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
              {formData.audio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  নির্বাচিত ফাইল: {formData.audio.name}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 bengali-text font-semibold mb-2">
                সময়কাল (সেকেন্ড)
              </label>
              <input
                type="number"
                name="duration"
                placeholder="240"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 bengali-text font-semibold mb-2">
                অ্যালবাম কভার ছবি
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300 bengali-text">
                  প্রকাশ করুন
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50 bengali-text"
            >
              {loading ? 'আপলোড হচ্ছে...' : 'সঙ্গীত যোগ করুন'}
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default UploadMusicPage;
