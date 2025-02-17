/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StudentContext } from "@/context/student-context";
import { formatPrice, capitalizeWord } from '@/lib/utils';

const CourseGrid = ({handleCourseNavigate}) => {
  const { studentViewCoursesList } = useContext(StudentContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
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

  // Enhanced sorting that considers both date and time
  const recentCourses = studentViewCoursesList
    ?.sort((a, b) => {
      // Convert dates to timestamps for more precise comparison
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      // If timestamps are different, sort by them
      if (dateB !== dateA) {
        return dateB - dateA;
      }
      
      // If timestamps are the same, use _id as a secondary sort key
      // MongoDB ObjectIds contain a timestamp in their first 4 bytes
      return b._id.localeCompare(a._id);
    })
    .slice(0, 4);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {recentCourses && recentCourses.length > 0 ? (
        recentCourses.map((courseItem) => (
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
    </motion.div>
  );
};

export default CourseGrid;