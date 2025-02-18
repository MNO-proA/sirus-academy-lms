import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { courseCategories } from "@/config";
import banner from "../../../../public/siruslady.png";
import { Button } from "@/components/ui/button";
import { StudentContext } from "@/context/student-context";
import { checkCoursePurchaseInfoService, fetchStudentViewCourseListService } from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { formatPrice, capitalizeWord } from '@/lib/utils';
import CourseGrid from './CourseGrid';

const StudentHomePage = () => {
  const { studentViewCoursesList, setStudentViewCoursesList } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleNavigateToCoursesPage = (getCurrentId) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  };

  const handleCourseNavigate = async (getCurrentCourseId) => {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/academy/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/academy/course/details/${getCurrentCourseId}`);
      }
    }
  };

  useEffect(() => {
    fetchStudentViewCourseListService().then(response => {
      if (response?.success) setStudentViewCoursesList(response?.data);
    });
  }, []);

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 2
  //   }).format(price);
  // };

  // const capitalizeInstructor = (name) => {
  //   return name.split(' ').map(word => 
  //     word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //   ).join(' ');
  // };

  return (
    <div className="pt-32 min-h-screen bg-white">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8"
      >
        <div className="lg:w-1/2 lg:pr-12 mb-5 lg:mb-5">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Learning that gets you
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-gray-600"
          >
            Skills for your present and your future. Get Started with us
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:w-full mb-5 lg:mb-5"
        >
          <img
            src='/images/svmwd.jpg'
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300"
            alt="Learning Banner"
          />
        </motion.div>
      </motion.section>

      {/* <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold mb-6"
        >
          Course Categories
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {courseCategories.map((categoryItem) => (
            <motion.div
              key={categoryItem.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="w-full justify-start hover:bg-primary hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
                variant="outline"
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              >
                {categoryItem.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </section> */}

      <section ref={ref} className="mb-36 py-8 px-4 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold mb-6"
        >
          Recent Courses
        </motion.h2>
        {/* <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <motion.div
                key={courseItem?._id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                onClick={() => handleCourseNavigate(courseItem?._id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={courseItem?.image}
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover transform transition-transform hover:scale-110 duration-300"
                    alt={courseItem?.title}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    {capitalizeWord(courseItem?.instructorName)}
                  </p>
                  <p className="font-bold text-lg text-primary">
                    {formatPrice(courseItem?.pricing)}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-500 text-lg"
            >
              No Courses Found
            </motion.div>
          )}
        </motion.div> */}
        <CourseGrid handleCourseNavigate={handleCourseNavigate}/>
      </section>
    </div>
  );
};

export default StudentHomePage;