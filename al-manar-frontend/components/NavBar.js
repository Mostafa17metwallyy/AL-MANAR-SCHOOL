import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === '/';

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

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black text-2xl focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu Items */}
        <ul className={`md:flex gap-6 font-bold text-lg text-black ${menuOpen ? 'block absolute top-full left-0 w-full bg-white px-6 py-4 space-y-4 shadow-md' : 'hidden md:flex md:items-center md:space-y-0 md:static md:shadow-none'}`}>
          <li onClick={closeMenu}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={closeMenu}>
            <Link href={getHref('divisions')}>Divisions</Link>
          </li>
          <li onClick={closeMenu}>
            <Link href={getHref('about')}>About Us</Link>
          </li>
          <li onClick={closeMenu}>
            <Link href={getHref('admission')}>Admission</Link>
          </li>
          <li onClick={closeMenu}>
            <Link href="/announcements">Announcements</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
