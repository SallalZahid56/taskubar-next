"use client";

import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#e8f2ff] py-4 px-6 shadow-sm w-full overflow-x-hidden">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo and Links */}
        <div className="flex items-center gap-4">
          <a href="#" className="ml-[-0.5rem] pl-0">
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </a>

          <div className="hidden lg:block h-10 w-px bg-[#e7d6e6] opacity-30 mx-3"></div>

          <ul className="hidden lg:flex gap-4 font-semibold text-black text-base">
            <li><a href="#howItWorks" className="hover:text-blue-500">How it Works</a></li>
            <li><a href="#membershipBenefits" className="hover:text-blue-500">Benefits</a></li>
            <li><a href="#services" className="hover:text-blue-500">Services</a></li>
            <li><a href="#pricing" className="hover:text-blue-500">Pricing</a></li>
            <li><a href="#reviews" className="hover:text-blue-500">Reviews</a></li>
            <li><a href="#faq" className="hover:text-blue-500">FAQs</a></li>
          </ul>
        </div>

        {/* Right: Login Button and Hamburger */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Login Button */}
          <a
            href="/login"
            className="w-28 h-11 bg-[#2279d6] hover:bg-[#1a66c2] text-white rounded-md flex items-center justify-center font-medium text-xs tracking-wide uppercase transition-all duration-300"
          >
            Login
          </a>

          {/* Hamburger */}
          <button
            className={`lg:hidden flex flex-col justify-between w-6 h-4 focus:outline-none ${
              menuOpen ? "active" : ""
            }`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span
              className={`h-[3px] bg-black rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            ></span>
            <span
              className={`h-[3px] bg-black rounded transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`h-[3px] bg-black rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#e8f2ff] px-6 py-4">
          <ul className="flex flex-col space-y-3 text-left text-base font-semibold">
            <li><a href="#howItWorks" className="hover:text-blue-500">How it Works</a></li>
            <li><a href="#membershipBenefits" className="hover:text-blue-500">Benefits</a></li>
            <li><a href="#services" className="hover:text-blue-500">Services</a></li>
            <li><a href="#pricing" className="hover:text-blue-500">Pricing</a></li>
            <li><a href="#reviews" className="hover:text-blue-500">Reviews</a></li>
            <li><a href="#faq" className="hover:text-blue-500">FAQs</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
