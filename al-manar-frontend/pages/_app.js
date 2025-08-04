import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

function AppWithDir({ Component, pageProps }) {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

function MyApp(props) {
  return (
    <LanguageProvider>
      <Toaster position="top-center" />
      <AppWithDir {...props} />
    </LanguageProvider>
  );
}

export default MyApp;
