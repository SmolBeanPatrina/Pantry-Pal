import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import AboutPage from "./About";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null); // User state to track login status

  useEffect(() => {
    if (showMobileMenu || showSignupForm || showLoginForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu, showSignupForm, showLoginForm]);

  const handleSignout = () => {
    setUser(null); // Clear user state on signout
    alert("Signed out successfully.");
  };

  return (
    <div>
      {/* Fixed Rectangle Container at the Top */}
      <div className="fixed top-0 left-0 w-full bg-black shadow-md border-b border-gray-200 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
          <img src={logo} alt="Logo" className="w-20 h-17"/>
          <ul className="hidden md:flex gap-7 text-gray-100 font-medium pl-4 pr-4">
            <a href="/" className="cursor-pointer hover:text-gray-400">
              Home
            </a>
            <a href="/about" className="cursor-pointer hover:text-gray-400">
              About
            </a>
            <Link to="/testimonials" className="cursor-pointer hover:text-gray-400">
              Testimonials
            </Link>
            <Link to="/recipes" className="cursor-pointer hover:text-gray-400">
              Recipes
            </Link>
            <Link to="/preferences" className="cursor-pointer hover:text-gray-400">
              Preferences
            </Link>
          </ul>
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => setShowLoginForm(true)}
              className="bg-gray-500 text-white px-6 py-2 rounded-full whitespace-nowrap"
            >
              Log in
            </button>
            <button
              onClick={() => setShowSignupForm(true)}
              className="bg-amber-300 text-black px-6 py-2 rounded-full whitespace-nowrap"
            >
              Sign up
            </button>
          </div>
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
              href="/"
              className="px-4 py-2 rounded-full inline-block"
            >
              Home
            </a>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="/about"
              className="px-4 py-2 rounded-full inline-block"
            >
              About
            </a>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="/testimonials"
              className="px-4 py-2 rounded-full inline-block"
            >
              Testimonials
            </a>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="/recipes"
              className="px-4 py-2 rounded-full inline-block"
            >
              Recipes
            </a>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="/preferences"
              className="px-4 py-2 rounded-full inline-block"
            >
              Preferences
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
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setShowSignupForm(false);
                    setShowLoginForm(true);
                  }}
                  className="text-blue-500 underline"
                >
                  Log in
                </button>
              </p>
              <button
                onClick={() => setShowSignupForm(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Login Form Modal */}
        {showLoginForm && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setShowLoginForm(false)}
          >
            <div
              className="bg-white p-6 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <LoginForm />
              <p className="mt-4 text-center">
                Don’t have an account?{" "}
                <button
                  onClick={() => {
                    setShowLoginForm(false);
                    setShowSignupForm(true);
                  }}
                  className="text-blue-500 underline"
                >
                  Sign up
                </button>
              </p>
              <button
                onClick={() => setShowLoginForm(false)}
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
