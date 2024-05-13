import React, { useState, useEffect } from 'react';
import { fetchCourseContent } from '../../../Actions/orderActions';
import '../styles/courseContent.css';

function CourseContents() {
  const [courseContent, setCourseContent] = useState(null);
  const url = window.location.href;
  const courseId = url.match(/[^/]+$/)[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourseContent(courseId)();
        setCourseContent(data.courseContent);
      } catch (error) {
        console.error('Error fetching course content:', error);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="course-contents-container">
      {courseContent ? (
        <div>
          <h2 className="course-title">Course Contents</h2>
          <p className="course-id">Course ID: {courseContent.courseId}</p>
          {courseContent.notes && courseContent.notes.length > 0 && (
            <div className="content-section">
              <h3>Notes</h3>
              <ul>
                {courseContent.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
          {courseContent.videos && courseContent.videos.length > 0 && (
            <div className="content-section">
              <h3>Videos</h3>
              <div className="video-container">
                {courseContent.videos.map((video, index) => (
                  <div key={index} className="video-item">
                    <video controls>
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}
          {courseContent.photos && courseContent.photos.length > 0 && (
            <div className="content-section">
              <h3>Photos</h3>
              <div className="photo-container">
                {courseContent.photos.map((photo, index) => (
                  <div key={index} className="photo-item">
                    <img src={photo} alt={`Photo ${index}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="loading-message">Loading course content...</p>
      )}
    </div>
  );
}

export default CourseContents;
