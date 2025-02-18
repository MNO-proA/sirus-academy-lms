import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { filterOptions, sortOptions } from "@/config";
// import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { ArrowUpDownIcon, Loader2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatPrice, capitalizeWord } from "@/lib/utils";
import { Link } from "react-router-dom";

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [yearFilter, setYearFilter] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { studentViewCoursesList } = useContext(StudentContext);
  // const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadingCourse, setLoadingCourse] = useState(null);

  const handleFilterChange = (sectionId, option) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[sectionId]) {
        updatedFilters[sectionId] = [option.id];
      } else {
        const index = updatedFilters[sectionId].indexOf(option.id);
        if (index === -1) {
          updatedFilters[sectionId].push(option.id);
        } else {
          updatedFilters[sectionId].splice(index, 1);
          if (updatedFilters[sectionId].length === 0) {
            delete updatedFilters[sectionId];
          }
        }
      }

      return updatedFilters;
    });
  };

  const extractTermFromTitle = (title) => {
    const terms = ["summer", "fall", "spring", "bootcamp"];
    const lowerTitle = title.toLowerCase();
    return terms.find((term) => lowerTitle.includes(term)) || "";
  };

  // const applyFilters = () => {
  //   let result = [...studentViewCoursesList];

  //   // Apply category, level, and term filters
  //   Object.entries(filters).forEach(([key, values]) => {
  //     if (values.length > 0) {
  //       result = result.filter(course => values.includes(course[key]));
  //     }
  //   });

  //   // Apply year filter
  //   if (yearFilter) {
  //     result = result.filter(course =>
  //       course.title.toLowerCase().includes(yearFilter.toLowerCase())
  //     );
  //   }

  const applyFilters = () => {
    let result = [...studentViewCoursesList];

    // Apply category and level filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        if (key === "term") {
          // Special handling for term filtering
          result = result.filter((course) =>
            values.some((term) =>
              course.title.toLowerCase().includes(term.toLowerCase())
            )
          );
        } else if (key === "category" || key === "level") {
          result = result.filter((course) => values.includes(course[key]));
        }
      }
    });

    // Apply year filter
    if (yearFilter) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(yearFilter.toLowerCase())
      );
    }

    // Apply sorting with fixed title sorting
    result.sort((a, b) => {
      switch (sort) {
        case "price-lowtohigh":
          return a.pricing - b.pricing;
        case "price-hightolow":
          return b.pricing - a.pricing;
        case "title-atoz":
          return a.title.localeCompare(b.title);
        case "title-ztoa":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  };

  // Add a debug function to help verify filtering
  const debugFilters = () => {
    console.log("Current filters:", filters);
    console.log("Current sort:", sort);
    console.log("Year filter:", yearFilter);
    console.log("Total courses:", studentViewCoursesList.length);
    console.log("Filtered courses:", filteredCourses.length);
  };

  useEffect(() => {
    debugFilters();
    const result = applyFilters();
    setFilteredCourses(result);
  }, [filters, yearFilter, sort, studentViewCoursesList]);

  useEffect(() => {
    // Initial render of all courses
    setFilteredCourses(studentViewCoursesList);
  }, [studentViewCoursesList]);

  useEffect(() => {
    const result = applyFilters();
    setFilteredCourses(result);
  }, [filters, yearFilter, sort, studentViewCoursesList]);

  const handleCourseNavigate = async (courseId) => {
    setLoadingCourse(courseId);
    const hasPurchased = false; // Replace with actual purchase check
    navigate(
      `/academy/${
        hasPurchased ? "course-progress" : "course/details"
      }/${courseId}`
    );
    setLoadingCourse(null);
  };

  return (
    <div className="mb-24 pt-32 container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {/* <Link 
    to="/academy/home" 
    className="flex items-center group hover:text-transparent hover:bg-gradient-to-r hover:from-amber-600 hover:to-zinc-900 hover:bg-clip-text transition-all duration-300"
  > */}
    <span className="group-hover:hidden">All Courses</span>
    {/* <span className="hidden group-hover:inline">Go Back Home</span>
  </Link> */}
        {/* All Courses */}
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-4">
          {Object.entries(filterOptions).map(([sectionId, options]) => (
            <div key={sectionId} className="p-4 border-b">
              <h3 className="font-bold mb-3">{sectionId.toUpperCase()}</h3>
              <div className="grid gap-2 mt-2">
                {options.map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium items-center gap-3"
                  >
                    <Checkbox
                      checked={filters[sectionId]?.includes(option.id) || false}
                      onCheckedChange={() =>
                        handleFilterChange(sectionId, option)
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Filter by year..."
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {filteredCourses.length} Results
            </span>
          </div>

          {/* Course List with Animations */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredCourses.length === 0 ? (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-center text-gray-500">No courses found.</p>
                </motion.div>
              ) : (
                filteredCourses.map((course) => (
                  <motion.div
                    key={course._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      onClick={() => handleCourseNavigate(course._id)}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="flex gap-4 p-4">
                        <div className="w-48 h-32 flex-shrink-0 flex items-center justify-center">
                          {loadingCourse === course._id ? (
                            <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
                          ) : (
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {course.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mb-1">
                            Created by{" "}
                            <span className="font-bold">
                              {capitalizeWord(course.instructorName)}
                            </span>
                          </p>
                          <p className="text-sm text-gray-500 mb-1">
                            Term:{" "}
                            {capitalizeWord(extractTermFromTitle(course.title))}
                          </p>
                          <p className="text-[16px] text-gray-600 mt-3 mb-2">
                            {`${course.curriculum?.length} ${
                              course.curriculum?.length <= 1
                                ? "Lecture"
                                : "Lectures"
                            } - ${course.level.toUpperCase()} Level`}
                          </p>
                          <p className="font-bold text-lg">
                            {formatPrice(course.pricing)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
