/* eslint-disable react/prop-types */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const WebHeader = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", section: "section1" },
    { name: "About Us", section: "section2" },
    { name: "Courses", section: "section4" },
    { name: "Contact", section: "section6" },
  ];

  return (
    <header className="fixed w-full bg-gray-50 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-6 py-0.5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="siriusjpg.jpg"
            alt="Logo"
            className="h-14 w-auto hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-black hover:text-[#B1771D] transition-colors duration-300"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSection(link.section)}
              className="relative group px-2 py-1"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 text-black font-medium group-hover:text-[#B1771D] transition-colors duration-300">
                {link.name}
              </span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B1771D] origin-left"
                initial={{ scaleX: 0 }}
                variants={{
                  hover: {
                    scaleX: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  },
                }}
              />
              <motion.div
                className="absolute inset-0 bg-[#B1771D]/5 rounded-lg -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                variants={{
                  hover: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  },
                }}
              />
            </motion.button>
          ))}
          <a href="/auth">
          <motion.button className="px-6 py-2 rounded-full bg-[#B1771D] text-white font-medium transition-colors duration-300 hover:bg-[#955C17]">
            Student Portal
          </motion.button>
          </a>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex flex-col items-center py-6 space-y-6">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      scrollToSection(link.section);
                      setIsMenuOpen(false);
                    }}
                    className="relative group"
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-black font-medium group-hover:text-[#B1771D] transition-colors duration-300">
                      {link.name}
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B1771D] origin-left"
                      initial={{ scaleX: 0 }}
                      variants={{
                        hover: {
                          scaleX: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        },
                      }}
                    />
                  </motion.button>
                ))}
                 <a href="/auth">
                <motion.button className="px-6 py-2 rounded-full bg-[#B1771D] text-white font-medium transition-colors duration-300 hover:bg-[#955C17]">
                  Student Portal
                </motion.button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default WebHeader;


