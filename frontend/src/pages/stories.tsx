import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { apiClient } from '@/lib/api-client';
import { Story } from '@/types';

const StoriesPage: React.FC = () => {
  const { theme } = useTheme();
  const [stories, setStories] = useState<Story[]>([]);
  const [novels, setNovels] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stories' | 'novels'>('stories');

  useEffect(() => {
    loadContent();
  }, [activeTab]);

  const loadContent = async () => {
    try {
      setLoading(true);
      if (activeTab === 'stories') {
        const response = await apiClient.getStories({ limit: 12 });
        setStories(response.data.data || []);
      } else {
        const response = await apiClient.getNovels({ limit: 12 });
        setNovels(response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>গল্প | Bangla Kobita</title>
        <meta name="description" content="Explore Bengali short stories and novels" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <h1 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white cursor-pointer">
              গল্প ও উপন্যাস
            </h1>
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
            বাংলা গল্প
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 bengali-text">
            আকর্ষণীয় গল্প এবং উপন্যাসের অধ্যায়গুলি আবিষ্কার করুন
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-3 font-semibold bengali-text-heading transition border-b-2 ${
              activeTab === 'stories'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            ছোট গল্প
          </button>
          <button
            onClick={() => setActiveTab('novels')}
            className={`px-4 py-3 font-semibold bengali-text-heading transition border-b-2 ${
              activeTab === 'novels'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            উপন্যাস
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Stories Grid */}
        {!loading && activeTab === 'stories' && stories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Link key={story.id} href={`/stories/${story.slug}`}>
                <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition cursor-pointer">
                  {story.cover_image_url && (
                    <img
                      src={story.cover_image_url}
                      alt={story.title_bengali}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold bengali-text-heading text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {story.title_bengali}
                    </h3>
                    {story.title_english && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {story.title_english}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 bengali-text text-sm line-clamp-3 mb-4">
                      {story.summary || 'একটি আকর্ষণীয় গল্প'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{story.reading_time_minutes || 5} মিনিট</span>
                      <span>👁️ {story.view_count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Novels Grid */}
        {!loading && activeTab === 'novels' && novels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {novels.map((novel: any) => (
              <Link key={novel.id} href={`/novels/${novel.slug}`}>
                <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition cursor-pointer">
                  {novel.cover_image_url && (
                    <img
                      src={novel.cover_image_url}
                      alt={novel.title_bengali}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold bengali-text-heading text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {novel.title_bengali}
                    </h3>
                    {novel.title_english && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {novel.title_english}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 bengali-text text-sm line-clamp-3 mb-4">
                      {novel.synopsis || 'একটি আকর্ষণীয় উপন্যাস'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{novel.total_chapters || 0} অধ্যায়</span>
                      <span>{novel.completed ? '✓ সম্পূর্ণ' : '⚙ চলমান'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && activeTab === 'stories' && stories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 bengali-text text-lg">
              কোনো গল্প পাওয়া যায়নি। শীঘ্রই আরও আসবে!
            </p>
          </div>
        )}

        {!loading && activeTab === 'novels' && novels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 bengali-text text-lg">
              কোনো উপন্যাস পাওয়া যায়নি। শীঘ্রই আরও আসবে!
            </p>
          </div>
        )}
      </main>

      {/* Ad Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="ad-container flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">Advertisement Space</p>
        </div>
      </section>
    </>
  );
};

export default StoriesPage;
