import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  // Helper function to generate href
  const getHref = (sectionId) => {
    return isHomePage ? `#${sectionId}` : `/#${sectionId}`;
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo on far left */}
        <div className="flex items-center">
          <img src="/assets/LOGO.png" alt="Logo" className="h-16 w-auto" />
        </div>

        {/* Links */}
        <ul className="flex gap-6 font-bold text-lg text-black">
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href={getHref('divisions')}>
              Divisions
            </Link>
          </li>
          <li>
            <Link href={getHref('about')}>
              About Us
            </Link>
          </li>
          <li>
            <Link href={getHref('admission')}>
              Admission
            </Link>
          </li>
          <li>
            <Link href="/announcements">
              Announcements
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
