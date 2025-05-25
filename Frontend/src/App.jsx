import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import About from "./Components/About";
import Pricing from "./Components/Pricing";
import TestimonialSlider from "./Components/TestimonialSlider";
import Footer from "./Components/Footer";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import Gallery from "./Components/Gallery";
import SignUpPopup from "./Components/Register/SignUpPopup";
import Login from "./Components/Register/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Member from "./Components/Pages/Member/Members";
import GeneralUser from "./Components/Pages/GeneralUser";
import MembersDetails from "./Components/Pages/Member/MembersDetails";
import AddMembers from "./Components/Pages/AddMembers";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/Model/ProtectedRoute";
import AddMembership from "./Components/Pages/Member/AddMembership";

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const pricingRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToPricing = () => {
    pricingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Routes>
        {/* 🏠 Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar
                scrollToSection={scrollToSection}
                refs={{
                  homeRef,
                  aboutRef,
                  pricingRef,
                  testimonialRef,
                  contactRef,
                  galleryRef,
                }}
              />

              <div ref={homeRef}>
                <Header scrollToPricing={scrollToPricing} />
              </div>
              <div ref={aboutRef}>
                <About />
              </div>
              <div ref={pricingRef}>
                <Pricing />
              </div>
              <div ref={galleryRef}>
                <Gallery />
              </div>
              <div ref={testimonialRef}>
                <TestimonialSlider />
              </div>
              <div ref={contactRef}>
                <Footer />
              </div>
              <ScrollToTopButton />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPopup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member"
          element={
            <ProtectedRoute>
              <Member />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-members"
          element={
            <ProtectedRoute>
              <AddMembers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-membership"
          element={
            <ProtectedRoute>
              <AddMembership />
            </ProtectedRoute>
          }
        />

        <Route
          path="/specific/:page"
          element={
            <ProtectedRoute>
              <GeneralUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/:id"
          element={
            <ProtectedRoute>
              <MembersDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
