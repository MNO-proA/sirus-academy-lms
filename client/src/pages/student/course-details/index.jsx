import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  createPaymentService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle, Link, Youtube } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContentPreview from "@/components/content-preview";
import { formatPrice, capitalizeWord } from '@/lib/utils';


function StudentViewCourseDetailsPage() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    // const checkCoursePurchaseInfoResponse =
    //   await checkCoursePurchaseInfoService(
    //     currentCourseDetailsId,
    //     auth?.user._id
    //   );

    // if (
    //   checkCoursePurchaseInfoResponse?.success &&
    //   checkCoursePurchaseInfoResponse?.data
    // ) {
    //   navigate(`/course-progress/${currentCourseDetailsId}`);
    //   return;
    // }

    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    console.log(getCurrentVideoInfo);
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }


  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("course/details"))
      setStudentViewCourseDetails(null),
        setCurrentCourseDetailsId(null),
        setCoursePurchaseId(null);
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

      // const formatPrice = (price) => {
      //   return new Intl.NumberFormat('en-US', {
      //     style: 'currency',
      //     currency: 'USD',
      //     minimumFractionDigits: 2
      //   }).format(price);
      // };
    
      // const capitalizeWord = (name) => {
      //   return name.split(' ').map(word => 
      //     word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      //   ).join(' ');
      // };

  return (
    <div className="mb-24 pt-32 mx-auto p-4">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">
          {studentViewCourseDetails?.title}
        </h1>
        <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {capitalizeWord(studentViewCourseDetails?.instructorName)}</span>
          <span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span>
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {capitalizeWord(studentViewCourseDetails?.primaryLanguage)}
          </span>
          <span>
            {studentViewCourseDetails?.students.length}{" "}
            {studentViewCourseDetails?.students.length <= 1
              ? "Student"
              : "Students"}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you&apos;ll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentViewCourseDetails?.objectives
                  .split(",")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{studentViewCourseDetails?.description}</CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {studentViewCourseDetails?.curriculum?.map(
                (curriculumItem, index) => (
                  <li
                    key={curriculumItem?._id}
                    className={`${
                      curriculumItem?.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex items-center mb-4`}
                    onClick={
                      curriculumItem?.freePreview
                        ? () => handleSetFreePreview(curriculumItem)
                        : null
                    }
                  >
                    {curriculumItem?.freePreview ? (
                      curriculumItem?.type === "video" ? (
                        <PlayCircle className="mr-2 h-4 w-4" />
                      ) : curriculumItem?.type === "url" ? (
                        <Link className="mr-2 h-4 w-4" />
                      ) : curriculumItem?.type === "youtube" ? (
                        <Youtube className="mr-2 h-4 w-4" />
                      ) : null
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                    <span>{curriculumItem?.title}</span>
                  </li>
                )
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
              {
                studentViewCourseDetails?.curriculum[
                  getIndexOfFreePreviewUrl
                ].type === "video" ? (
                  <VideoPlayer
                    url={
                      studentViewCourseDetails?.curriculum[
                        getIndexOfFreePreviewUrl
                      ]?.videoUrl
                    }
                    width="450px"
                    height="200px"
                    onProgressUpdate={() => {}}
                  />
                ) : studentViewCourseDetails?.curriculum[
                    getIndexOfFreePreviewUrl
                  ].type === "url" ? (
                  <iframe
                    src={
                      studentViewCourseDetails?.curriculum[
                        getIndexOfFreePreviewUrl
                      ]?.videoUrl
                    }
                    width="450px"
                    height="200px"
                    title="Course Preview"
                  ></iframe>
                ) : studentViewCourseDetails?.curriculum[
                    getIndexOfFreePreviewUrl
                  ].type === "youtube" ? (
                    <ContentPreview
                    type={studentViewCourseDetails?.curriculum[
                      getIndexOfFreePreviewUrl
                    ].type}
                    url={studentViewCourseDetails?.curriculum[
                      getIndexOfFreePreviewUrl
                    ].videoUrl} 
                  />
                ) : null
              }
                {/* // <VideoPlayer
                //   url={
                //     getIndexOfFreePreviewUrl !== -1
                //       ? console.log(studentViewCourseDetails?.curriculum[
                //           getIndexOfFreePreviewUrl
                //         ].type)
                //       : ""
                //   }
                //   width="450px"
                //   height="200px"
                //   onProgressUpdate={() => {}}
                // /> */}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                {formatPrice(studentViewCourseDetails?.pricing)}

                </span>
              </div>
              {/* <Button onClick={handleCreatePayment} className="w-full">
                Buy Now
              </Button> */}
              <Button
                onClick={() =>
                  navigate("/academy/checkout", {
                    state: { courseDetails: studentViewCourseDetails },
                  })
                }
                className="w-full"
              >
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
          {
                studentViewCourseDetails?.curriculum[
                  getIndexOfFreePreviewUrl
                ].type === "video" ? (
                  <VideoPlayer
                    url={
                      studentViewCourseDetails?.curriculum[
                        getIndexOfFreePreviewUrl
                      ]?.videoUrl
                    }
                    width="450px"
                    height="200px"
                    onProgressUpdate={() => {}}
                  />
                ) : studentViewCourseDetails?.curriculum[
                    getIndexOfFreePreviewUrl
                  ].type === "url" ? (
                  <iframe
                    src={
                      studentViewCourseDetails?.curriculum[
                        getIndexOfFreePreviewUrl
                      ]?.videoUrl
                    }
                    width="450px"
                    height="200px"
                    title="Course Preview"
                  ></iframe>
                ) : studentViewCourseDetails?.curriculum[
                    getIndexOfFreePreviewUrl
                  ].type === "youtube" ? (
                    <ContentPreview
                    type={studentViewCourseDetails?.curriculum[
                      getIndexOfFreePreviewUrl
                    ].type}
                    url={studentViewCourseDetails?.curriculum[
                      getIndexOfFreePreviewUrl
                    ].videoUrl}
                  />
                ) : null
              }
          </div>
          <div className="flex flex-col gap-2">
            {studentViewCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItem) => (
                <p
                  key={filteredItem._id}
                  onClick={() => handleSetFreePreview(filteredItem)}
                  className="cursor-pointer text-[16px] font-medium"
                >
                  {filteredItem?.title}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
