import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import VideoPlayer from "@/components/video-player";
import MediaProgressbar from "@/components/media-progress-bar";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from "@/services";
// import { Upload } from "lucide-react";
import { useContext, useRef, useState } from "react";
import ContentPreview from "@/components/content-preview";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function CourseCurriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirmation = (index) => {
    setSelectedIndex(index);
    setDeleteDialogOpen(true);
  };

  const getDeleteDialogTitle = (index) => {
    const lecture = courseCurriculumFormData[index];
    return lecture.title.trim() 
      ? `Delete "${lecture.title}"?`
      : `Delete Lecture ${index + 1}?`;
  };

  const getDeleteDialogDescription = (index) => {
    const lecture = courseCurriculumFormData[index];
    return lecture.title.trim()
      ? `Are you sure you want to delete "${lecture.title}"? This action cannot be undone.`
      : `Are you sure you want to delete Lecture ${index + 1}? This action cannot be undone.`;
  };

  const handleConfirmDelete = async () => {
    if (selectedIndex === null) return;
    
    setIsDeleting(true);
    const currentLecture = courseCurriculumFormData[selectedIndex];

    try {
      if (currentLecture.type === "video" && currentLecture.public_id) {
        await mediaDeleteService(currentLecture.public_id);
      }

      // Create new array without the deleted item
      const updatedFormData = courseCurriculumFormData.filter((_, index) => index !== selectedIndex);
      
      // Update state
      setCourseCurriculumFormData(updatedFormData);
    } catch (error) {
      console.error("Error deleting lecture:", error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setSelectedIndex(null);
    }
  };


  const bulkUploadInputRef = useRef(null);
  // +++++++++++++++++++++++++++++++++++++++++
  const isVideoContent = (type) => type === "video";
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
        type: "video",
        videoUrl: "",
        title: `Lecture ${courseCurriculumFormData.length + 1}`,
        freePreview: false,
        link_desc: ""
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleLectureTypeChange(value, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      type: value,
      videoUrl: "",
      public_id:
        value === "video"
          ? cpyCourseCurriculumFormData[currentIndex].public_id
          : "",
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleUrlChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      videoUrl: event.target.value,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleLinkDescChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      link_desc: event.target.value,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  //   const selectedFile = event.target.files[0];

  //   if (selectedFile) {
  //     const videoFormData = new FormData();
  //     videoFormData.append("file", selectedFile);

  //     try {
  //       setMediaUploadProgress(true);
  //       const response = await mediaUploadService(
  //         videoFormData,
  //         setMediaUploadProgressPercentage
  //       );
  //       if (response.success) {
  //         let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
  //         cpyCourseCurriculumFormData[currentIndex] = {
  //           ...cpyCourseCurriculumFormData[currentIndex],
  //           videoUrl: response?.data?.url,
  //           public_id: response?.data?.public_id,
  //         };
  //         setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  //         setMediaUploadProgress(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setMediaUploadProgress(false);
  //     }
  //   }
  // }

  // In your handleSingleLectureUpload function, update it to:
  async function handleSingleLectureUpload(event, currentIndex) {
    // Add currentIndex parameter
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
          ...cpyCourseCurriculumFormData[currentIndex],
          isUploading: true,
        };
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);

        const response = await mediaUploadService(videoFormData);

        if (response.success) {
          cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
            isUploading: false,
            uploadError: false,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
        }
      } catch (error) {
        console.log(error);
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
          ...cpyCourseCurriculumFormData[currentIndex],
          isUploading: false,
          uploadError: true,
        };
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
      }
    }
  }


  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      if (!item || typeof item !== "object" || item.title.trim() === "") {
        return false;
      }

      if (isVideoContent(item.type)) {
        return item.videoUrl.trim() !== "";
      }

      if (item.type === "url") {
        return validateUrl(item.videoUrl);
      }

      if (item.type === "youtube") {
        return (
          item.videoUrl.includes("<iframe") &&
          item.videoUrl.toLowerCase().includes("youtube")
        );
      }

      return false;
    });
  }
  async function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const currentLecture = cpyCourseCurriculumFormData[currentIndex];

    try {
      // Only attempt to delete media if it's a video type with a public_id
      if (currentLecture.type === "video" && currentLecture.public_id) {
        const response = await mediaDeleteService(currentLecture.public_id);
        if (!response?.success) {
          console.error("Failed to delete media");
          return;
        }
      }

      // Remove the lecture from the array regardless of deletion success
      cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    } catch (error) {
      console.error("Error deleting lecture:", error);
      // Still remove the lecture from the array even if media deletion fails
      cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );
      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }
  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );

    if (deleteCurrentMediaResponse?.success) {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        {mediaUploadProgress && (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
          />
        )}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md"    style={{
              opacity: isDeleting && selectedIndex === index ? 0 : 1,
              transform: isDeleting && selectedIndex === index ? 'translateX(-100%)' : 'translateX(0)',
            }}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex sm:gap-1 gap-2">
                  <Button
                    disabled={
                      !isCourseCurriculumFormDataValid() || mediaUploadProgress
                    }
                    onClick={handleNewLecture}
                  >
                    Add Lecture
                  </Button>
                  <Button
                    onClick={() => handleDeleteConfirmation(index)}
                    variant="destructive"
                  >
                    Delete Lecture
                  </Button>
                </div>
                <h6 className="font-semibold">Lecture {index + 1}</h6>
              </div>

              <div className="flex gap-5 items-center mb-4">
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>

              <div className="mt-6">
                <Select
                  value={curriculumItem.type}
                  onValueChange={(value) =>
                    handleLectureTypeChange(value, index)
                  }
                >
                  <SelectTrigger className="w-[200px] mb-4">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Upload</SelectItem>
                    <SelectItem value="url">External URL</SelectItem>
                    <SelectItem value="youtube">YouTube Embed</SelectItem>
                  </SelectContent>
                </Select>

                {/* Content area */}
                <div className="mt-2">
                  {isVideoContent(curriculumItem.type) ? (
                    curriculumItem.videoUrl ? (
                      <div className="flex gap-3">
                        <VideoPlayer
                          url={curriculumItem.videoUrl}
                          width="450px"
                          height="200px"
                        />
                        <Button onClick={() => handleReplaceVideo(index)}>
                          Replace Video
                        </Button>
                      </div>
                    ) : (
                      <div className="relative">
                        {curriculumItem.isUploading ? (
                          <div className="flex justify-center items-center my-4">
                            <Loader className="animate-spin h-8 w-8 text-gray-800" />
                          </div>
                        ) : (
                          <>
                            <Input
                              type="file"
                              accept="video/*"
                              onChange={(event) =>
                                handleSingleLectureUpload(event, index)
                              }
                              className="mb-4"
                            />
                            {curriculumItem.uploadError && (
                              <div className="mt-2">
                                <p className="text-red-500 mb-2">
                                  Upload failed. Please try again.
                                </p>
                                {/* <Button
                                  variant="outline"
                                  onClick={() => {
                                    let cpyCourseCurriculumFormData = [
                                      ...courseCurriculumFormData,
                                    ];
                                    cpyCourseCurriculumFormData[index] = {
                                      // Use index instead of currentIndex
                                      ...cpyCourseCurriculumFormData[index],
                                      uploadError: false,
                                    };
                                    setCourseCurriculumFormData(
                                      cpyCourseCurriculumFormData
                                    );
                                  }}
                                >
                                  Retry Upload
                                </Button> */}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  ) : (
                    <div>
                      <Textarea
                        placeholder={
                          curriculumItem.type === "youtube"
                            ? "Paste YouTube embed code here"
                            : "Enter external URL (e.g. Google Forms, Lab URL)"
                        }
                        className="min-h-[100px] mb-4"
                        value={curriculumItem.videoUrl}
                        onChange={(event) => handleUrlChange(event, index)}
                      />
                      <Textarea
                      placeholder={
                        curriculumItem.type === "youtube"
                          ? "Write a short instruction for your live session"
                          : "Write a short instruction for your external link"
                      }
                      className="min-h-[100px] mb-4"
                      value={curriculumItem.link_desc}
                      onChange={(event) => handleLinkDescChange(event, index)}
                    />
                      <ContentPreview
                        type={curriculumItem.type}
                        url={curriculumItem.videoUrl}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {selectedIndex !== null && getDeleteDialogTitle(selectedIndex)}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {selectedIndex !== null && getDeleteDialogDescription(selectedIndex)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                {isDeleting ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
