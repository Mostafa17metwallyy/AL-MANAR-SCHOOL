import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white mt-0">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">

        {/* Left: Page Links */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
          <div className="flex flex-col space-y-2 text-sm items-start">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/announcements">Announcements</Link>
          </div>
        </div>

        {/* Center: Powered by SYDEV */}
        <div className="w-full md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
          <a
            href="https://thesydev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
          >
            Powered by <span className="font-bold">SYDEV</span>
          </a>
        </div>

        {/* Right: Social Media Icons */}
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
