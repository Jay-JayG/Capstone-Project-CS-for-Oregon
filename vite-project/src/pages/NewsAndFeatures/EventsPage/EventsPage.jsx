import './EventsPage.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
    
export default function EventsPage() {
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

    const filteredObjects = objects;
    //const filteredObjects = objects.filter(obj => obj.news_type === '1');

    return (
        <div className='events-page-container'>
            <div className='events-page-navigator'>
                <Link to={`/News`} className='events-page-navigator-news'>News</Link>
                <Link to={`/events`} className='events-page-navigator-events'>Events</Link>
                <Link to={`/spotlight`} className='events-page-navigator-spotlight'>Spotlight</Link>
            </div>
        
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