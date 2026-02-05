import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { apiClient } from '@/lib/api-client';
import { Poem } from '@/types';

const PoemsPage: React.FC = () => {
  const { theme, increaseFontSize, decreaseFontSize } = useTheme();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    loadPoems();
  }, [selectedCategory]);

  const loadPoems = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getPoems({
        limit: 12,
        category: selectedCategory || undefined,
      });
      setPoems(response.data.data || []);
    } catch (error) {
      console.error('Failed to load poems:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>কবিতা | Bangla Kobita</title>
        <meta name="description" content="Explore beautiful Bengali poetry" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white cursor-pointer">
              কবিতা
            </h1>
          </Link>
          <div className="flex gap-4">
            <button
              onClick={decreaseFontSize}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Decrease font size"
            >
              A-
            </button>
            <button
              onClick={increaseFontSize}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Increase font size"
            >
              A+
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
            বাংলা কবিতা
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 bengali-text">
            আবেগ, প্রেম, প্রকৃতি এবং আরও অনেক কিছু নিয়ে লেখা মূল কবিতা
          </p>
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

        {/* Poems Grid */}
        {!loading && poems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem) => (
              <Link key={poem.id} href={`/poems/${poem.slug}`}>
                <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition cursor-pointer">
                  {poem.cover_image_url && (
                    <img
                      src={poem.cover_image_url}
                      alt={poem.title_bengali}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold bengali-text-heading text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {poem.title_bengali}
                    </h3>
                    {poem.title_english && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {poem.title_english}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 bengali-text text-sm line-clamp-3 mb-4">
                      {poem.description || 'একটি সুন্দর কবিতা'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{poem.reading_time_minutes || 3} min read</span>
                      <span>👁️ {poem.view_count}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 bengali-text text-lg">
                কোনো কবিতা পাওয়া যায়নি। শীঘ্রই আরও আসবে!
              </p>
            </div>
          )
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

export default PoemsPage;
