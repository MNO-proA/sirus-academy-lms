// const mongoose = require("mongoose");

// const LectureProgressSchema = new mongoose.Schema({
//   lectureId: String,
//   viewed: Boolean,
//   dateViewed: Date,
// });

// const CourseProgressSchema = new mongoose.Schema({
//   userId: String,
//   courseId: String,
//   completed: Boolean,
//   completionDate: Date,
//   indexes: [
//     { userId: 1, courseId: 1 },
//     { 'lecturesProgress.lectureId': 1 }
//   ],
//   lecturesProgress: [LectureProgressSchema],
// });

// module.exports = mongoose.model("Progress", CourseProgressSchema);
const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewed: Boolean,
  dateViewed: Date,
});

const CourseProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  lecturesProgress: [LectureProgressSchema],
});

// Alternatively, you can define indexes using index() method
CourseProgressSchema.index({ userId: 1, courseId: 1 });
CourseProgressSchema.index({ 'lecturesProgress.lectureId': 1 });

module.exports = mongoose.model("Progress", CourseProgressSchema);