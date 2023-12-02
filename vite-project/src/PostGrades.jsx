import { useState, useEffect } from "react";
import Axios from "axios";

function PostGrades() {

    const [studentId, setStudentId] = useState("");
    const [scores, setScores] = useState([]);
    const [classId, setClassId] = useState("");
    const [message, setMessage] = useState("");

    const handlePost = async () => {
        try {
            const response = await Axios.post("http://localhost:3001/postGrades", {
                student_id: studentId,
                scores: scores,
                class_id: classId,
            });
        
        console.log('Data posted to server', response.data)
        
        setMessage(`Grade uploaded successfully for student ID: ${studentId}`);

        } catch (error) {
            console.error("AxiosError:", error);
            setMessage(`Error: ${error.response.data.message}`);
        }
    };

    return (
        <div className='post'>
            <h2> Create and Upload</h2>
            <form>
                <label>
                    Student ID:
                    <input
                    type='text'
                    value={studentId}
                    onChange={ ( e ) => setStudentId(e.target.value)}
                    /> 
                </label>
                <br />
                <label>
                    Scores:
                    <input
                    type='text'
                    value={scores}
                    onChange={ ( e ) => setScores(e.target.value)}
                    /> 
                </label>
                <br />
                <label>
                    Class ID:
                    <input
                    type='text'
                    value={classId}
                    onChange={ ( e ) => setClassId(e.target.value)}
                    /> 
                </label>
                <br />
                <button type="button" onClick={handlePost}>
                    Upload Grade
                </button>
            </form>
        </div>
    );
}

export default PostGrades;