import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateItem from './pages/CreateItem.jsx';
import GetAll from './pages/GetAll.jsx';
import axios from 'axios';

function DatabaseAdmin() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
        .get('http://localhost:3001/grades')
        .then((res) => {
            console.log("Data from server:", res.data);
            setItems(res.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }, []);
    return (
        <>
          <h2>DatabaseAdmin</h2>
          <h2>Items list</h2>
    
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="App">
                <div className="gradesDisplay">
                    {items.map((item, index) => (
                    <div key={index}>
                        <h1>Student Id: {item.student_id}</h1>
                        <h1>Class Id: {item.class_id}</h1>
                        <h1>Exam Score: {item.scores[0].score}</h1>
                    </div>
                    ))}
                </div>
            </div>
          )}
    
          <Routes>
            <Route path='/' element={<CreateItem />} />
            <Route path='/' element={<GetAll />} />
          </Routes>
        </>
    );
}
    
export default DatabaseAdmin;