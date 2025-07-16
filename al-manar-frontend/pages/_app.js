import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import '@/styles/globals.css';
import { LanguageProvider } from '@/components/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </LanguageProvider>
  );
}

export default MyApp;
