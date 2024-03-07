import './NewsAndFeatures.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function NewsAndFeaturesPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async (tag) => {
            try {
                const res = await axios.get(`http://localhost:3001/objects${tag ? `?tag=${tag}` : ''}`);
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
            <div>
                <p>gellki</p>
                <embed src="/src/assets/Understanding growth mindset practices.pdf" type="application/pdf" width="100%" height="600px" />
            </div>
        </div>
    );
}