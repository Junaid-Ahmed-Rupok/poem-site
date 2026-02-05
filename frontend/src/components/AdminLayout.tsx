import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold bengali-text-heading text-gray-900 dark:text-white">
            বাংলা কবিতা
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 bengali-text">
            প্রশাসক প্যানেল
          </p>
        </div>

        <nav className="flex-1 p-6 space-y-4">
          <Link href="/admin/dashboard">
            <a className={`block px-4 py-2 rounded-lg transition ${
              router.pathname === '/admin/dashboard'
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}>
              <span className="bengali-text">📊 ড্যাশবোর্ড</span>
            </a>
          </Link>

          <Link href="/admin/upload-poem">
            <a className={`block px-4 py-2 rounded-lg transition ${
              router.pathname === '/admin/upload-poem'
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}>
              <span className="bengali-text">✍️ কবিতা যোগ করুন</span>
            </a>
          </Link>

          <Link href="/admin/upload-story">
            <a className={`block px-4 py-2 rounded-lg transition ${
              router.pathname === '/admin/upload-story'
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}>
              <span className="bengali-text">📖 গল্প যোগ করুন</span>
            </a>
          </Link>

          <Link href="/admin/upload-music">
            <a className={`block px-4 py-2 rounded-lg transition ${
              router.pathname === '/admin/upload-music'
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}>
              <span className="bengali-text">🎵 সঙ্গীত যোগ করুন</span>
            </a>
          </Link>
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition bengali-text"
          >
            লগ আউট
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-50">
        <h2 className="text-xl font-bold bengali-text-heading text-gray-900 dark:text-white">
          বাংলা কবিতা
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-800 shadow-lg z-40 p-4 space-y-2 overflow-auto">
          <Link href="/admin/dashboard">
            <a className="block px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 bengali-text">
              📊 ড্যাশবোর্ড
            </a>
          </Link>
          <Link href="/admin/upload-poem">
            <a className="block px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 bengali-text">
              ✍️ কবিতা যোগ করুন
            </a>
          </Link>
          <Link href="/admin/upload-story">
            <a className="block px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 bengali-text">
              📖 গল্প যোগ করুন
            </a>
          </Link>
          <Link href="/admin/upload-music">
            <a className="block px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 bengali-text">
              🎵 সঙ্গীত যোগ করুন
            </a>
          </Link>
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 mt-4 bg-red-600 text-white rounded-lg bengali-text"
          >
            লগ আউট
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:pt-0 pt-16 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
