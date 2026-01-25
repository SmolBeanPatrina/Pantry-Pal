import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Header = () => {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const HandleGetStarted = () => {
    if (localStorage.getItem('username') != null) {
      window.location.href = "/preferences";
    } else if (localStorage.getItem('username') == null) {
      setShowLoginForm(true);
    }
  }

  return (
    <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden' style=
    {{backgroundImage: "url('/header_img.png')"}} id='Header'>
      <Navbar />
      <div className='container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white'>
      <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block
        max-w-3xl font-semibold pt-20'>Explore recipes that fit your needs</h2>
        <div className='space-x-6 mt-16'>
            <button onClick={HandleGetStarted} className='border border-white px-8
            py-3 rounded'>Get Started</button>
            <a href="/Contact" className='bg-gray-500 px-8
            py-3 rounded'>Contact us</a>
        </div>
        </div>

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

    </div>
  )
}

export default Header
