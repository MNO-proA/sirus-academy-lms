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
import { Upload } from "lucide-react";
import { useContext, useRef } from "react";
import ContentPreview from "@/components/content-preview";

function CourseCurriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

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

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
        setMediaUploadProgress(false);
      }
    }
  }

  async function handleMediaBulkUpload(event) {
    const selectedFiles = Array.from(event.target.files);
    if (!selectedFiles.length) return;

    const bulkFormData = new FormData();
    selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));

    try {
      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(
        bulkFormData,
        setMediaUploadProgressPercentage
      );

      if (response?.success) {
        const currentFormData = [...courseCurriculumFormData];
        const newLectures = response.data.map((item, index) => ({
          videoUrl: item?.url,
          public_id: item?.public_id,
          title: `Lecture ${currentFormData.length + index + 1}`,
          freePreview: false,
          type: "video",
        }));

        setCourseCurriculumFormData([...currentFormData, ...newLectures]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMediaUploadProgress(false);
      if (bulkUploadInputRef.current) {
        bulkUploadInputRef.current.value = "";
      }
    }
  }

  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }

  function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value === "";
      });
    });
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
        <div className="flex gap-2">
          <Input
            type="file"
            ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            onChange={handleMediaBulkUpload}
          />
          {/* <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleOpenBulkUploadDialog}
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button> */}
        </div>
      </CardHeader>
      <CardContent>
        {/* <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
        >
          Add Lecture
        </Button> */}
        {mediaUploadProgress && (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        )}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md">
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
                    onClick={() => handleDeleteLecture(index)}
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
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(event) =>
                          handleSingleLectureUpload(event, index)
                        }
                        className="mb-4"
                      />
                    )
                  ) : (
                    <div>
                      <Textarea
                        placeholder={
                          curriculumItem.type === "youtube"
                            ? "Paste YouTube embed code here"
                            : "Enter external URL (e.g., Google Forms, Lab URL)"
                        }
                        className="min-h-[100px] mb-4"
                        value={curriculumItem.videoUrl}
                        onChange={(event) => handleUrlChange(event, index)}
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
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
