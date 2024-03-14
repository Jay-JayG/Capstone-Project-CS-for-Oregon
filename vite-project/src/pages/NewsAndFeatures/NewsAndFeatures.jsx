import './NewsAndFeatures.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function NewsAndFeaturesPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get("/api/endpoint");
                setObjects(res.data.map(item => JSON.parse(item.object)));
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
                {objects.map((obj, index ) => (
                    <div key={index} className='object'>
                        <div className='object-container'>
                            <h2>{obj.name}</h2>
                            <p>{obj.age}</p>
                            {obj.city && <p>{obj.city}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}