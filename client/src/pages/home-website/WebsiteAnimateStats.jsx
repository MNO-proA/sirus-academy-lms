/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "Learners", value: 300 },
  { label: "Certifications", value: 5000 },
  { label: "Instructors", value: 120 },
  { label: "Courses published", value: 760 },
];

const images = [
  "images/coming-soon-bg.jpg",
  "images/main-slider-01.jpg",
 "images/main-slider-02.jpg",
 "images/main-slider-03.jpg",
];


const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let start = 0;
    const end = value;
    
    const startCounting = () => {
      setIsRunning(true);
      start = 0;
      setCount(0);
    };

    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        start += 1;
        setCount(start);
        
        if (start === end) {
          setIsRunning(false);
          setTimeout(() => {
            startCounting();
          }, 5000);
        }
      }, stepTime);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [value, isRunning]);

  return (
    <motion.span
      animate={{ opacity: [0, 1] }}
      className="text-3xl font-bold text-white"
    >
      {count}
    </motion.span>
  );
};

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, x: "100%" }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? "0%" : "-100%"
          }}
          transition={{ duration: 1 }}
        >
          <img
            src={image}
            alt={`Background ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default function StatsSection() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 400],
    ["rgba(0, 0, 0, 0)", "rgb(255, 255, 255)"]
  );

  return (
    <motion.section
      className="relative h-96 flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <BackgroundSlider />
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-1">
              <AnimatedNumber value={stat.value} />
              <span className="text-xl text-white">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}