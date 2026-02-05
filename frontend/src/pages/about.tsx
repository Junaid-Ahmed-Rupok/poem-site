import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>আমার সম্পর্কে | Bangla Kobita</title>
        <meta name="description" content="About the poet and creative artist" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <h1 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white cursor-pointer">
              আমার সম্পর্কে
            </h1>
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="md:w-1/3">
              <img
                src="/images/author.jpg"
                alt="Author"
                className="rounded-lg shadow-lg w-full aspect-square object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
                বাংলার কণ্ঠস্বর
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 bengali-text mb-6">
                একজন আধুনিক বাঙালি কবি, ঔপন্যাসিক এবং সুরকার যিনি তার জীবনের কাজ দিয়ে বাংলা সাহিত্য এবং সংগীতকে সমৃদ্ধ করতে প্রতিশ্রুতিবদ্ধ।
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:contact@example.com"
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
                >
                  যোগাযোগ করুন
                </a>
                <a
                  href="#subscribe"
                  className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 rounded-lg transition font-semibold"
                >
                  খবর পান
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-6">
            আমার যাত্রা
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none bengali-text">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              আমি শৈশব থেকেই বাংলা সাহিত্য এবং সংগীতের প্রতি অনুরাগী ছিলাম। রবীন্দ্রনাথ, জীবনানন্দ এবং আরও অনেক মহান কবির রচনা আমাকে অনুপ্রাণিত করেছে।
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              আমার কবিতা প্রেম, প্রকৃতি, বিরহ এবং সামাজিক চেতনার থিম নিয়ে বোনা। প্রতিটি শব্দ, প্রতিটি স্তরে আমি আবেগ এবং সত্যতার সন্ধান করি।
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              এই প্ল্যাটফর্মটি আমার সৃজনশীল কাজকে বিশ্বের সাথে শেয়ার করার একটি উপায়। আমি আশা করি আপনি আমার কবিতা, গল্প এবং সংগীতে নিজের প্রতিফলন খুঁজে পাবেন।
            </p>
          </div>
        </section>

        {/* Creative Works Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-6">
            আমার সৃজনশীল কাজ
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                কবিতা
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bengali-text">
                আবেগ এবং কল্পনার সাথে লেখা ৫০+ মূল কবিতা যা জীবনের বিভিন্ন দিক স্পর্শ করে।
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                গল্প ও উপন্যাস
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bengali-text">
                আকর্ষণীয় প্লট এবং গভীর চরিত্র সহ একাধিক গল্প এবং চলমান উপন্যাস।
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-2">
                সংগীত
              </h3>
              <p className="text-gray-600 dark:text-gray-400 bengali-text">
                আধুনিক এবং ঐতিহ্যবাহী উপাদানের মিশ্রণে তৈরি মূল বাংলা সংগীত।
              </p>
            </div>
          </div>
        </section>

        {/* Artistic Statement */}
        <section className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border border-primary/20">
          <h2 className="text-2xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
            আমার শিল্পী বিবৃতি
          </h2>
          <p className="text-gray-700 dark:text-gray-300 bengali-text leading-relaxed">
            শিল্প শুধুমাত্র সৌন্দর্য নয়, এটি সত্য এবং সংযোগ। আমার প্রতিটি সৃষ্টিতে, আমি মানুষের হৃদয় স্পর্শ করতে চাই। বাংলা ভাষা আমার সবচেয়ে শক্তিশালী সরঞ্জাম, এবং আমি এটিকে এমনভাবে ব্যবহার করি যা প্রজন্মকে অতিক্রম করে এবং অনন্য অভিজ্ঞতা সৃষ্টি করে।
          </p>
        </section>

        {/* Contact & Social */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-6">
            সংযুক্ত থাকুন
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
                আমাকে লিখুন
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="আপনার ইমেল"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="আপনার বার্তা"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold"
                >
                  পাঠান
                </button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
                সোশ্যাল মিডিয়া
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">Facebook</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">আমাদের ফেসবুক পেজ অনুসরণ করুন</p>
                </a>
                <a
                  href="#"
                  className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">Instagram</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ইনস্টাগ্রামে ছবি এবং আপডেট দেখুন</p>
                </a>
                <a
                  href="#"
                  className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">Twitter</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">প্রতিদিনের চিন্তা এবং আপডেট</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="subscribe" className="bg-gradient-to-r from-accent/10 to-primary/10 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border border-accent/20">
          <h2 className="text-2xl font-bold bengali-text-heading text-gray-900 dark:text-white mb-4">
            শিল্পীকে সমর্থন করুন
          </h2>
          <p className="text-gray-700 dark:text-gray-300 bengali-text mb-6">
            আপনার সমর্থন আমাকে আরও ভাল সৃজনশীল কাজ তৈরি করতে সাহায্য করে।
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-semibold text-center"
            >
              Ko-fi তে সমর্থন করুন
            </a>
            <a
              href="#"
              className="px-6 py-3 border-2 border-accent text-accent hover:bg-accent/10 rounded-lg transition font-semibold text-center"
            >
              মাসিক সদস্যতা
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
