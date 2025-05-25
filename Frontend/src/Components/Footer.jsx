import React from "react";
import { FaInstagram } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { FaYoutube } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white py-10 px-6 md:px-20 text-center">
      <hr className="border -t border-white rounded-2xl my-4 mb-10" />
      <div className="flex items-center justify-center md:gap-4 mb-10">
        <a
          target="blank"
          href="https://www.instagram.com/thetigerunisexgym?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        >
          <FaInstagram className="text-5xl md:text-4xl" />
        </a>{" "}
        <h1>
          <a
            target="blank"
            href="https://www.instagram.com/thetigerunisexgym?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          >
            <span className="text-orange-600 animate-pulse transition-all duration-300">
              FOLLOW US ON
            </span>{" "}
            @thetigerunisexgym
          </a>
        </h1>
      </div>
      <hr className="border -t border-white rounded-2xl my-4 mb-10" />
      <div className="bg-black text-white py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="md:w-1/3">
            <h2 className="font-bold text-orange-600 animate-pulse transition-all duration-300">
              THE TIGER GYM
            </h2>
            <p className="text-sm leading-relaxed mt-10">
              The Tiger Gym is your ultimate fitness destination — delivering
              everything you need to crush your goals. From cutting-edge
              equipment to expert trainers and energizing classes, we’ve got it
              all under one roof.
            </p>
            <h2 className="font-bold mt-8 text-orange-600 animate-pulse transition-all duration-300">
              OUR SOCIALS
            </h2>
            <div className="flex gap-6 mt-6 md:text-4xl text-3xl items-center justify-center">
              <a
                target="blank"
                href="https://www.instagram.com/thetigerunisexgym?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              >
                <FaInstagram />
              </a>
              <a
                target="blank"
                href="https://www.facebook.com/100077119587917/photos/"
              >
                <SiFacebook />
              </a>
              <a
                target="blank"
                href="https://www.youtube.com/watch?v=0QiKYOMNv-M"
              >
                <FaYoutube />
              </a>
              <a
                target="blank"
                href="https://maps.app.goo.gl/ZYBrAcqG1hECvKGp8"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="md:w-1/3">
            <h2 className="font-bold text-orange-600 animate-pulse transition-all duration-300">
              LOCATIONS
            </h2>
            <div className="w-full h-[200px] rounded-lg overflow-hidden mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3845.638771782628!2d74.99063707489049!3d15.450035785143248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d3b8d3215d3b%3A0x3871c62ae3cfc4da!2sThe%20tiger%20unisex%20gym!5e0!3m2!1sen!2sin!4v1745994258953!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Tiger Gym Location"
              ></iframe>
            </div>
            <p className="mt-4 text-sm">
              Saptapur Raj heights building, Sharada High School, Dharwad,
              Karnataka 580001
            </p>
            <p className="mt-2 text-sm font-semibold">
              PH NO: <span className="font-bold">9380965625, 8792698955</span>
            </p>
          </div>

          <div className="md:w-1/3">
            <h2 className="font-bold text-orange-600 animate-pulse transition-all duration-300">
              WORKING HOURS
            </h2>
            <p className="mt-4 font-medium">Monday – Saturday:</p>
            <p className="text-sm mt-2">MORNING: 6:00AM To 10:00AM</p>
            <p className="text-sm mt-2">EVENING: 5:00PM To 11:00PM</p>
            <p className="mt-4 font-medium">Sunday:</p>
            <p className="text-sm">Holiday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
