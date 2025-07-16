import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from './LanguageContext'; // ✅ Import language context

const Footer = () => {
  const { language } = useLanguage(); // ✅ Get current language

  return (
    <footer className="bg-teal-600 text-white mt-0">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">

        {/* ✅ Left: Page Links */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
          <div className="flex flex-col space-y-2 text-sm items-start">
            <Link href="/">
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </Link>
            <Link href="/about">
              {language === 'en' ? 'About' : 'من نحن'}
            </Link>
            <Link href="/menu">
              {language === 'en' ? 'Menu' : 'القائمة'}
            </Link>
            <Link href="/contact">
              {language === 'en' ? 'Contact' : 'اتصل بنا'}
            </Link>
            <Link href="/announcements">
              {language === 'en' ? 'Announcements' : 'الإعلانات'}
            </Link>
          </div>
        </div>

        {/* ✅ Center: Powered by SYDEV */}
        <div className="w-full md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
          <a
            href="https://thesydev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            {language === 'en' ? 'Powered by' : 'مدعوم من'}{' '}
            <span className="font-bold">SYDEV</span>
          </a>
        </div>

        {/* ✅ Right: Social Media Icons */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end items-center">
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com/YOUR_SCHOOL_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com/in/YOUR_SCHOOL_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
