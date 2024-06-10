import './NewsAndFeatures.css';
import './SubNavigationBar.css'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function NewsAndFeaturesPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}get_data.php`);
                //const res = await axios.get("http://localhost/get_data.php"); // For local development
                setObjects(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects('news');
    }, []);

    const filteredObjects = objects
    .filter(obj => obj.news_type === '0')
    .sort((a, b) => {
        const dateA = new Date(a.when_date);
        const dateB = new Date(b.when_date);
        return dateB - dateA; // Sort in reverse chronological order
    });

    return (
        <div id="main-content" className='news-and-features-page-container'>
            <div className='news-and-features-page-navigator'>
                <Link to={`/News`} className='news-and-features-page-navigator-news'>News</Link>
                <Link to={`/events`} className='news-and-features-page-navigator-events'>Events</Link>
                {/* <Link to={`/spotlight`} className='news-and-features-page-navigator-spotlight'>Spotlight</Link> */}
            </div>
            <div className='news-cards-container'>
                {filteredObjects.map((obj, index) => (
                    <div key={index} className='news-cards-background'>
                        <a className='news-card-title' href={obj.bold} target='_blank'>{obj.title}</a>
                    <div className='news-card-description'>{obj.what}</div>
                    <div className='news-card-date'>{obj.when_date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}