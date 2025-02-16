import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services";
import { Watch, BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { capitalizeWord } from "@/lib/utils";

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } = useContext(StudentContext);
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  async function fetchStudentBoughtCourses() {
    const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentBoughtCoursesList(response?.data);
    }
  }

  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 p-8 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900">My Learning Journey</h1>
        <p className="mt-2 text-gray-600">Continue your learning adventure with your enrolled courses</p>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0 flex-grow">
                  <div className="relative group">
                    <img
                      src={course?.courseImage}
                      alt={course?.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        className="transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={() => navigate(`/academy/course-progress/${course?.courseId}`)}
                      >
                        <Watch className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
                      {course?.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <p className="text-sm">{capitalizeWord(course?.instructorName)}</p>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Last accessed: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => navigate(`/academy/course-progress/${course?.courseId}`)}
                    className="w-full bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
                  >
                    <Watch className="mr-2 h-4 w-4" />
                    Resume Course
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="col-span-full flex flex-col items-center justify-center py-16 text-center"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h2>
            <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
            <Button 
              onClick={() => navigate('/courses')}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Browse Courses
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default StudentCoursesPage;