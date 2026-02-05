import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@/hooks/useTheme';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="বাংলা কবিতা, গল্প, এবং গান - Bengali Poetry, Stories, and Music" />
        <meta name="theme-color" content="#8b5a3c" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
