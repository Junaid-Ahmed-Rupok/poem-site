import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@/hooks/useTheme';
import { apiClient } from '@/lib/api-client';
import { Poem } from '@/types';

const PoemDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { theme, fontSize, increaseFontSize, decreaseFontSize, toggleTheme } = useTheme();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullScreenMode, setFullScreenMode] = useState(false);

  useEffect(() => {
    if (!slug) return;
    loadPoem();
  }, [slug]);

  const loadPoem = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getPoemBySlug(slug as string);
      setPoem(response.data.data);
      // Track view
      await apiClient.trackEvent({
        content_type: 'poem',
        content_id: response.data.data.id,
        action: 'view',
      });
    } catch (error) {
      console.error('Failed to load poem:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!poem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">কবিতা পাওয়া যায়নি</h1>
        <Link href="/poems" className="text-primary hover:underline">
          কবিতায় ফিরুন
        </Link>
      </div>
    );
  }

  const sizeClass = `font-size-${fontSize}`;

  const viewModeClasses = fullScreenMode
    ? 'reading-mode-full'
    : 'reading-mode';

  return (
    <>
      <Head>
        <title>{poem.title_bengali} | Bangla Kobita</title>
        <meta name="description" content={poem.description || poem.title_bengali} />
        <meta property="og:title" content={poem.title_bengali} />
        <meta property="og:description" content={poem.description || poem.title_bengali} />
        {poem.cover_image_url && (
          <meta property="og:image" content={poem.cover_image_url} />
        )}
      </Head>

      {/* Controls Bar */}
      {!fullScreenMode && (
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-4">
            <Link href="/poems" className="text-primary hover:text-primary/80 transition">
              ← কবিতায় ফিরুন
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="কমান ফন্ট সাইজ"
              >
                A-
              </button>
              <button
                onClick={increaseFontSize}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="বাড়ান ফন্ট সাইজ"
              >
                A+
              </button>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="থিম পরিবর্তন করুন"
              >
                {theme.mode === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setFullScreenMode(!fullScreenMode)}
                className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 transition"
                title="সম্পূর্ণ পর্দার মোড"
              >
                ⛶
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Full Screen Mode Controls */}
      {fullScreenMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
          <h2 className="font-bold bengali-text-heading text-gray-900 dark:text-white truncate">
            {poem.title_bengali}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFontSize}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
            >
              A-
            </button>
            <button
              onClick={increaseFontSize}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
            >
              A+
            </button>
            <button
              onClick={() => setFullScreenMode(false)}
              className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`${viewModeClasses} ${sizeClass} ${fullScreenMode ? 'pt-20' : ''}`}>
        {poem.cover_image_url && !fullScreenMode && (
          <img
            src={poem.cover_image_url}
            alt={poem.title_bengali}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
            {poem.title_bengali}
          </h1>
          {poem.title_english && (
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">
              {poem.title_english}
            </p>
          )}
          {poem.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-4 bengali-text">
              {poem.description}
            </p>
          )}
        </div>

        {/* Meta Information */}
        {!fullScreenMode && (
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <span>
              {poem.reading_time_minutes || 3} মিনিট পড়ার সময়
            </span>
            <span>👁️ {poem.view_count} বার দেখা হয়েছে</span>
          </div>
        )}

        {/* Audio Player (if audio available) */}
        {poem.audio_url && (
          <div className="audio-player mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 bengali-text">এই কবিতার অডিও সংস্করণ</p>
            <audio
              controls
              className="w-full"
              preload="metadata"
            >
              <source src={poem.audio_url} type="audio/mpeg" />
              আপনার ব্রাউজার অডিও উপাদান সমর্থন করে না।
            </audio>
          </div>
        )}

        {/* Poem Content */}
        <div className={`reading-content mb-12 ${fullScreenMode ? 'pt-4' : ''}`}>
          <div
            className="bengali-text whitespace-pre-wrap leading-relaxed"
            style={{
              lineHeight: '2',
              letterSpacing: '0.02em',
            }}
          >
            {poem.content}
          </div>
        </div>

        {/* Ad Placeholder */}
        {!fullScreenMode && (
          <div className="ad-container my-8 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">Advertisement Space</p>
          </div>
        )}

        {/* Sharing Section */}
        {!fullScreenMode && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 bengali-text">
              এই কবিতা শেয়ার করুন
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const text = `${poem.title_bengali} - Bangla Kobita\n${window.location.href}`;
                  navigator.share({ title: poem.title_bengali, text });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                শেয়ার করুন
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('লিঙ্ক কপি করা হয়েছে!');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                লিঙ্ক কপি করুন
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PoemDetailPage;
