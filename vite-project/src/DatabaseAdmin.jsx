import React, { useState } from 'react';
import axios from 'axios';

const GradeForm = () => {
  const [studentId, setStudentId] = useState('');
  const [scores, setScores] = useState('');
  const [classId, setClassId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/grades', {
        student_id: studentId,
        scores: scores,
        class_id: classId,
      });

      console.log(response.data); // Log the response from the server

      // Add any additional logic you want after successfully posting the data

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Grade</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </div>
        <div>
          <label>Scores:</label>
          <input type="text" value={scores} onChange={(e) => setScores(e.target.value)} />
        </div>
        <div>
          <label>Class ID:</label>
          <input type="text" value={classId} onChange={(e) => setClassId(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GradeForm;
