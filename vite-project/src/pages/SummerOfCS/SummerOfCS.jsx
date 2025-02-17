import CSSummerPhoto from '../../assets/SummerSymposium-2024-6Y1A0241.jpg';
import CSSymposiumLogo from '../../assets/CS_SYM_JAN2024.webp';
import './drop_down_menu.css';
import ECSLogo from '/src/assets/ECS-Logo-.png';
import './SummerOfCS.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEventPages } from '../AdminPage/MajorEventsAdminPage/EventPageContext';
import ReactMarkdown from 'react-markdown';
import workshopimage from '../../assets/workshoptable.png';
import rocket from '../../assets/rocket.png';
import brain from '../../assets/brain.png';
import thread from '../../assets/thread.png';
import people from '../../assets/people.png';
import idea from '../../assets/idea.png';
import rehypeRaw from "rehype-raw";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function SummerOfCS() {

    const { eventPages, setEventPages } = useEventPages();

    const [openStates, setOpenStates] = useState({});


    const eventImages = {
        "1": rocket,
        "2": brain,
        "3": thread,
        "4": people,
        "5": idea,
    };

    useEffect(() => {
        const initialStates = {};
        eventDropdowns.forEach(event => {
            initialStates[event.id] = false;
        });
        setOpenStates(initialStates);
    }, []);

    const toggleDropdown = (id) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Setup for handling the SSE
    useEffect(() => {
        const eventSource = new EventSource(`${apiBaseUrl}majorevents.php?sse=true`);

        // Handle incoming SSE events
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Update the context state with the new data
                setEventPages(data);
            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        };

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            eventSource.close(); // Close the connection on error
        };

        // Cleanup: close the EventSource connection when the component unmounts
        return () => {
            eventSource.close();
        };
    }, [setEventPages]);


    // const { eventPages, setEventPages } = useEventPages();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // SSE for Regular Event Cards
        const eventCardsSource = new EventSource(`${apiBaseUrl}get_event_cards_sse.php?sse=true`);

        eventCardsSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setEvents(data);  // Update event cards data
            } catch (error) {
                console.error('Error parsing Event Cards SSE data:', error);
            }
        };

        eventCardsSource.onerror = (error) => {
            console.error('Event Cards SSE connection error:', error);
            eventCardsSource.close();
        };

        // Cleanup for event cards SSE
        return () => {
            eventCardsSource.close();
        };
    }, [setEvents]);

    const [eventDropdowns, setEventDropdowns] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource(`${apiBaseUrl}event_dropdowns.php?sse=true`);

        // Handle incoming SSE events
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Update the context state with the new data
                setEventDropdowns(data);
                console.log("Event Dropdowns", data);
            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        };

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            eventSource.close(); // Close the connection on error
        };

        // Cleanup: close the EventSource connection when the component unmounts
        return () => {
            eventSource.close();
        };

    }, []);

    const getEvents = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}events.php`);
            setEvents(res.data);
        } catch (error) {
            console.log('Error retrieving eventPages', error);
        }
    };

    useEffect(() => {
        getEvents();
        console.log("events", events)
    }, []);


    return (
        <div id="main-content">
            {eventPages.filter(obj => obj.hidden === "0" && obj.page_url === "/summerOfCS").map((obj, index) => (
                <div key={`object-${index}`} className='SummerOfCSSupercontainer'>
                    <div className="SummerOfCScontainer">
                        <div className="SummerOfCSHeaderContainer">
                            <div className="SummerOfCSHeaderContainerText">
                                <div className='SummerOfCSHeaderContainerTextHeader'><ReactMarkdown>{obj.header}</ReactMarkdown></div>
                                <div className='SummerOfCSHeaderContainerTextBody'><ReactMarkdown>{obj.organization}</ReactMarkdown></div>
                                <div className='SummerOfCSHeaderContainerTextBody'>{obj.location}</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>{obj.date_range}</div>
                                <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" />
                            </div>
                            <img className='SummerOfCSHeaderPhoto' src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" />
                        </div>
                    </div>
                    <div className='SummerOfCSSummary'>
                        <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>{obj.optional_event_description_bold_text}</span>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}
                                components={{
                                    a: ({ node, ...props }) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer">
                                            {props.children}
                                        </a>
                                    ),
                                }}
                            >
                                {obj.event_description}
                            </ReactMarkdown>
                        </div>
                        <div className='events-drop-down-header' style={{ 'textAlign': 'center' }}>Event Details</div>
                        <div className='body-text sub-header'>Click the drop-down arrows to see event details</div>
                        <div className='drop-down-container'>
                            {eventDropdowns.map(event => (
                                <div key={event.id} className='event-drop-down'>
                                    <button onClick={() => toggleDropdown(event.id)} className='event-drop-down-button'>
                                        {event.id < 6 ? (<img className='eventimage' src={eventImages[event.id]} alt={event.title} />) : (null)}
                                        <span className='event-title'>{event.title} {openStates[event.id] ? (<i className="arrow up"></i>) : (<i className="arrow down"></i>)}</span>

                                    </button>
                                    {openStates[event.id] && (
                                        <div className='drop-down-button-text'>
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeRaw]}
                                                components={{
                                                    a: ({ node, ...props }) => (
                                                        <a {...props} target="_blank" rel="noopener noreferrer">
                                                            {props.children}
                                                        </a>
                                                    ),
                                                }}
                                            >
                                                {event.content}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <img src={workshopimage} alt="Summer Equity Symposium Logo" className='workshopimage' />
                        </div>
                    </div>

                    {/* <div className='drop-down-container'>
                        <div className='events-drop-down-header'>Events</div>
                        {events_drop.map(event => (
                            <div key={event.id} className='event-drop-down'>
                                <button onClick={() => toggleDropdown(event.id)} className='event-drop-down-button'>
                                    {event.title} {openStates[event.id] ? (<i className="arrow up"></i>) : (<i className="arrow down"></i>)}
                                </button>
                                {openStates[event.id] && (
                                    <div className='drop-down-button-text'><ReactMarkdown>{event.details}</ReactMarkdown></div>
                                )}
                            </div>
                        ))}
                        <img src={workshopimage} alt="Summer Equity Symposium Logo" className='workshopimage' />

                    </div> */}

                    <div className='summer-of-cs-event-cards-container'>
                        {events.filter(event => event.major_event_associated === obj.header && (event.display_event === "1" || event.display_event === "2"))
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
            ))
            }
        </div >
    );
};

//     const filteredObjects = objects.filter(obj => obj.news_type === '1');

//     return (
//         <div id="main-content">
//             <div className='SummerOfCSSupercontainer'>
//                 <div className="SummerOfCScontainer">
//                     <div className="SummerOfCSHeaderContainer">
//                         <div className="SummerOfCSHeaderContainerText">
//                             <div className='SummerOfCSHeaderContainerTextHeader'>Summer Equity Symposium</div>
//                             <div className='SummerOfCSHeaderContainerTextBody'>OSU-Cascades</div>
//                             <div className='SummerOfCSHeaderContainerTextBody'>Bend, Oregon</div>
//                             <div className='SummerOfCSHeaderContainerTextBody'>July 29 - August 2, 2024</div>
//                             <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" />
//                         </div>
//                         <div className='SummerOfCSHeaderPhotoContainer'>
//                             <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className='SummerOfCSSummary'>
//                     <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>CS for Oregon</span> is hosting a K12 Computer Science Equity Summit in Bend, Oregon this summer for educators, school leaders and school counselors.  To join us, please submit an application for one of the four professional development (PD) opportunities described below.</div>
//                 </div>
//                 <div className='summer-of-cs-event-cards-container'>
//                     {filteredObjects.map((obj, index) => (
//                         <div key={index} className='event-cards-background'>
//                             <div className='event-card-title'>{obj.title}</div>
//                             <div className='event-card-description'><span className='event-bold-text'>What: {obj.bold} </span>{obj.what}</div>
//                             <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{obj.who}</div>
//                             <div className='event-card-date'>{obj.when_date}</div>
//                             {obj.is_full === "1" ? (
//                                 <div className='event-full'>
//                                     <h3>Event Full</h3>
//                                     We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
//                                 </div>
//                             ) : null}
//                             <div className='event-buttons-container'>
//                                 <a className='event-buttons-Flyer' href={obj.flyer_link} target='_blank'>Event Flyer</a>
//                                 {obj.is_full === "1" ? (
//                                     <div className='event-buttons-Flyer-disabled'>Event Full</div>
//                                 ) : <a className='event-buttons-Flyer' href={obj.apply_link} target='_blank'>Apply Here</a>}
//                             </div>

//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };