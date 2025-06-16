import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const SpotlightPopupWindow = (event) => {

    const [slideId, setSlideId] = useState(event.event);

    const [spotlights, setSpotlights] = useState({});

    const getSpotlights = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}spotlight.php`);
            setSpotlights(response.data);
        } catch (error) {
            console.error("Error fetching spotlight dropdowns:", error);
        }
    };

    useEffect(() => {
        getSpotlights();
        console.log(slideId, "current slide id");
    }, []);

    useEffect(() => {
        console.log(spotlights, "hello");
    }, [setSpotlights]);

    const match = Array.isArray(spotlights) ? spotlights.find(item => item.id === slideId) : null;

    return (
        <div className='spotlight-dialog-box'>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{match ? match.text : "Loading or not found"}</ReactMarkdown>
        </div>
    );

}