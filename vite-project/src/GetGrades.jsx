import { useState, useEffect } from "react";
import Axios from "axios";

function getGrades() {
    const [listOfGrades, setListOfGrades] = useState([]);
  
    useEffect(() => {
      Axios.get("http://localhost:3001/getGrades")
        .then((response) => {
          console.log("Data from server:", response.data);
          setListOfGrades(response.data);
        })
        .catch((error) => {
          console.error("AxiosError:", error);
        });
    }, []);

    return (
        <div className="App">
          <div className="gradesDisplay">
            {listOfGrades.map((grade, index) => (
              <div key={index}>
                <h1>Student Id: {grade.student_id}</h1>
                <h1>Class Id: {grade.class_id}</h1>
                <h1>Exam Score: {grade.scores[0].score}</h1>
              </div>
            ))}
          </div>
        </div>
      );
    }

export default getGrades;