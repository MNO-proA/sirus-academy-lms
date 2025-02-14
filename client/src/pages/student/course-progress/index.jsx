// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   // DialogOverlay,
//   // DialogPortal,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import VideoPlayer from "@/components/video-player";
// import { AuthContext } from "@/context/auth-context";
// import { StudentContext } from "@/context/student-context";
// import {
//   getCurrentCourseProgressService,
//   markLectureAsViewedService,
//   resetCourseProgressService,
// } from "@/services";
// import {
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   Link,
//   Youtube,
// } from "lucide-react";
// import { useContext, useEffect, useState } from "react";
// import Confetti from "react-confetti";
// import { useNavigate, useParams } from "react-router-dom";
// import ContentPreview from "@/components/content-preview";

// function StudentViewCourseProgressPage() {
//   const navigate = useNavigate();
//   const { auth } = useContext(AuthContext);
//   const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
//     useContext(StudentContext);
//   const [lockCourse, setLockCourse] = useState(false);
//   const [currentLecture, setCurrentLecture] = useState(null);
//   const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
//     useState(false);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [isSideBarOpen, setIsSideBarOpen] = useState(true);
//   const { id } = useParams();

//   // Safe version of isAlreadyViewed that handles null/undefined
//   const isAlreadyViewed = currentLecture?._id
//     ? studentCurrentCourseProgress?.progress?.find(
//         (progressItem) => progressItem?.lectureId === currentLecture._id
//       )?.viewed ?? false
//     : false;

//   async function fetchCurrentCourseProgress() {
//     try {
//       if (!auth?.user?._id || !id) return;

//       const response = await getCurrentCourseProgressService(auth.user._id, id);

//       if (response?.success && response?.data) {
//         if (!response.data.isPurchased) {
//           setLockCourse(true);
//           return;
//         }

//         setStudentCurrentCourseProgress({
//           courseDetails: response.data.courseDetails,
//           progress: response.data.progress || [],
//         });

//         if (response.data.completed) {
//           const firstLecture = response.data.courseDetails?.curriculum?.[0];
//           if (firstLecture) {
//             setCurrentLecture(firstLecture);
//             setShowCourseCompleteDialog(true);
//             setShowConfetti(true);
//           }
//           return;
//         }

//         const curriculum = response.data.courseDetails?.curriculum || [];
//         const progress = response.data.progress || [];

//         if (progress.length === 0 && curriculum.length > 0) {
//           setCurrentLecture(curriculum[0]);
//         } else {
//           const lastIndexOfViewedAsTrue = progress.reduceRight(
//             (acc, obj, index) => {
//               return acc === -1 && obj.viewed ? index : acc;
//             },
//             -1
//           );

//           const nextLecture = curriculum[lastIndexOfViewedAsTrue + 1];
//           setCurrentLecture(nextLecture || curriculum[0]);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching course progress:", error);
//     }
//   }

//   async function updateCourseProgress() {
//     try {
//       if (
//         !auth?.user?._id ||
//         !studentCurrentCourseProgress?.courseDetails?._id ||
//         !currentLecture?._id ||
//         isAlreadyViewed
//       ) {
//         return;
//       }

//       const response = await markLectureAsViewedService(
//         auth.user._id,
//         studentCurrentCourseProgress.courseDetails._id,
//         currentLecture._id
//       );

//       if (response?.success) {
//         fetchCurrentCourseProgress();
//       }
//     } catch (error) {
//       console.error("Error updating course progress:", error);
//     }
//   }

//   function handleLectureClick(lecture) {
//     if (lecture) {
//       setCurrentLecture(lecture);
//     }
//   }

//   function handleMarkAsComplete() {
//     if (currentLecture?.type === "url" || currentLecture?.type === "youtube") {
//       updateCourseProgress();
//     }
//   }

//   async function handleRewatchCourse() {
//     try {
//       if (
//         !auth?.user?._id ||
//         !studentCurrentCourseProgress?.courseDetails?._id
//       ) {
//         return;
//       }

//       const response = await resetCourseProgressService(
//         auth.user._id,
//         studentCurrentCourseProgress.courseDetails._id
//       );

//       if (response?.success) {
//         setCurrentLecture(null);
//         setShowConfetti(false);
//         setShowCourseCompleteDialog(false);
//         await fetchCurrentCourseProgress();
//       }
//     } catch (error) {
//       console.error("Error resetting course:", error);
//     }
//   }

//   useEffect(() => {
//     if (id) {
//       fetchCurrentCourseProgress();
//     }
//   }, [id]);

//   // useEffect(() => {
//   //   if (currentLecture?.progressValue === 1) updateCourseProgress();
//   // }, [currentLecture]);
//   useEffect(() => {
//     if (currentLecture?.progressValue === 1) {
//       updateCourseProgress();
//     }
//   }, [currentLecture?.progressValue]);

//   // useEffect(() => {
//   //   if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
//   // }, [showConfetti]);

//   useEffect(() => {
//     let timeoutId;
//     if (showConfetti) {
//       timeoutId = setTimeout(() => setShowConfetti(false), 15000);
//     }
//     return () => {
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//     };
//   }, [showConfetti]);

//   if (!currentLecture) return null;

//   console.log(currentLecture, "currentLecture");

//   return (
//     <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
//       {showConfetti && <Confetti />}
//       <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
//         <div className="flex items-center space-x-4">
//           <Button
//             onClick={() => navigate("/student-courses")}
//             className="text-black"
//             variant="ghost"
//             size="sm"
//           >
//             <ChevronLeft className="h-4 w-4 mr-2" />
//             Back to My Courses Page
//           </Button>
//           <h1 className="text-lg font-bold hidden md:block">
//             {studentCurrentCourseProgress?.courseDetails?.title}
//           </h1>
//         </div>
//         <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
//           {isSideBarOpen ? (
//             <ChevronRight className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </Button>
//       </div>
//       <div className="flex flex-1 overflow-hidden">
//         <div
//           className={`flex-1 ${
//             isSideBarOpen ? "mr-[400px]" : ""
//           } transition-all duration-300 overflow-y-auto`}
//         >
//           <div className="min-h-min">
//             {currentLecture?.type === "video" ? (
//               <VideoPlayer
//                 width="100%"
//                 height="500px"
//                 url={currentLecture?.videoUrl}
//                 onComplete={() => updateCourseProgress()}
//                 progressData={currentLecture}
//                 isAlreadyViewed={isAlreadyViewed}
//               />
//             ) : currentLecture?.type === "url" ? (
//               <iframe
//                 src={currentLecture?.videoUrl}
//                 width="100%"
//                 height="500px"
//                 title="Current Lecture"
//               />
//             ) : currentLecture?.type === "youtube" ? (
//               <ContentPreview
//                 type={currentLecture?.type}
//                 url={currentLecture?.videoUrl}
//                 width="100%"
//                 height="500px"
//               />
//             ) : null}
//           </div>

//           <div className="p-6 bg-[#1c1d1f]">
//             <h2 className="text-2xl font-bold mb-4">{currentLecture?.title}</h2>
//             {(currentLecture?.type === "url" ||
//               currentLecture?.type === "youtube") && (
//               <Button
//                 onClick={handleMarkAsComplete}
//                 disabled={
//                   studentCurrentCourseProgress?.progress?.find(
//                     (item) => item.lectureId === currentLecture._id
//                   )?.viewed
//                 }
//                 className="flex items-center gap-2"
//               >
//                 <Check className="h-4 w-4" />
//                 {studentCurrentCourseProgress?.progress?.find(
//                   (item) => item.lectureId === currentLecture._id
//                 )?.viewed
//                   ? "Completed"
//                   : "Mark as Complete"}
//               </Button>
//             )}
//           </div>
//         </div>
//         <div
//           className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
//             isSideBarOpen ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           <Tabs defaultValue="content" className="h-full flex flex-col">
//             <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
//               <TabsTrigger
//                 value="content"
//                 className="text-black rounded-none h-full"
//               >
//                 Course Content
//               </TabsTrigger>
//               <TabsTrigger
//                 value="overview"
//                 className="text-black rounded-none h-full"
//               >
//                 Overview
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="content">
//               <ScrollArea className="h-full">
//                 <div className="p-4 space-y-4">
//                   {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
//                     (item) => (
//                       <div
//                         className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer hover:bg-gray-800 p-2 rounded"
//                         key={item._id}
//                         onClick={() => handleLectureClick(item)}
//                       >
//                         {studentCurrentCourseProgress?.progress?.find(
//                           (progressItem) => progressItem.lectureId === item._id
//                         )?.viewed ? (
//                           <Check className="h-4 w-4 text-green-500" />
//                         ) : item?.type === "video" ? (
//                           <Play className="h-4 w-4" />
//                         ) : item?.type === "url" ? (
//                           <Link className="h-4 w-4" />
//                         ) : item?.type === "youtube" ? (
//                           <Youtube className="h-4 w-4" />
//                         ) : (
//                           <Play className="h-4 w-4" />
//                         )}
//                         <span>{item?.title}</span>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </ScrollArea>
//             </TabsContent>
//             <TabsContent value="overview" className="flex-1 overflow-hidden">
//               <ScrollArea className="h-full">
//                 <div className="p-4">
//                   <h2 className="text-xl font-bold mb-4">About this course</h2>
//                   <p className="text-gray-400">
//                     {studentCurrentCourseProgress?.courseDetails?.description}
//                   </p>
//                 </div>
//               </ScrollArea>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//       <Dialog open={lockCourse}>
//         <DialogContent className="sm:w-[425px]">
//           <DialogHeader>
//             <DialogTitle>You can&apos;t view this page</DialogTitle>
//             <DialogDescription>
//               Please purchase this course to get access
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//       <Dialog open={showCourseCompleteDialog}>
//         <DialogContent showOverlay={false} className="sm:w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Congratulations!</DialogTitle>
//             <DialogDescription className="flex flex-col gap-3">
//               <Label>You have completed the course</Label>
//               <div className="flex flex-row gap-3">
//                 <Button onClick={() => navigate("/student-courses")}>
//                   My Courses Page
//                 </Button>
//                 <Button onClick={handleRewatchCourse}>Rewatch Course</Button>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default StudentViewCourseProgressPage;
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Link,
  Youtube,
  Loader2,
} from "lucide-react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import ContentPreview from "@/components/content-preview";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSideBarOpen(true);
      } else {
        setIsSideBarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAlreadyViewed = currentLecture?._id
    ? studentCurrentCourseProgress?.progress?.find(
        (progressItem) => progressItem?.lectureId === currentLecture._id
      )?.viewed ?? false
    : false;

  async function fetchCurrentCourseProgress() {
    try {
      if (!auth?.user?._id || !id) return;

      const response = await getCurrentCourseProgressService(auth.user._id, id);

      if (response?.success && response?.data) {
        if (!response.data.isPurchased) {
          setLockCourse(true);
          return;
        }

        setStudentCurrentCourseProgress({
          courseDetails: response.data.courseDetails,
          progress: response.data.progress || [],
        });

        if (response.data.completed) {
          const firstLecture = response.data.courseDetails?.curriculum?.[0];
          if (firstLecture) {
            setCurrentLecture(firstLecture);
            setShowCourseCompleteDialog(true);
            setShowConfetti(true);
          }
          return;
        }

        const curriculum = response.data.courseDetails?.curriculum || [];
        const progress = response.data.progress || [];

        if (progress.length === 0 && curriculum.length > 0) {
          setCurrentLecture(curriculum[0]);
        } else {
          const lastIndexOfViewedAsTrue = progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          const nextLecture = curriculum[lastIndexOfViewedAsTrue + 1];
          setCurrentLecture(nextLecture || curriculum[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching course progress:", error);
    }
  }

  async function updateCourseProgress() {
    try {
      if (
        !auth?.user?._id ||
        !studentCurrentCourseProgress?.courseDetails?._id ||
        !currentLecture?._id ||
        isAlreadyViewed
      ) {
        return;
      }

      const response = await markLectureAsViewedService(
        auth.user._id,
        studentCurrentCourseProgress.courseDetails._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    } catch (error) {
      console.error("Error updating course progress:", error);
    }
  }

  function handleLectureClick(lecture) {
    if (lecture) {
      setIsLoading(true);
      setCurrentLecture(lecture);
      if (isMobile) {
        setIsSideBarOpen(false);
      }
      setTimeout(() => setIsLoading(false), 2500);
    }
  }

  function handleMarkAsComplete() {
    if (currentLecture?.type === "url" || currentLecture?.type === "youtube") {
      updateCourseProgress();
    }
  }

  async function handleRewatchCourse() {
    try {
      if (
        !auth?.user?._id ||
        !studentCurrentCourseProgress?.courseDetails?._id
      ) {
        return;
      }

      const response = await resetCourseProgressService(
        auth.user._id,
        studentCurrentCourseProgress.courseDetails._id
      );

      if (response?.success) {
        setCurrentLecture(null);
        setShowConfetti(false);
        setShowCourseCompleteDialog(false);
        await fetchCurrentCourseProgress();
      }
    } catch (error) {
      console.error("Error resetting course:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchCurrentCourseProgress();
    }
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) {
      updateCourseProgress();
    }
  }, [currentLecture?.progressValue]);

  useEffect(() => {
    let timeoutId;
    if (showConfetti) {
      timeoutId = setTimeout(() => setShowConfetti(false), 15000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showConfetti]);

  if (!currentLecture) return null;

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/academy/student-courses")}
            className="text-black"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "md:mr-[400px]" : ""
          } transition-all duration-300 overflow-y-auto`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-[500px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="min-h-min">
              {currentLecture?.type === "video" ? (
                <VideoPlayer
                  width="100%"
                  height="500px"
                  url={currentLecture?.videoUrl}
                  onComplete={() => updateCourseProgress()}
                  progressData={currentLecture}
                  isAlreadyViewed={isAlreadyViewed}
                />
              ) : currentLecture?.type === "url" ? (
                <iframe
                  src={currentLecture?.videoUrl}
                  width="100%"
                  height="500px"
                  title="Current Lecture"
                />
              ) : currentLecture?.type === "youtube" ? (
                <ContentPreview
                  type={currentLecture?.type}
                  url={currentLecture?.videoUrl}
                  width="100%"
                  height="500px"
                />
              ) : null}
            </div>
          )}

          <div className="p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-4">{currentLecture?.title}</h2>
            {(currentLecture?.type === "url" ||
              currentLecture?.type === "youtube") && (
              <Button
                onClick={handleMarkAsComplete}
                disabled={
                  studentCurrentCourseProgress?.progress?.find(
                    (item) => item.lectureId === currentLecture._id
                  )?.viewed
                }
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                {studentCurrentCourseProgress?.progress?.find(
                  (item) => item.lectureId === currentLecture._id
                )?.viewed
                  ? "Completed"
                  : "Mark as Complete"}
              </Button>
            )}
          </div>
        </div>
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-full md:w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className="text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="text-black rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => (
                      <div
                        className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer hover:bg-gray-800 p-2 rounded"
                        key={item._id}
                        onClick={() => handleLectureClick(item)}
                      >
                        {studentCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : item?.type === "video" ? (
                          <Play className="h-4 w-4" />
                        ) : item?.type === "url" ? (
                          <Link className="h-4 w-4" />
                        ) : item?.type === "youtube" ? (
                          <Youtube className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span>{item?.title}</span>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can&apos;t view this page</DialogTitle>
            <DialogDescription>
              Please purchase this course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent showOverlay={false} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have completed the course</Label>
              <div className="flex flex-row gap-3">
                <Button onClick={() => navigate("/student-courses")}>
                  My Courses Page
                </Button>
                <Button onClick={handleRewatchCourse}>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;