import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { apiClient } from '@/lib/api-client';
import { MusicTrack } from '@/types';

const MusicPage: React.FC = () => {
  const { theme } = useTheme();
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getMusicTracks({ limit: 24 });
      setTracks(response.data.data || []);
    } catch (error) {
      console.error('Failed to load tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>গান | Bangla Kobita</title>
        <meta name="description" content="Listen to original Bengali music and songs" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <h1 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white cursor-pointer">
              বাংলা গান
            </h1>
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
            সংগীত
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 bengali-text">
            আসল বাংলা সংগীত এবং কণ্ঠশিল্প আবিষ্কার করুন
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

        {/* Tracks Grid */}
        {!loading && tracks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                {/* Album Art */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  {track.cover_image_url ? (
                    <img
                      src={track.cover_image_url}
                      alt={track.title_bengali}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="text-5xl">🎵</div>
                  )}
                  
                  {/* Play Button */}
                  <button
                    onClick={() => setNowPlaying(nowPlaying === track.id ? null : track.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition"
                  >
                    <div className="text-4xl opacity-0 group-hover:opacity-100 transition">
                      {nowPlaying === track.id ? '⏸️' : '▶️'}
                    </div>
                  </button>
                </div>

                {/* Track Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold bengali-text-heading text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {track.title_bengali}
                  </h3>
                  {track.title_english && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {track.title_english}
                    </p>
                  )}
                  {track.artist_name && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 bengali-text mb-3">
                      শিল্পী: {track.artist_name}
                    </p>
                  )}

                  {/* Audio Player (Expanded when playing) */}
                  {nowPlaying === track.id && (
                    <div className="mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <audio
                        controls
                        autoPlay
                        className="w-full text-xs"
                        onEnded={() => {
                          apiClient.trackEvent({
                            content_type: 'music',
                            content_id: track.id,
                            action: 'play_complete',
                          });
                        }}
                      >
                        <source src={track.audio_url} type="audio/mpeg" />
                        আপনার ব্রাউজার অডিও উপাদান সমর্থন করে না।
                      </audio>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {track.duration_seconds ? `${Math.floor(track.duration_seconds / 60)}:${(track.duration_seconds % 60).toString().padStart(2, '0')}` : ''}
                    </span>
                    <span>👂 {track.play_count}</span>
                  </div>

                  {/* Lyrics Link */}
                  {track.lyrics && (
                    <Link href={`/music/${track.slug}`}>
                      <button className="mt-4 w-full px-3 py-2 bg-primary/10 text-primary rounded hover:bg-primary/20 transition text-sm font-medium">
                        গীতি দেখুন
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && tracks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🎵</div>
            <p className="text-gray-600 dark:text-gray-400 bengali-text text-lg">
              কোনো গান পাওয়া যায়নি। শীঘ্রই আরও আসবে!
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

export default MusicPage;
