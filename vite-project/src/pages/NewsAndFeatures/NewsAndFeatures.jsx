import './NewsAndFeatures.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function NewsAndFeaturesPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                //const res = await axios.get("/api/endpoint");
                const res = await axios.get("http://localhost/backend/get_data.php"); // For local development
                setObjects(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects('news');
    }, []);


    return (
        <div className='news-and-features-page-container'>
            <div className='news-and-features-page-navigator'>
                <Link to={`/News`} className='news-and-features-page-navigator-news'>News</Link>
                <Link to={`/EventsPage`} className='news-and-features-page-navigator-events'>Events</Link>
                <Link to={`/SpotlightPage`} className='news-and-features-page-navigator-spotlight'>Spotlight</Link>
            </div>
            <h1>NewsAndFeaturesPage WIP</h1>
            <div className='news-object-list'>
                {objects.map((obj, index) => (
                    <div key={index} className='object'>
                        <div className='object-container'>
                            <div className='object-event'>
                                <div className='object-title'>{obj.title}</div>
                            </div>
                            <div className='object-event-details'>
                                <div><span className='object-bold-text'>What: {obj.bold} </span>{obj.what}</div>
                                <div><span className='object-bold-text'>Who is it for: </span>{obj.who}</div>
                                <div><span className='object-bold-text'>When: </span>{obj.when_date}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}