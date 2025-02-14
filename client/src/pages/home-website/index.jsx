import React, { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import StatsSection from "./WebsiteAnimateStats";
import CoursesSection from "./WebsiteCourses";
import FeaturesSection from "./WebsiteFeatureCard";
import ContactSection from "./WebsiteContact";
import Footer from "./WebsiteFooter";
import AboutUs from "./WebsiteAbout";
import WebHeader from "./WebsiteHeader";

const WebsiteHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section1");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  // Countdown timer effect
  useEffect(() => {
    const getTimeRemaining = (endtime) => {
      const total = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return { total, days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      const endDate = new Date(new Date().getFullYear() + 1, 0, 1);
      const timeLeft = getTimeRemaining(endDate);
      setCountdown(timeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll handler for section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const topEdge = section.offsetTop - 80;
        const bottomEdge = topEdge + section.offsetHeight;
        const wScroll = window.scrollY;

        if (topEdge < wScroll && bottomEdge > wScroll) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans">
      {/* Header */}
      {/* <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <img src="siriusjpg.jpg" alt="" height={"100px"} width={"100px"} />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <nav
            className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent
            ${isMenuOpen ? "block" : "hidden"} md:block`}
          >
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <li>
                <button
                  onClick={() => scrollToSection("section1")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("section2")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("section4")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("section6")}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header> */}
      <WebHeader scrollToSection={scrollToSection}/>

      {/* Main Banner */}
      <section id="section1" className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="video/course-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h6 className="text-5xl mb-4 font-bold">
                SirusIT Strategy Academy
              </h6>
              <h2 className="text-xs mb-8 font-bold">
                A training Academy for{" "}
                <span className="text-[#B1771D]">Rhema-Gold</span> Consulting &
                Training Institute.
              </h2>
              <button
                onClick={() => scrollToSection("section2")}
                className="bg-[#B1771D] hover:bg-[#8d601c] text-white px-8 py-3 rounded-full"
              >
                Discover more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Card */}
      <StatsSection />

      {/* About Us */}
      <AboutUs />

      {/* Courses Section */}

      <CoursesSection />

      {/* Contact Section */}

      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WebsiteHome;
