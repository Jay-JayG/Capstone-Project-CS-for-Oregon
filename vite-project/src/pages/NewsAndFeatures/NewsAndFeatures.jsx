import './NewsAndFeatures.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const link = 'https://ktvz.com/news/education/2024/01/22/osu-cascades-professor-receives-628000-ode-award-to-boost-k-12-students-participation-in-computer-science';
const text_1 = 'OSU-Cascades professor receives ODE award to boost K-12 students\' participation in computer science';
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

    const filteredObjects = objects.filter(obj => obj.news_type === '3');

    return (
        <div className='news-and-features-page-container'>
            <div className='news-and-features-page-navigator'>
                <Link to={`/News`} className='news-and-features-page-navigator-news'>News</Link>
                <Link to={`/events`} className='news-and-features-page-navigator-events'>Events</Link>
                <Link to={`/spotlight`} className='news-and-features-page-navigator-spotlight'>Spotlight</Link>
            </div>
            <div className='news-cards-container'>
                {filteredObjects.map((obj, index) => (
                    <div key={index} className='news-cards-background'>
                        <a className='news-card-title' href={obj.bold}>{obj.title}</a>
                    <div className='news-card-description'>{obj.what}</div>
                    <div className='news-card-date'>{obj.when_date}</div>
                    </div>
                ))}
                <div className='news-cards-background'>
                    <a className='news-card-title' href={link}>{text_1}</a>
                    <div className='news-card-description'>Jill Hubbard of OSU-Cascades works with Oregon educators to expand universally engaging, culturally appropriate, and inclusive computer science education for K-12 students.</div>
                    <div className='news-card-date'>January 24, 2024</div>
                </div>
            </div>
        </div>
    );
}
{/* <div className='news-object-list'>
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
                    <div><span className='object-bold-text'>Type: </span>{obj.news_type}</div>
                </div>
            </div>
        </div>
    ))}
</div> */}