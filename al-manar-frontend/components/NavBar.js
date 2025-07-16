import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';

// ✅ Import language context
import { useLanguage } from './LanguageContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const { language, toggleLanguage } = useLanguage(); // ✅ Get language state

  const getHref = (sectionId) => {
    return isHomePage ? `#${sectionId}` : `/#${sectionId}`;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src="/assets/LOGO.png" alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden flex items-center gap-3">
          {/* ✅ Language toggle button on mobile */}
          <button
            onClick={toggleLanguage}
            className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition text-sm"
          >
            {language === 'en' ? 'عربي' : 'English'}
          </button>

          <button onClick={toggleMenu} className="text-black text-2xl focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu Items */}
        <ul
          className={`md:flex gap-6 font-bold text-lg text-black ${
            menuOpen
              ? 'block absolute top-full left-0 w-full bg-white px-6 py-4 space-y-4 shadow-md'
              : 'hidden md:flex md:items-center md:space-y-0 md:static md:shadow-none'
          }`}
        >
          <li onClick={closeMenu}>
            <Link href="/">
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </Link>
          </li>
          <li onClick={closeMenu}>
            <Link href={getHref('divisions')}>
              {language === 'en' ? 'Divisions' : 'الأقسام'}
            </Link>
          </li>
          <li onClick={closeMenu}>
            <Link href={getHref('about')}>
              {language === 'en' ? 'About Us' : 'من نحن'}
            </Link>
          </li>
          <li onClick={closeMenu}>
            <Link href={getHref('admission')}>
              {language === 'en' ? 'Admission' : 'التقديم'}
            </Link>
          </li>
          <li onClick={closeMenu}>
            <Link href="/announcements">
              {language === 'en' ? 'Announcements' : 'الإعلانات'}
            </Link>
          </li>

          {/* ✅ Language Toggle Button for Desktop */}
          <li className="hidden md:block">
            <button
              onClick={toggleLanguage}
              className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 transition text-sm"
            >
              {language === 'en' ? 'عربي' : 'English'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
  