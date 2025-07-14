import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";

const images = [
  "/Images/Photo1.jpg",
  "/Images/Photo2.jpg",
  "/Images/Photo3.jpg",
  "/Images/Photo4.jpg",
  "/Images/Photo5.jpg",
  "/Images/Photo6.jpg",
  "/Images/Photo7.jpg",
  "/Images/Photo8.jpg",
  "/Images/Photo9.jpg",
  "/Images/Photo10.jpg",
  "/Images/Photo11.jpg",
  "/Images/Photo12.jpg",
  "/Images/Photo13.jpg",
  "/Images/Photo14.jpg",
  "/Images/Photo15.jpg",
  "/Images/Photo16.jpg",
  "/Images/Photo17.jpg",
  "/Images/Photo18.jpg",
  "/Images/Photo19.jpg",
  "/Images/Photo20.jpg",
  "/Images/Photo21.jpg",
  "/Images/Photo22.jpg",
  "/Images/Photo23.jpg",
  "/Images/Photo24.jpg",
  "/Images/Photo25.jpg",
  "/Images/Photo26.jpg",
  "/Images/Photo27.jpg",
  "/Images/Photo28.jpg",
  "/Images/Photo29.jpg",
];

const videos = [
  "/Videos/workout1.mp4",
  "/Videos/workout2.mp4",
  "/Videos/workout3.mp4",
  "/Videos/workout4.mp4",
  "/Videos/workout5.mp4",
  "/Videos/workout6.mp4",
  "/Videos/workout7.mp4",
  "/Videos/workout8.mp4",
  "/Videos/workout9.mp4",
  "/Videos/workout10.mp4",
  "/Videos/workout11.mp4",
  "/Videos/workout12.mp4",
  "/Videos/workout13.mp4",
  "/Videos/workout14.mp4",
  "/Videos/workout15.mp4",
  "/Videos/workout16.mp4",
  "/Videos/workout17.mp4",  
  "/Videos/workout18.mp4",
  "/Videos/workout19.mp4",
];

const media = [
  ...images.map((src) => ({ type: "image", src })),
  ...videos.map((src) => ({ type: "video", src })),
];

const variants = {
  enter: (direction) => ({
    x: direction === "next" ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction === "next" ? -300 : 300,
    opacity: 0,
  }),
};

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideshowRef = useRef(null);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    clearInterval(slideshowRef.current);
  };

  const prevImage = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isOpen) {
      slideshowRef.current = setInterval(nextImage, 3500);
    }
    return () => clearInterval(slideshowRef.current);
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    trackMouse: true,
  });

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <div className="bg-black text-white py-10 px-6 md:px-20">
      <h2 className="md:text-5xl text-4xl font-bold mb-6 text-center text-orange-600 animate-pulse transition-all duration-300 pb-8">
        Gym Gallery💪
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.slice(0, 5).map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Gym ${index}`}
            className="w-full h-48 object-cover rounded-lg cursor-pointer shadow-md"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px #f97316" }} // orange glow on hover
            transition={{ duration: 0.3 }}
            onClick={() => openLightbox(index)}
          />
        ))}

        <motion.div
          className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg cursor-pointer text-xl font-semibold"
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px #f97316" }}
          transition={{ duration: 0.3 }}
          onClick={() => openLightbox(0)}
        >
          View All
        </motion.div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            key="lightbox"
            className={
              "fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 cursor-pointer " +
              (isFullscreen ? "p-0" : "p-4")
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => clearInterval(slideshowRef.current)}
            onMouseLeave={() =>
              (slideshowRef.current = setInterval(nextImage, 3500))
            }
          >
            <div
              {...swipeHandlers}
              className="relative w-full h-full flex justify-center items-center"
              onClick={(e) => e.stopPropagation()} // prevent close on inner clicks
            >
              <button
                className="absolute top-4 right-6 text-white text-6xl cursor-pointer font-bold z-50 transition-all duration-500 transform scale-95 hover:scale-100"
                onClick={closeLightbox}
              >
                &times;
              </button>
              <button
                className="absolute left-4 text-white text-6xl z-50 cursor-pointer transition-all duration-500 transform scale-95 hover:scale-100"
                onClick={prevImage}
              >
                ❮
              </button>

              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="max-w-full max-h-[80vh] rounded-xl"
              >
                {media[currentIndex].type === "video" ? (
                  <video
                    src={media[currentIndex].src}
                    controls
                    autoPlay
                    muted
                    className="max-w-full max-h-[80vh] rounded-xl"
                  />
                ) : (
                  <img
                    src={media[currentIndex].src}
                    alt={`Media ${currentIndex}`}
                    className="max-w-full max-h-[80vh] rounded-xl"
                  />
                )}
              </motion.div>

              <button
                className="absolute right-4 text-white text-6xl cursor-pointer z-50"
                onClick={nextImage}
              >
                ❯
              </button>
              <button
                className="absolute bottom-16 right-6 text-white cursor-pointer px-3 py-1 rounded border border-white text-xs hover:bg-white hover:text-black transition-all duration-500 transform scale-95 hover:scale-100"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
              <div className="absolute bottom-4 text-white cursor-pointer text-sm">
                {currentIndex + 1} / {media.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center px-4 py-10 md:py-16 bg-black">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-extrabold text-orange-600 animate-pulse transition-all duration-300">
          Inside The Tiger Gym:{" "}
          <span className="text-white">Real Talk, Real Gains</span>
        </h1>

        <div className="mt-10 w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/O0qXGHrGeto?si=WQTevr1Qzdgp0g-0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
