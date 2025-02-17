/* eslint-disable react/prop-types */
import { useMemo, useState, useContext } from 'react';
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
import { DollarSign, Search, Users, Book } from "lucide-react";
import { capitalizeWord, formatPrice } from "@/lib/utils";
import { motion } from 'framer-motion';
import { AuthContext } from "@/context/auth-context";

const ITEMS_PER_PAGE = 5;

function InstructorDashboard({ listOfCourses }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { auth } = useContext(AuthContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Memoize calculations to prevent unnecessary re-renders
  const { totalProfit, totalStudents, studentList, totalCourses } = useMemo(() => {
    return listOfCourses.reduce(
      (acc, course) => {
        const studentCount = course.students?.length || 0;
        // Increment course count by 1 for each course
        acc.totalCourses += 1;
        acc.totalStudents += studentCount;
        acc.totalProfit += (course.pricing || 0) * studentCount;
        
        // Safely handle student data
        course.students?.forEach((student) => {
          acc.studentList.push({
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });
        
        return acc;
      },
      {
        totalCourses: 0,
        totalStudents: 0,
        totalProfit: 0,
        studentList: [],
      }
    );
  }, [listOfCourses]);

  const getConfigItems = () => {
    const baseConfig = [
      {
        icon: Users,
        label: "Total Students",
        value: totalStudents,
        gradientFrom: "from-amber-600",
        gradientTo: "to-zinc-900",
      },
      {
        icon: Book,
        label: "Total Courses",
        value: totalCourses,
        gradientFrom: "from-amber-600",
        gradientTo: "to-zinc-900",
      }
    ];

    // Add revenue card only for admin users
    if (auth?.user?.role === "admin") {
      baseConfig.push({
        icon: DollarSign,
        label: "Total Revenue",
        value: formatPrice(totalProfit),
        gradientFrom: "from-amber-600",
        gradientTo: "to-zinc-900",
      });
    }

    return baseConfig;
  };
  // Filter and paginate student list
  const filteredStudents = useMemo(() => {
    return studentList.filter(student => 
      student.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [studentList, searchTerm]);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {getConfigItems().map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.label}
              </CardTitle>
              <div className={`p-2 rounded-full bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} bg-opacity-10`}>
                <item.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} bg-clip-text text-transparent`}>
                {item.value}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-extrabold sm:text-2xl  bg-gradient-to-r from-amber-600 to-zinc-900 bg-clip-text text-transparent">
            Students List
          </CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students..."
              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-amber-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((studentItem, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{studentItem.courseTitle}</TableCell>
                    <TableCell>{capitalizeWord(studentItem.studentName)}</TableCell>
                    <TableCell>{studentItem.studentEmail}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
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

export default InstructorDashboard;