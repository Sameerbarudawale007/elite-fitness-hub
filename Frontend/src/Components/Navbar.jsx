import React, { useState } from "react";
import Logo from "../assets/Logo.jpeg";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = ({ scrollToSection, refs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("isLogin");

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("gymPic");
    navigate("/");
  };

  return (
    <nav className="backdrop-blur-md bg-black text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="w-[100px] mr-3 cursor-pointer"
            src={Logo}
            alt="Tiger Logo"
          />
        </div>

        <div className="hidden md:flex space-x-6 font-semibold text-sm">
          <button
            className="nav-link cursor-pointer relative"
            onClick={() => scrollToSection(refs.homeRef)}
          >
            Home
          </button>
          <button
            className="nav-link cursor-pointer relative"
            onClick={() => scrollToSection(refs.aboutRef)}
          >
            About Us
          </button>
          <button
            className="nav-link cursor-pointer relative"
            onClick={() => scrollToSection(refs.pricingRef)}
          >
            Pricing
          </button>
          <button
            className="nav-link cursor-pointer relative"
            onClick={() => scrollToSection(refs.galleryRef)}
          >
            Gallery
          </button>
          <button
            className="nav-link cursor-pointer relative"
            onClick={() => scrollToSection(refs.testimonialRef)}
          >
            Testimonials
          </button>
          <button
            className="nav-link cursor-pointer relative py-2"
            onClick={() => scrollToSection(refs.contactRef)}
          >
            Contact Us
          </button>
        </div>

        <div className="hidden md:flex space-x-4">
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="border border-white px-6 py-1 rounded hover:bg-white hover:text-gray-900 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="border border-white px-6 py-1 rounded hover:bg-white hover:text-gray-900 transition cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="border border-white px-4 py-1 rounded hover:bg-red-600 transition cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="md:hidden cursor-pointer">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX size={24} style={{ cursor: "pointer" }} />
            ) : (
              <FiMenu size={24} style={{ cursor: "pointer" }} />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-6 space-y-4 text-sm cursor-pointer font-semibold">
          <button
            className="cursor-pointer block"
            onClick={() => scrollToSection(refs.homeRef)}
          >
            Home
          </button>
          <button
            className="cursor-pointer block"
            onClick={() => scrollToSection(refs.aboutRef)}
          >
            About Us
          </button>
          <button
            className="cursor-pointer block"
            onClick={() => scrollToSection(refs.pricingRef)}
          >
            Pricing
          </button>
          <button
            className="cursor-pointer block"
            onClick={() => scrollToSection(refs.galleryRef)}
          >
            Gallery
          </button>
          <button
            className="cursor-pointer block"
            onClick={() => scrollToSection(refs.testimonialRef)}
          >
            Testimonials
          </button>
          <button
            className="cursor-pointer block"
            onClick={() => scrollToSection(refs.contactRef)}
          >
            Contact Us
          </button>
          <div className="mt-3 space-x-2 space-y-3">
            {isLogin ? (
              <button
                onClick={handleLogout}
                className="rounded-md w-full border cursor-pointer border-white px-4 py-2 hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-md w-full border cursor-pointer border-white px-4 py-2 hover:bg-white hover:text-black transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-md w-full border cursor-pointer border-white px-4 py-2 hover:bg-red-500 hover:text-black transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
