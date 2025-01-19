import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    if (showMobileMenu || showSignupForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu, showSignupForm]);

  return (
    <div>
      {/* Fixed Rectangle Container at the Top */}
      <div className="fixed top-0 left-0 w-full bg-gray-100 shadow-md border-b border-gray-200 z-50">
        <div
          className="container mx-auto flex justify-between 
          items-center py-4 px-6 md:px-20 lg:px-32"
        >
          <img src={assets.logo} alt="Logo" className="w-auto max-w-xs h-20"/>
          <ul className="hidden md:flex gap-7 text-gray-800 font-medium">
            <a href="/" className="cursor-pointer hover:text-gray-400">
              Home
            </a>
            <a href="#About" className="cursor-pointer hover:text-gray-400">
              About
            </a>
            <a href="#Projects" className="cursor-pointer hover:text-gray-400">
              Projects
            </a>
            <Link to="/testimonials" className="cursor-pointer hover:text-gray-400">
              Testimonials
              </Link>
            <Link to="/recipes" className="cursor-pointer hover:text-gray-400">
              Recipes
            </Link>
          </ul>
          <button
            onClick={() => setShowSignupForm(true)}
            className="hidden md:block bg-blue-500 text-white px-8 py-2 rounded-full"
          >
            Sign up
          </button>
          <img
            onClick={() => setShowMobileMenu(true)}
            src={assets.menu_icon}
            className="md:hidden w-7 cursor-pointer"
            alt="Menu"
          />
        </div>
      </div>

      {/* Push content below the fixed navbar */}
      <div className="pt-20">
        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            showMobileMenu ? "fixed w-full" : "h-0 w-0"
          } fixed w-full right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
        >
          <div className="flex justify-end p-6 cursor-pointer">
            <img
              onClick={() => setShowMobileMenu(false)}
              src={assets.cross_icon}
              className="w-6"
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <a
              onClick={() => setShowMobileMenu(false)}
              href="#Header"
              className="px-4 py-2 rounded-full inline-block"
            >
              Home
            </a>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="#About"
              className="px-4 py-2 rounded-full inline-block"
            >
              About
            </a>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="#Projects"
              className="px-4 py-2 rounded-full inline-block"
            >
              Projects
            </a>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="#Testimonials"
              className="px-4 py-2 rounded-full inline-block"
            >
              Testimonials
            </a>
          </ul>
        </div>

        {/* Signup Form Modal */}
        {showSignupForm && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setShowSignupForm(false)}
          >
            <div
              className="bg-white p-6 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <SignupForm />
              <button
                onClick={() => setShowSignupForm(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
