import './NewsAndFeatures.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function NewsAndFeaturesPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get('http://localhost:3001/objects');
                setObjects(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects();
    }, []);


    return (
        <div className='news-and-features-page-container'>
            <div className='news-and-features-page-navigator'>
                <Link to={`/News`} className='news-and-features-page-navigator-news'>News</Link>
                <Link to={`/EventsPage`} className='news-and-features-page-navigator-events'>Events</Link>
                <div className='news-and-features-page-navigator-spotlight'>Spotlight</div>
            </div>
            <h1>NewsAndFeaturesPage WIP</h1>
            <div className='news-object-list'>
                {objects.map(obj => (
                    <div key={obj._id} className='object'>
                        <div className='object-container'>
                            <h2>{obj.title}</h2>
                            <p>{obj.description}</p>
                            {obj.extra && <p>{obj.extra}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}