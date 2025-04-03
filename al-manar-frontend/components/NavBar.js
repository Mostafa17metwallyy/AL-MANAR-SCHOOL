import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/assets/LOGO.png" alt="Logo" className="h-18 w-auto" />
        </div>

        {/* Links */}
        <ul className="flex gap-6 font-bold text-lg">
          <li><a href="#home" className="hover:text-blue-500">Home</a></li>
          <li><a href="#divisions" className="hover:text-blue-500">Divisions</a></li>
          <li><a href="#about" className="hover:text-blue-500">About Us</a></li>
          <li><a href="#admission" className="hover:text-blue-500">Admission</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
