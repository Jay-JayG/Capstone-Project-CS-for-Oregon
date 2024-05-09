import './EventsPage.css';
import '../NewsAndFeatures.css'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function EventsPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get("/api/endpoint");
                //const res = await axios.get("http://localhost/get_data.php"); // For local development
                setObjects(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects('news');
    }, []);

    const filteredObjects = objects.filter(obj => obj.news_type === '1');

    return (
        <div className='events-page-container'>
            <div className='news-and-features-page-navigator'>
                <Link to={`/News`} className='news-and-features-page-navigator-news'>News</Link>
                <Link to={`/events`} className='news-and-features-page-navigator-events'>Events</Link>
                {/* <Link to={`/spotlight`} className='news-and-features-page-navigator-spotlight'>Spotlight</Link> */}
            </div>
            <div className='event-cards-container'>
                {filteredObjects.map((obj, index) => (
                    <div key={index} className='event-cards-background'>
                        <div className='event-card-title' href={obj.bold}>{obj.title}</div>
                        <div className='event-card-description'><span className='event-bold-text'>What: {obj.bold} </span>{obj.what}</div>
                        <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{obj.who}</div>
                        <div className='event-card-date'>{obj.when_date}</div>
                        <div className='event-buttons-container'>
                            <a className='event-buttons-Flyer' href={obj.flyer_link} target='_blank'>Event Flyer</a>
                            <a className='event-buttons-Flyer' href={obj.apply_link} target='_blank'>Apply Here</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}