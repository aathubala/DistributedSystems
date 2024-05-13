const express = require("express");
const router = express.Router();
const CourseContent = require("../models/courseContent");


router.post("/", async (req, res) => {
    try {
        const { courseId, videos, photos, notes } = req.body;
        const courseContent = new CourseContent({
            courseId,
            videos,
            photos,
            notes
        });
        await courseContent.save();
        res.status(201).json({ success: true, message: 'Course content added successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to add course content', error: error.message });
    }
});

router.put("/:courseID", async (req, res) => {
    try {
        const courseID = req.params.courseID;
        const { contentID, videos, photos, notes } = req.body;

        if (!contentID) {
            return res.status(400).json({ message: 'ContentID is required' });
        }

        const course = await CourseContent.findOne({ courseId: courseID }).exec();
        if (!course) {
            return res.status(400).json({ message: 'No such Course ID found' });
        }

        const content = await CourseContent.findOne({ _id: contentID }).exec();
        if (!content) {
            return res.status(400).json({ message: 'No such Content ID found' });
        }

        if (videos) {
            content.videos = content.videos.concat(videos);
        }
        if (photos) {
            content.photos = content.photos.concat(photos);
        }
        if (notes) {
            content.notes = content.notes.concat(notes);
        }

        const updatedContent = await content.save();

        res.json({ message: 'Content updated successfully', updatedContent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update the content', error: error.message });
    }
});


router.get("/:courseId", async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const courseContent = await CourseContent.findOne({ courseId });
        if (!courseContent) {
            return res.status(404).json({ success: false, message: 'Course content not found' });
        }
        res.status(200).json({ success: true, courseContent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch course content', error: error.message });
    }
});

router.put("/:courseID/delete", async (req, res) => {
    try {
        const courseID = req.params.courseID;
        const { contentID, removeVideos, removePhotos, removeNotes } = req.body;

        if (!contentID) {
            return res.status(400).json({ message: 'ContentID is required' });
        }

        const course = await CourseContent.findOne({ courseId: courseID }).exec();
        if (!course) {
            return res.status(400).json({ message: 'No such Course ID found' });
        }

        const content = await CourseContent.findOne({ _id: contentID }).exec();
        if (!content) {
            return res.status(400).json({ message: 'No such Content ID found' });
        }

        if (removeVideos && removeVideos.length > 0) {
            content.videos = content.videos.filter(video => !removeVideos.includes(video));
        }
        if (removePhotos && removePhotos.length > 0) {
            content.photos = content.photos.filter(photo => !removePhotos.includes(photo));
        }
        if (removeNotes) {
            content.notes = [];
        }

        const updatedContent = await content.save();

        res.json({ message: 'Content updated successfully', updatedContent });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update the content', error: error.message });
    }
});



module.exports = router;
