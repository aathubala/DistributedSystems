const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseContentSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'item' 
  },
  videos: [{ type: String }], 
  photos: [{ type: String }], 
  notes: [{ type: String }]
});

const CourseContent = mongoose.model("CourseContent", CourseContentSchema);

module.exports = CourseContent;
