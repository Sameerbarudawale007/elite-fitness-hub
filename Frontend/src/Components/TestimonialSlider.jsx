import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Tiger Gym changed my life. The trainers are amazing and always motivate me to push harder!",
    author: "Irfan",
  },
  {
    quote:
      "I joined Tiger Gym 6 months ago and have already seen great results. Highly recommended!",
    author: "Sameer",
  },
  {
    quote:
      "A very positive environment for fitness. Safe for ladies and well-equipped.",
    author: "Fatima Malik",
  },
  {
    quote:
      "I gained 5 kg of muscle in 3 months thanks to their guidance and support.",
    author: "Kaif",
  },
  {
    quote: "The gym is very clean, modern, and the staff is super friendly!",
    author: "Chetan",
  },
  {
    quote:
      "Tiger Gym has flexible timing and very professional trainers. Worth every penny.",
    author: "Farhan",
  },
  {
    quote: "It’s the perfect place to begin your fitness journey. Loved it!",
    author: "Arif",
  },
  {
    quote: "A gym that truly cares about your transformation. Big respect!",
    author: "Bilal",
  },
  {
    quote:
      "Ladies-only sessions gave me the confidence to start working out. Thank you!",
    author: "Aslam",
  },
  {
    quote: "Amazing gym with a positive vibe and all the modern equipment.",
    author: "Qureshi",
  },
  {
    quote:
      "They helped me lose 10 kgs in 4 months! Truly the best gym in the city.",
    author: "Nawaz",
  },
  {
    quote: "Great for muscle gain, weight loss, and overall body fitness.",
    author: "Danish",
  },
  {
    quote: "My kids love their fitness program! Fun and energetic staff.",
    author: "Rabia Khan",
  },
  {
    quote: "Tiger Gym is not just a place, it’s a fitness family!",
    author: "Ali",
  },
  {
    quote: "Clean environment, friendly trainers, and great workout plans!",
    author: "Areeba Mirza",
  },
  {
    quote: "This gym helped me recover from my back pain and rebuild strength.",
    author: "Noman Farid",
  },
  {
    quote: "They customize the workout to your goals. Super effective!",
    author: "Maria Saleem",
  },
  {
    quote: "Affordable, modern, and powerful — Tiger Gym is a game changer.",
    author: "Hamza Siddiqi",
  },
  {
    quote: "Best gym for all age groups. I’m 45 and feel like 25 again!",
    author: "Farooq Shaikh",
  },
  {
    quote:
      "Perfect location, great atmosphere, and solid guidance from the team.",
    author: "Neha Zubair",
  },
  {
    quote: "I love the personal training sessions. Very detailed and focused.",
    author: "Sarmad Niazi",
  },
  {
    quote:
      "One of the few gyms where you actually feel supported and encouraged.",
    author: "Lubna Rafique",
  },
  {
    quote: "I’ve tried many gyms, but this one is on another level!",
    author: "Yasir Jamal",
  },
  {
    quote: "They not only help you build your body but also your confidence.",
    author: "Misha Rehman",
  },
  {
    quote: "I joined with zero fitness level and now I’m doing daily workouts!",
    author: "Kashif Iqbal",
  },
  {
    quote: "Love the vibe here. Makes me want to come every day.",
    author: "Asma Qadir",
  },
  {
    quote: "I never thought gym could be this much fun!",
    author: "Umar Farooq",
  },
  {
    quote: "It’s more than fitness — it’s about lifestyle and discipline!",
    author: "Tania Sohail",
  },
  {
    quote:
      "They offer diet plans, training, and even mental motivation. Amazing experience!",
    author: "Adnan Malik",
  },
  {
    quote: "Best decision of my life was joining Tiger Gym. 100% recommended!",
    author: "Hira Mansoor",
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-black text-white p-8 w-full mx-auto text-center shadow-2xl relative overflow-hidden">
      <h1 className="md:text-6xl text-4xl text-center font-bold text-orange-600 animate-pulse transition-all duration-300 mb-10">
        Testimonial
      </h1>
      <div className="text-yellow-400 md:text-6xl text-5xl mb-4 font-bold">“</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <p className="italic text-xl md:text-3xl">{testimonials[index].quote}</p>
          <p className="mt-4 font-bold text-yellow-400">
            {testimonials[index].author}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-center space-x-6">
        <button
          onClick={prev}
          className="text-white hover:text-orange-600 text-5xl cursor-pointer transition"
        >
          &#8592;
        </button>
        <button
          onClick={next}
          className="text-white hover:text-orange-600 text-5xl cursor-pointer transition"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
