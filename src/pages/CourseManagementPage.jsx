import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseManagementPage() {
  const [data, setData] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', contentURL: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/courses')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = () => {
    axios.post('http://localhost:3000/courses', newCourse)
      .then(response => setData([...data, response.data]))
      .catch(error => console.error(error));
  };

  const handleDeleteCourse = (id) => {
    axios.delete(`http://localhost:3000/courses/${id}`)
      .then(() => setData(data.filter(course => course.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2>Course Management</h2>
      <div>
        <h3>Create Course</h3>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Course Description"
          value={newCourse.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contentURL"
          placeholder="Content URL"
          value={newCourse.contentURL}
          onChange={handleInputChange}
        />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
      <ul>
        {data.map(course => (
          <li key={course.id}>
            <strong>{course.title}</strong> - {course.description}
            <br />
            <a href={course.contentURL} target="_blank" rel="noopener noreferrer">View Content</a>
            <br />
            <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseManagementPage;
