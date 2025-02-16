/* eslint-disable react/prop-types */
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   courseCurriculumInitialFormData,
//   courseLandingInitialFormData,
// } from "@/config";
// import { InstructorContext } from "@/context/instructor-context";
// import { formatPrice } from "@/lib/utils";
// import { Edit } from "lucide-react";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";


// function InstructorCourses({ listOfCourses }) {
//   const navigate = useNavigate();
//   const {
//     setCurrentEditedCourseId,
//     setCourseLandingFormData,
//     setCourseCurriculumFormData,
//   } = useContext(InstructorContext);

//   return (
//     <Card>
//       <CardHeader className="flex justify-between flex-row items-center">
//         <CardTitle className="text-xl sm:text-2xl font-extrabold">All Courses</CardTitle>
//         <Button
//           onClick={() => {
//             setCurrentEditedCourseId(null);
//             setCourseLandingFormData(courseLandingInitialFormData);
//             setCourseCurriculumFormData(courseCurriculumInitialFormData);
//             navigate("/instructor/create-new-course");
//           }}
//           className="p-6"
//         >
//           Create New Course
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Course</TableHead>
//                 <TableHead>Students</TableHead>
//                 <TableHead>Revenue</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {listOfCourses && listOfCourses.length > 0
//                 ? listOfCourses.map((course) => (
//                     <TableRow key={course._id}>
//                       <TableCell className="font-medium">
//                         {course?.title}
//                       </TableCell>
//                       <TableCell>{course?.students?.length}</TableCell>
//                       <TableCell>
//                         {formatPrice(course?.students?.length * course?.pricing)}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           onClick={() => {
//                             navigate(`/instructor/edit-course/${course?._id}`);
//                           }}
//                           variant="ghost"
//                           size="sm"
//                         >
//                           <Edit className="h-6 w-6" />
//                         </Button>
//                         {/* <Button variant="ghost" size="sm">
//                           <Delete className="h-6 w-6" />
//                         </Button> */}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 : null}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default InstructorCourses;
import React, { useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { formatPrice } from "@/lib/utils";
import { Edit, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 5;

function InstructorCourses({ listOfCourses = [] }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sort courses by date in descending order
  const sortedCourses = [...listOfCourses].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Filter courses based on search term
  const filteredCourses = sortedCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCreateNewCourse = () => {
    setCurrentEditedCourseId(null);
    setCourseLandingFormData(courseLandingInitialFormData);
    setCourseCurriculumFormData(courseCurriculumInitialFormData);
    navigate("/instructor/create-new-course");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-xl font-extrabold sm:text-2xl bg-gradient-to-r from-amber-600 to-zinc-900 bg-clip-text text-transparent">
            All Courses
          </CardTitle>
          <Button
            onClick={handleCreateNewCourse}
            className="p-6 bg-gradient-to-r from-amber-600 to-zinc-900 hover:from-amber-800 hover:to-stone-900 transition-all duration-300 transform hover:scale-105"
          >
            Create New Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <TableHead>Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.map((course, index) => (
                  <motion.tr
                    key={course._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{course?.title}</TableCell>
                    <TableCell>{course?.students?.length}</TableCell>
                    <TableCell>
                      {formatPrice(course?.students?.length * course?.pricing)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => navigate(`/instructor/edit-course/${course?._id}`)}
                        variant="ghost"
                        size="sm"
                        className="transform transition-transform duration-200 hover:scale-110"
                      >
                        <Edit className="h-6 w-6 text-amber-600 group-hover:text-amber-700" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="transition-all duration-200 hover:bg-purple-50"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="transition-all duration-200 hover:bg-purple-50"
                >
                  Next
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default InstructorCourses;