import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Left - Branding and Contact */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <img src="siriuspng.png" alt="Logo" className="h-10 w-10 object-cover" />
            <span className="text-xl font-semibold text-white">Tutor Starter</span>
          </div>
          <p className="text-sm text-gray-400">
            Rhema-Gold Institution is committed to providing students with cutting-edge education for successful careers in technology.
          </p>
          <div className="text-sm space-y-1">
            <p className="flex items-center space-x-2">
              <Phone size={16} className="text-blue-400" />
              <span>540-429-7979</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail size={16} className="text-blue-400" />
              <span>training@rhemagoldinst.com</span>
            </p>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-white font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            {["About", "Career", "Blog", "Pricing"].map((item, index) => (
              <li key={index} className="hover:text-blue-400 transition duration-300">
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-white font-semibold">Resources</h3>
          <ul className="space-y-2">
            {["Courses", "Membership", "Instructor", "Privacy Policy", "FAQs"].map((item, index) => (
              <li key={index} className="hover:text-blue-400 transition duration-300">
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-white font-semibold">Support</h3>
          <ul className="space-y-2">
            {["Appointment", "Forums", "Documentation", "Contact Us"].map((item, index) => (
              <li key={index} className="hover:text-blue-400 transition duration-300">
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p>
          © {new Date().getFullYear()} Tutor. All rights reserved. | Powered by{" "}
          <a href="https://qodexcore.com" className="text-blue-400 hover:text-blue-500 transition duration-300">
            Qodexcore
          </a>
        </p>
      </motion.div>
    </footer>
  );
}
