import './EventsPage.css';
import '../NewsPage/NewsPage.css'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function EventsPage() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}events.php`);
                //const res = await axios.get("http://localhost/get_data.php"); // For local development
                setObjects(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects();
    }, []);


    const compareStartDate = (eventA, eventB) => {
        console.log(eventA.when_date.split(' - '));
        const [startDateA] = eventA.when_date.split(' - ');
        const [, yearA] = eventA.when_date.split(', ');
        const [startDateB] = eventB.when_date.split(' - ');
        const [, yearB] = eventB.when_date.split(', ');

        // Compare years first
        if (parseInt(yearA) !== parseInt(yearB)) {
            return parseInt(yearB) - parseInt(yearA); // Sort by year in descending order
        }

        // Extract months from start date strings
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthIndexA = monthNames.indexOf(startDateA.split(' ')[0]);
        const monthIndexB = monthNames.indexOf(startDateB.split(' ')[0]);

        // Compare months
        if (monthIndexA !== monthIndexB) {
            return monthIndexB - monthIndexA; // Sort by month in descending order
        }

        // Parse day from start date strings
        const dayA = parseInt(startDateA.split(' ')[1]);
        const dayB = parseInt(startDateB.split(' ')[1]);

        // Compare days
        return dayA - dayB; // Sort by day in descending order
    };

    // Sort filtered objects by start date in reverse chronological order
    const sortedObjects = objects.sort(compareStartDate);

    return (
        <div id="main-content" className='events-page-container'>
            <div className='news-and-features-page-navigator'>
                <Link to={`/News`} className='news-and-features-page-navigator-news'>News</Link>
                <Link to={`/events`} className='news-and-features-page-navigator-events'>Events</Link>
                {/* <Link to={`/spotlight`} className='news-and-features-page-navigator-spotlight'>Spotlight</Link> */}
            </div>
            <div className='event-cards-container'>
                {sortedObjects.map((obj, index) => (
                    <div key={index} className='event-cards-background'>
                        <div className='event-card-title' href={obj.bold}>{obj.title}</div>
                        <div className='event-card-description'><span className='event-bold-text'>What: {obj.bold} </span>{obj.what}</div>
                        <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{obj.who}</div>
                        <div className='event-card-date'>{obj.when_date}</div>
                        {obj.is_full === "1" ? (
                                <div className='event-full'>
                                    <h3>Event Full</h3>
                                    We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                                </div>
                            ) : null}
                            <div className='event-buttons-container'>
                                <a className='event-buttons-Flyer' href={obj.flyer_link} target='_blank'>Event Flyer</a>
                                {obj.is_full === "1" ? (
                                    <div className='event-buttons-Flyer-disabled'>Event Full</div>
                                ) : <a className='event-buttons-Flyer' href={obj.apply_link} target='_blank'>Apply Here</a>}
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
}