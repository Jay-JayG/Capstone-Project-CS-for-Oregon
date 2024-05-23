import './SpotlighPage.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function SpotlightPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}get_data.php`);
                //const res = await axios.get("http://localhost/backend/get_data.php"); // For local development
                setObjects(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects('news');
    }, []);

    const filteredObjects = objects.filter(obj => obj.news_type === '2');

    return (
        <div className='news-and-features-page-container'>
            <div className='news-and-features-page-navigator'>
                <Link to={`/News`} className='news-and-features-page-navigator-news'>News</Link>
                <Link to={`/events`} className='news-and-features-page-navigator-events'>Events</Link>
                <Link to={`/spotlight`} className='news-and-features-page-navigator-spotlight'>Spotlight</Link>
            </div>
            <h1>NewsAndFeaturesPage WIP</h1>
            <div className='news-object-list'>
                {filteredObjects.map((obj, index) => (
                    <div key={index} className='object'>
                        <div className='object-container'>
                            <div className='object-event'>
                                <div className='object-title'>{obj.title}</div>
                            </div>
                            <div className='object-event-details'>
                                <div><span className='object-bold-text'>What: {obj.bold} </span>{obj.what}</div>
                                <div><span className='object-bold-text'>Who is it for: </span>{obj.who}</div>
                                <div><span className='object-bold-text'>When: </span>{obj.when_date}</div>
                                <div><span className='object-bold-text'>Type: </span>{obj.news_type}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}