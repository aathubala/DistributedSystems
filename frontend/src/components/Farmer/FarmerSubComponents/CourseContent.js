import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/CourseContent.css'; // Import CSS file

function CourseContent() {
  const [courseContent, setCourseContent] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [videos, setVideo] = useState('');
  const [photos, setPhoto] = useState('');
  const [notes, setNote] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    async function fetchCourseContent() {
      try {
        const response = await fetch(`http://localhost:8070/api/courseContent/${location.pathname.split('/').pop()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course content');
        }
        const data = await response.json();
        setCourseContent(data.courseContent);
        setSelectedVideos(new Array(data.courseContent.videos.length).fill(false));
        setSelectedPhotos(new Array(data.courseContent.photos.length).fill(false));
        setSelectedNotes(new Array(data.courseContent.notes.length).fill(false));
      } catch (error) {
        console.error(error);
      }
    }
    fetchCourseContent();
  }, [location.pathname]);

  const handleCheckboxChange = (type, index) => {
    switch (type) {
      case 'videos':
        setSelectedVideos(prevState => {
          const newSelectedVideos = [...prevState];
          newSelectedVideos[index] = !newSelectedVideos[index];
          return newSelectedVideos;
        });
        break;
      case 'photos':
        setSelectedPhotos(prevState => {
          const newSelectedPhotos = [...prevState];
          newSelectedPhotos[index] = !newSelectedPhotos[index];
          return newSelectedPhotos;
        });
        break;
      case 'notes':
        setSelectedNotes(prevState => {
          const newSelectedNotes = [...prevState];
          newSelectedNotes[index] = !newSelectedNotes[index];
          return newSelectedNotes;
        });
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    const pathname = `/farmer-dashboard/${localStorage.getItem("username")}/view`;
    window.location.href = pathname;
  };

  const handleDelete = async () => {
    try {
      if (courseContent) {
        const videosToDelete = courseContent.videos.filter((video, index) => selectedVideos[index]);
        const photosToDelete = courseContent.photos.filter((photo, index) => selectedPhotos[index]);
        const notesToDelete = courseContent.notes.filter((note, index) => selectedNotes[index]);

        const response = await fetch(`http://localhost:8070/api/courseContent/${courseContent.courseId}/delete`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contentID: courseContent._id,
            removeVideos: videosToDelete,
            removePhotos: photosToDelete,
            removeNotes: notesToDelete
          })
        });
        if (!response.ok) {
          throw new Error('Failed to remove existing content');
        }
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8070/api/courseContent/${courseContent.courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contentID: courseContent._id,
          videos,
          photos,
          notes
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update content');
      }
      window.location.reload();
      setShowUpdateForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isDeleteDisabled = () => {
    return !selectedVideos.some(video => video) && !selectedPhotos.some(photo => photo) && !selectedNotes.some(note => note);
  };

  return (
    <div className="course-content-container">
      {courseContent ? (
        <div>
          <h2>Course Content</h2>
          <p>Course ID: {courseContent.courseId}</p>
          <div className="content-section">
            <h3>Videos</h3>
            <ul>
              {courseContent.videos.map((video, index) => (
                <li key={index}>
                  <input type="checkbox" checked={selectedVideos[index]} onChange={() => handleCheckboxChange('videos', index)} />
                  <a href={video} target="_blank" rel="noopener noreferrer">Video {index + 1}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="content-section">
            <h3>Photos</h3>
            <ul>
              {courseContent.photos.map((photo, index) => (
                <li key={index}>
                  <input type="checkbox" checked={selectedPhotos[index]} onChange={() => handleCheckboxChange('photos', index)} />
                  <a href={photo} target="_blank" rel="noopener noreferrer">Photo {index + 1}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="content-section">
            <h3>Notes</h3>
            <ul>
              {courseContent.notes.map((note, index) => (
                <li key={index}>
                  <input type="checkbox" checked={selectedNotes[index]} onChange={() => handleCheckboxChange('notes', index)} />
                  <span className="note">{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="add-content-section">
            <button className="update-btn" onClick={handleUpdate}>Update</button>
            <button className="delete-btn" onClick={handleDelete} disabled={isDeleteDisabled()}>Delete</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>

          {showUpdateForm && (
            <div className="modal">
              <form onSubmit={handleUpdateFormSubmit} className="modal-content">

                <h3>Add Content</h3>
                <label>
                  Video URL:
                  <input type="text" value={videos} onChange={e => setVideo(e.target.value)} />
                </label>
                <br />
                <label>
                  Photo URL:
                  <input type="text" value={photos} onChange={e => setPhoto(e.target.value)} />
                </label>
                <br />
                <label>
                  Note Text:
                  <input type="text" value={notes} onChange={e => setNote(e.target.value)} />
                </label>
                <br />
                <button className="update-btn" type="submit">Submit</button>
                <button className="cancel-btn" onClick={() => setShowUpdateForm(false)}>Close</button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseContent;
