
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
// import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
  updateCourseByIdService,
} from "@/services";

function AddNewCoursePage() {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;
    for (const item of courseCurriculumFormData) {
      if (isEmpty(item.title) || isEmpty(item.videoUrl)) {
        return false;
      }
      if (item.freePreview) {
        hasFreePreview = true;
      }
    }
    return hasFreePreview;
  }

  // async function handleCreateUpdateCourse() {
  //   const courseFinalFormData = {
  //     instructorId: auth?.user?._id,
  //     instructorName: auth?.user?.userName,
  //     date: new Date(),
  //     ...courseLandingFormData,
  //     students: [],
  //     curriculum: courseCurriculumFormData,
  //     isPublised: true,
  //   };

  //   const response = currentEditedCourseId !== null
  //     ? await updateCourseByIdService(currentEditedCourseId, courseFinalFormData)
  //     : await addNewCourseService(courseFinalFormData);

  //   if (response?.success) {
  //     setCourseLandingFormData(courseLandingInitialFormData);
  //     setCourseCurriculumFormData(courseCurriculumInitialFormData);
  //     navigate(-1);
  //     setCurrentEditedCourseId(null);
  //   }
  // }

  async function handleCreateUpdateCourse() {
    if (currentEditedCourseId !== null) {
      // For updates, only send the modified fields
      const courseUpdateData = {
        ...courseLandingFormData,
        curriculum: courseCurriculumFormData,
        date: new Date(),
      };
      
      const response = await updateCourseByIdService(currentEditedCourseId, courseUpdateData);
      
      if (response?.success) {
        setCourseLandingFormData(courseLandingInitialFormData);
        setCourseCurriculumFormData(courseCurriculumInitialFormData);
        navigate(-1);
        setCurrentEditedCourseId(null);
      }
    } else {
      // For new course creation, include all fields
      const newCourseData = {
        instructorId: auth?.user?._id,
        instructorName: auth?.user?.userName,
        date: new Date(),
        ...courseLandingFormData,
        students: [],
        curriculum: courseCurriculumFormData,
        isPublised: true,
      };
      
      const response = await addNewCourseService(newCourseData);
      
      if (response?.success) {
        setCourseLandingFormData(courseLandingInitialFormData);
        setCourseCurriculumFormData(courseCurriculumInitialFormData);
        navigate(-1);
        setCurrentEditedCourseId(null);
      }
    }
  }

  async function fetchCurrentCourseDetails() {
    const response = await fetchInstructorCourseDetailsService(currentEditedCourseId);

    if (response?.success) {
      const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];
        return acc;
      }, {});

      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }
  }

  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-600 hover:text-gray-900"
        onClick={() => navigate("/instructor")}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        <span className="text-sm">Back to Dashboard</span>
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          {currentEditedCourseId ? 'Edit Course' : 'Create a new course'}
        </h1>
        <Button
          disabled={!validateFormData()}
          className="w-full sm:w-auto text-sm tracking-wider font-bold px-4 sm:px-8"
          onClick={handleCreateUpdateCourse}
        >
          {currentEditedCourseId ? 'UPDATE' : 'SUBMIT'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 sm:p-4">
          <Tabs defaultValue="course-landing-page" className="space-y-4">
            <TabsList className="w-full sm:w-auto flex overflow-x-auto">
              {/* <TabsTrigger 
                value="curriculum"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Curriculum
              </TabsTrigger> */}
              <TabsTrigger 
                value="course-landing-page"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Course Details
              </TabsTrigger>
              <TabsTrigger 
                value="curriculum"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Curriculum
              </TabsTrigger>
              {/* <TabsTrigger 
                value="settings"
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                Settings
              </TabsTrigger> */}
            </TabsList>
            
            <div className="mt-4">
              {/* <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent> */}
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              {/* <TabsContent value="settings">
                <CourseSettings />
              </TabsContent> */}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCoursePage;