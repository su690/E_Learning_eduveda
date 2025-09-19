import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EnrollmentPage() {
  const [data, setData] = useState([]);
  const [newEnrollment, setNewEnrollment] = useState({ studentID: '', courseID: '', progress: '' });

  useEffect(() => {
    axios.get('http://localhost:3000/enrollments')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnrollment({ ...newEnrollment, [name]: value });
  };

  const handleAddEnrollment = () => {
    axios.post('http://localhost:3000/enrollments', newEnrollment)
      .then(response => setData([...data, response.data]))
      .catch(error => console.error(error));
  };

  const handleDeleteEnrollment = (id) => {
    axios.delete(`http://localhost:3000/enrollments/${id}`)
      .then(() => setData(data.filter(enrollment => enrollment.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2>Enrollment Management</h2>
      <div>
        <h3>Add Enrollment</h3>
        <input
          type="text"
          name="studentID"
          placeholder="Student ID"
          value={newEnrollment.studentID}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="courseID"
          placeholder="Course ID"
          value={newEnrollment.courseID}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="progress"
          placeholder="Progress (%)"
          value={newEnrollment.progress}
          onChange={handleInputChange}
        />
        <button onClick={handleAddEnrollment}>Add Enrollment</button>
      </div>
      <ul>
        {data.map(enrollment => (
          <li key={enrollment.id}>
            Student ID: {enrollment.studentID}, Course ID: {enrollment.courseID}, Progress: {enrollment.progress}%
            <button onClick={() => handleDeleteEnrollment(enrollment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnrollmentPage;
