import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Head>
        <title>বাংলা কবিতা, গল্প, ও গান | Bangla Kobita</title>
        <meta name="description" content="Explore original Bengali poetry, stories, and music" />
        <meta property="og:title" content="Bangla Kobita, Golpo, O Gaan" />
        <meta property="og:description" content="A platform for Bengali creative works" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
                বক
              </div>
              <h1 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white hidden sm:block">
                বাংলা কবিতা
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden sm:flex gap-8">
              <Link href="/poems" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                <span className="bengali-text font-medium">কবিতা</span>
              </Link>
              <Link href="/stories" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                <span className="bengali-text font-medium">গল্প</span>
              </Link>
              <Link href="/music" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                <span className="bengali-text font-medium">গান</span>
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
                <span className="bengali-text font-medium">আমার সম্পর্কে</span>
              </Link>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme.mode === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
            বাংলা কবিতা, গল্প, ও গান
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto bengali-text">
            একজন বাঙালি কবি, ঔপন্যাসিক এবং সুরকারের মূল কর্মসংস্থার জন্য একটি উৎসর্গীকৃত প্ল্যাটফর্ম
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/poems"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
            >
              কবিতা পড়ুন
            </Link>
            <Link
              href="/music"
              className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary/10 rounded-lg transition font-semibold"
            >
              গান শুনুন
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poems */}
          <Link href="/poems">
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-2xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                কবিতা
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bengali-text">
                আবেগ এবং সৌন্দর্যের সাথে লেখা মূল বাংলা কবিতা
              </p>
            </div>
          </Link>

          {/* Stories */}
          <Link href="/stories">
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                গল্প
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bengali-text">
                গল্প এবং উপন্যাসের অধ্যায় যা আপনাকে মুগ্ধ করবে
              </p>
            </div>
          </Link>

          {/* Music */}
          <Link href="/music">
            <div className="group p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                গান
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bengali-text">
                আসল বাংলা সংগীত এবং কণ্ঠশিল্প সরাসরি শুনুন
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Ad Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="ad-container flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">Advertisement Space</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 bengali-text-heading">প্লাটফর্ম</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/poems" className="hover:text-white transition">
                    কবিতা
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="hover:text-white transition">
                    গল্প
                  </Link>
                </li>
                <li>
                  <Link href="/music" className="hover:text-white transition">
                    গান
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 bengali-text-heading">সম্পর্কে</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    লেখক সম্পর্কে
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    যোগাযোগ করুন
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 bengali-text-heading">আইনি</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    গোপনীয়তা নীতি
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    ব্যবহারের শর্তাবলী
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 bengali-text-heading">সোশ্যাল মিডিয়া</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent transition">
                  Facebook
                </a>
                <a href="#" className="hover:text-accent transition">
                  Twitter
                </a>
                <a href="#" className="hover:text-accent transition">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2026 বাংলা কবিতা, গল্প, ও গান। সর্বাধিকার সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
