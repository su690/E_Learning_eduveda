import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssessmentPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/assessments')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Assessment Management</h2>
      <ul>
        {data.map(assessment => (
          <li key={assessment.id}>Type: {assessment.type}, Max Score: {assessment.maxScore}</li>
        ))}
      </ul>
    </div>
  );
}

export default AssessmentPage;
