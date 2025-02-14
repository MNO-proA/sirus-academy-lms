import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section id="section2" className="bg-gray-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="siriuspng.png"
            alt="About Us"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        <motion.div
          className="text-gray-700"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Mission</h3>
          <p className="mb-6">
            Rhema-Gold Institution is committed to providing students with a
            comprehensive, cutting-edge education that prepares them for
            successful careers in the rapidly evolving technology field. We
            strive to deliver a relevant, engaging, and challenging curriculum.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">Vision</h3>
          <p>
            Our vision is to be a leading institution of higher learning in
            information technology, recognized for our innovative curriculum,
            exceptional faculty, and outstanding graduates. We aim to develop
            new technologies and empower our students to become leaders in
            their fields.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;

