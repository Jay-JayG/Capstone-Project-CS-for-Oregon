import ECSLogo from '/src/assets/ECS-Logo-.png';
import StitchingTheLoopLogo from '../../assets/stitching-the-loop-logo-transparent-bkgrnd.webp';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useEventPages } from '../AdminPages/MajorEventsAdminPage/EventPageContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify



export default function EventPage3() {
    const { eventPages } = useEventPages();
    // const [eventPages, setObjects] = useState([]);
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}events.php`);
            // const res = await axios.get('http://localhost/events.php'); // For local development
            setEvents(res.data);
        } catch (error) {
            console.log('Error retrieving eventPages', error);
        }
    };

    // const getObjects = async () => {
    //     try {
    //         const res = await axios.get(`${apiBaseUrl}majorevents.php`);
    //         setObjects(res.data);
    //         console.log(res.data);
    //     } catch (error) {
    //         console.log('Error retrieving eventPages', error);
    //     }
    // }

    useEffect(() => {
        // getObjects();
        getEvents();
        // console.log(eventPages)
        console.log("events", events)
    }, []);

    return (
        <div id="main-content">
            {eventPages.filter(obj => obj.hidden === "0" && obj.page_url === "/EventPage3").map((obj, index) => (
                    <div key={`object-${index}`} className='SummerOfCSSupercontainer'>
                        <div className="SummerOfCScontainer">
                            <div className="SummerOfCSHeaderContainer">
                                <div className="SummerOfCSHeaderContainerText">
                                    <div className='SummerOfCSHeaderContainerTextHeader'><ReactMarkdown>{obj.header}</ReactMarkdown></div>
                                    <div className='SummerOfCSHeaderContainerTextBody'><ReactMarkdown>{obj.organization}</ReactMarkdown></div>
                                    <div className='SummerOfCSHeaderContainerTextBody'>{obj.location}</div>
                                    <div className='SummerOfCSHeaderContainerTextBody'>{obj.date_range}</div>
                                </div>
                            </div>
                        </div>
                        <div className='SummerOfCSSummary'>
                        <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>{obj.optional_event_description_bold_text}</span><ReactMarkdown>{obj.event_description}</ReactMarkdown></div>
                        </div>

                    <div className='summer-of-cs-event-cards-container'>
                        {events.filter(event => event.major_event_associated === obj.header)
                        .map((event, eventIndex) => (
                            <div key={`event-${eventIndex}`} className='event-cards-background'>
                                <div className='event-card-title'>{event.title}</div>
                                <div className='event-card-description'><span className='event-bold-text'>What: {event.bold} </span>{event.what}</div>
                                <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{event.who}</div>
                                <div className='event-card-date'>{event.when_date}</div>
                                {event.is_full === "1" ? (
                                    <div className='event-full'>
                                        <h3>Event Full</h3>
                                        We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                                    </div>
                                ) : null}
                                <div className='event-buttons-container'>
                                    <a className='event-buttons-Flyer' href={event.flyer_link} target='_blank'>Event Flyer</a>
                                    {event.is_full === "1" ? (
                                        <div className='event-buttons-Flyer-disabled'>Event Full</div>
                                    ) : <a className='event-buttons-Flyer' href={event.apply_link} target='_blank'>Apply Here</a>}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    );
};