// import { GraduationCap, TvMinimalPlay } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { useContext } from "react";
// import { AuthContext } from "@/context/auth-context";
// import { motion, AnimatePresence } from "framer-motion";

// function StudentViewCommonHeader() {
//   const navigate = useNavigate();
//   const { resetCredentials } = useContext(AuthContext);

//   function handleLogout() {
//     resetCredentials();
//     sessionStorage.clear();
//   }

//   return (
//     <header className="flex items-center justify-between p-4 border-b relative">
//       <div className="flex items-center space-x-4">
//       <Link 
//           to="/home" 
//           className="flex items-center justify-center group transition-transform hover:scale-105"
//         >
//           <motion.div
//             initial={{ rotate: -10 }}
//             animate={{ rotate: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//           </motion.div>
//           <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
//             <img src="siriusjpg.jpg" alt="Sirius" className="h-14 w-32" />
//           </span>
//         </Link>
//         <div className="flex items-center space-x-1">
//           <Button
//             variant="ghost"
//             onClick={() => {
//               location.pathname.includes("/courses")
//                 ? null
//                 : navigate("/courses");
//             }}
//             className="text-[14px] md:text-[16px] font-medium"
//           >
//             Explore Courses
//           </Button>
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <div className="flex gap-4 items-center">
//           <div
//             onClick={() => navigate("/student-courses")}
//             className="flex cursor-pointer items-center gap-3"
//           >
//             <span className="font-extrabold md:text-xl text-[14px]">
//               My Courses
//             </span>
//             <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
//           </div>
//           <Button onClick={handleLogout}>Sign Out</Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default StudentViewCommonHeader;
// =========================================================================
// import { useContext, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { GraduationCap, TvMinimalPlay, LogOut, BookOpen, Menu, X } from "lucide-react";
// import { Button } from "../ui/button";
// import { AuthContext } from "@/context/auth-context";

// function StudentViewCommonHeader() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { resetCredentials, auth } = useContext(AuthContext);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     resetCredentials();
//     sessionStorage.clear();
//   };

//   const navItems = [
//     {
//       label: "Explore Courses",
//       icon: <BookOpen className="w-4 h-4" />,
//       onClick: () => navigate("/courses"),
//       highlight: location.pathname.includes("/courses"),
//     },
//     {
//       label: "My Courses",
//       icon: <TvMinimalPlay className="w-4 h-4" />,
//       onClick: () => navigate("/student-courses"),
//       highlight: location.pathname.includes("/student-courses"),
//     },
//   ];

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50 px-4 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo Section */}
//           <Link
//             to="/home"
//             className="flex items-center group"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 400, damping: 17 }}
//             >
//               <img src="siriusjpg.jpg" alt="Sirius" className="h-12 w-28" />
//             </motion.div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navItems.map((item, index) => (
//               <motion.div
//                 key={item.label}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   variant={item.highlight ? "default" : "ghost"}
//                   onClick={item.onClick}
//                   className="flex items-center gap-2 font-medium"
//                 >
//                   {item.icon}
//                   {item.label}
//                 </Button>
//               </motion.div>
//             ))}
            
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <p>{auth?.user?.userName}</p>
//               <Button
//                 variant="destructive"
//                 onClick={handleLogout}
//                 className="flex items-center gap-2"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Sign Out
//               </Button>
//             </motion.div>
//           </div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             className="md:hidden p-2"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </motion.button>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden py-4 space-y-2"
//             >
//               {navItems.map((item, index) => (
//                 <motion.div
//                   key={item.label}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Button
//                     variant={item.highlight ? "default" : "ghost"}
//                     onClick={() => {
//                       item.onClick();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full flex items-center justify-start gap-2 font-medium"
//                   >
//                     {item.icon}
//                     {item.label}
//                   </Button>
//                 </motion.div>
//               ))}
              
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: navItems.length * 0.1 }}
//               >
//                 <Button
//                   variant="destructive"
//                   onClick={handleLogout}
//                   className="w-full flex items-center justify-start gap-2"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Sign Out
//                 </Button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.header>
//   );
// }

// export default StudentViewCommonHeader;

import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, TvMinimalPlay, LogOut, BookOpen, Menu, X, User } from "lucide-react";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/auth-context";
import Logo from "../../../public/logo-h.png"

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetCredentials, auth } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  const navItems = [
    {
      label: "Explore Courses",
      icon: <BookOpen className="w-4 h-4" />,
      onClick: () => navigate("/academy/courses"),
      highlight: location.pathname.includes("/academy/courses"),
    },
    {
      label: "My Courses",
      icon: <TvMinimalPlay className="w-4 h-4" />,
      onClick: () => navigate("/academy/student-courses"),
      highlight: location.pathname.includes("/academy/student-courses"),
    },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50 px-4 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img src={Logo }alt="Sirius" className="h-40 w-40" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div key={item.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={item.highlight ? "default" : "ghost"}
                  onClick={item.onClick}
                  className="flex items-center gap-2 font-medium"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </motion.div>
            ))}

            {/* User Info */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex items-center gap-3 border-l pl-4">
                <User className="w-5 h-5 text-gray-500" />
                <p className="text-gray-700 font-semibold text-sm capitalize">{auth?.user?.userName}</p>
              </div>
            </motion.div>

            {/* Logout Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-2"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={item.highlight ? "default" : "ghost"}
                    onClick={() => {
                      item.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-start gap-2 font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </motion.div>
              ))}

              {/* User Info for Mobile */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.1 }}>
                <div className="flex items-center gap-3 px-4 py-2 border-t">
                  <User className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-700 font-semibold text-sm capitalize">{auth?.user?.userName}</p>
                </div>
              </motion.div>

              {/* Logout Button */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.1 }}>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-start gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default StudentViewCommonHeader;
