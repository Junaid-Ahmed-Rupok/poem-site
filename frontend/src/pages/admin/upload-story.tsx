import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/api-client';
import AdminLayout from '@/components/AdminLayout';

const UploadStoryPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titleBengali: '',
    titleEnglish: '',
    descriptionBengali: '',
    descriptionEnglish: '',
    contentBengali: '',
    contentEnglish: '',
    image: null as File | null,
    category: 'story',
    isPublished: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title_bengali', formData.titleBengali);
      data.append('title_english', formData.titleEnglish);
      data.append('description_bengali', formData.descriptionBengali);
      data.append('description_english', formData.descriptionEnglish);
      data.append('content_bengali', formData.contentBengali);
      data.append('content_english', formData.contentEnglish);
      if (formData.image) {
        data.append('image', formData.image);
      }
      data.append('category', formData.category);
      data.append('is_published', String(formData.isPublished));

      await apiClient.createStory(data);
      setSuccess(true);
      setFormData({
        titleBengali: '',
        titleEnglish: '',
        descriptionBengali: '',
        descriptionEnglish: '',
        contentBengali: '',
        contentEnglish: '',
        image: null,
        category: 'story',
        isPublished: true,
      });

      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload story');
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
        <title>গল্প যোগ করুন | Bangla Kobita Admin</title>
      </Head>

      <AdminLayout onLogout={handleLogout}>
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
            নতুন গল্প যোগ করুন
          </h1>
          <p className="text-gray-600 dark:text-gray-400 bengali-text mb-8">
            আপনার গল্প বা উপন্যাস আপলোড করুন এবং পাঠকদের সাথে ভাগ করুন
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              গল্প সফলভাবে আপলোড হয়েছে! ড্যাশবোর্ডে ফিরছি...
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
                placeholder="গল্পের শিরোনাম (বাংলা)"
                value={formData.titleBengali}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bengali-text"
                required
              />
              <input
                type="text"
                name="titleEnglish"
                placeholder="Story Title (English)"
                value={formData.titleEnglish}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <textarea
                name="descriptionBengali"
                placeholder="সংক্ষিপ্ত বর্ণনা (বাংলা)"
                value={formData.descriptionBengali}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bengali-text"
                required
              />
              <textarea
                name="descriptionEnglish"
                placeholder="Brief Description (English)"
                value={formData.descriptionEnglish}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 bengali-text font-semibold mb-2">
                গল্পের বিষয়বস্তু (বাংলা)
              </label>
              <textarea
                name="contentBengali"
                placeholder="আপনার গল্প এখানে লিখুন..."
                value={formData.contentBengali}
                onChange={handleInputChange}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary bengali-text"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Story Content (English)
              </label>
              <textarea
                name="contentEnglish"
                placeholder="Translation or original content in English..."
                value={formData.contentEnglish}
                onChange={handleInputChange}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 bengali-text font-semibold mb-2">
                প্রচ্ছদ ছবি
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
              {loading ? 'আপলোড হচ্ছে...' : 'গল্প যোগ করুন'}
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};

export default UploadStoryPage;
