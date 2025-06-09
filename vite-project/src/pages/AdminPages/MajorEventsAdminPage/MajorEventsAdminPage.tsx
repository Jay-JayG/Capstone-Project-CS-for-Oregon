import './MajorEventsAdminPage.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EventPage, NewEventPage, RetrievedEventCard } from '../../../types/eventTypes';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { useEventPages } from './EventPageContext';
import { Link } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
//console.log("API Base URL:", apiBaseUrl); // Add this line to verify
// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EcsHuddlePage() {
    const [formData, setFormData] = useState<NewEventPage>({
        header: '',
        location: '',
        date_range: '',
        organization: '',
        optional_event_description_bold_text: '',
        event_description: '',
        hidden: "1",
        page_url: ''
    });

    const strings: string[] = ["/winterofcs", "/summerOfCS", "/ECS_Huddle", "/EventPage1", "/EventPage2", "/EventPage3"];

    const { eventPages, setEventPages } = useEventPages();

    const [submitted, setSubmitted] = useState(false);

    const [events, setEvents] = useState<RetrievedEventCard[]>([]);

    const [editedData, setEditedData] = useState<Partial<EventPage> | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditClick = (id: number, obj: EventPage) => {
        setEditingId(id);
        setEditedData({ ...obj });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedData(null);
    };

    const getEventPages = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}majorevents.php`);
            const data = Array.isArray(res.data) ? res.data : [];
            setEventPages(data);
        } catch (error) {
            console.log('Error retrieving eventPages', error);
        }
    };

    // const getEvents = async () => {
    //     try {
    //         const res = await axios.get(`${apiBaseUrl}events.php`);
    //         // const res = await axios.get('http://localhost/events.php'); // For local development
    //         setEvents(res.data);
    //     } catch (error) {
    //         console.log('Error retrieving eventPages', error);
    //     }
    // };

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

    // useEffect(() => {
    //     // getEventPages();
    //     getEvents();
    //     // console.log(eventPages)
    //     // console.log(events)
    // }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}majorevents.php`, formData);
            console.log('Object uploaded successfully:', res.data);

            const newEventPage = res.data;
            // Update the local state to include the newly created event page
            setEventPages((prevEventPages) => [...prevEventPages, newEventPage]);

            // Reseting the Form to be empty
            setSubmitted(true);
            setFormData({
                header: '',
                location: '',
                date_range: '',
                organization: '',
                optional_event_description_bold_text: '',
                event_description: '',
                hidden: "1",
                page_url: ''
            })
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);

            // getEventPages(); Redundent with local state change.
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    const handleHide = async (id, currentHiddenStatus) => {
        try {
            const newHiddenStatus = "1";
            const res = await axios.put(`${apiBaseUrl}majorevents.php`, {
                id,
                hidden: newHiddenStatus
            });
            if (res.status === 200) {
                // const successMessage = res.data.message;
                setEventPages((prevEventPages) =>
                    prevEventPages.map((eventPage) =>
                        eventPage.id === id ? { ...eventPage, hidden: newHiddenStatus } : eventPage
                    )
                );
                console.log(`Object ${id} hidden status updated successfully:`, res.data);
            }
            // getEventPages();
        } catch (error) {
            console.log(`Error updating hidden status for object ${id}:`, error);
        }
    };

    const handleShow = async (id, currentHiddenStatus) => {
        try {
            const newHiddenStatus = "0";
            const res = await axios.put(`${apiBaseUrl}majorevents.php`, {
                id,
                hidden: newHiddenStatus
            });
            if (res.status === 200) {
                // const successMessage = res.data.message;
                setEventPages((prevEventPages) =>
                    prevEventPages.map((eventPage) =>
                        eventPage.id === id ? { ...eventPage, hidden: newHiddenStatus } : eventPage
                    )
                );
                console.log(`Object ${id} hidden status updated successfully:`, res.data);
            }
            // getEventPages();
        } catch (error) {
            console.log(`Error updating hidden status for object ${id}:`, error);
        }
    };

    const handleDelete = async (id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this event page?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            const res = await axios.delete(`${apiBaseUrl}majorevents.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setEventPages(prevEventPages => prevEventPages.filter(eventPage => eventPage.id !== id));
            } else {
                console.error(`Failed to delete the event. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting object ${id}:`, error);
        }
    }

    const handleSave = async (event) => {
        event.preventDefault();
        if (editingId !== null && editedData) {
            try {
                const res = await axios.put(`${apiBaseUrl}majorevents.php`, editedData, {
                    params: { id: editingId, update_type: 'full' }
                });
                if (res.status === 200) {
                    // const successMessage = res.data.message;
                    setEventPages((prevEventPages) =>
                        prevEventPages.map((eventPage) =>
                            eventPage.id === editingId ? { ...eventPage, ...editedData } : eventPage
                        )
                    );
                    setEditingId(null); // Exit edit mode
                    setEditedData(null);
                } else {
                    console.error(`Failed to save changes. Status code: ${res.status}`);
                }
            } catch (error) {
                console.error("Error saving changes:", error);
            }
        }
    };

    const handleRadioChange = (event) => {
        setFormData({ ...formData, page_url: event.target.value });
        console.log("Selected Event URL:", event.target.value);
    };

    const handleRadioChangeEdit = (event) => {
        setEditedData({ ...editedData, page_url: event.target.value });
        console.log("Selected Event URL:", event.target.value);
    };

    const inputform = () => {

        return (
            <div className='AdminPageFormContainer'>
                <form onSubmit={handleSubmit} className="major-events-form">
                    Header
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="header"
                            value={formData.header}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    Organization (Optional)
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                        />
                    </label>
                    Location (Optional)
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </label>
                    Date Range (Optional)
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="date_range"
                            value={formData.date_range}
                            onChange={handleChange}
                        />
                    </label>
                    {/* <label htmlFor="firstPage">JPG image to go to the right of the Event Heading</label>
                    <input
                        className='major-events-form-field'
                        type="file"
                        name="firstPage"
                        onChange={handleChange}
                        accept=".jpg"
                    /> */}
                    <span>Event Description - Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="event_description"
                            value={formData.event_description}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={100}
                        />
                    </label>
                    Event Page URL (Greyed out options are being used):
                    <div className='AdminPageFormFieldDiv'>
                        <label>
                            <input
                                type="radio"
                                name="major_event_url"
                                value="None"
                                onChange={handleRadioChange}
                            />
                            None
                        </label>
                        {strings.length > 0 ? (strings.map((str, index) => {
                            const isDisabled = eventPages.some((page) => page.page_url === str);
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="major_event_url"
                                        value={str}
                                        onChange={handleRadioChange}
                                        disabled={isDisabled} // Disable if there's a match
                                    />
                                    {str}
                                </label>
                            );
                        })
                        ) : null}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

    const hideshowbuttons = (obj) => {
        {
            obj.hidden === "0" ? (
                <button
                    onClick={() => handleHide(obj.id, obj.hidden)}
                    disabled={true} // Disable the Hide button if the page is shown
                >
                    Hide Page
                </button>
            ) : (
                <button
                    onClick={() => handleShow(obj.id, obj.hidden)}
                    disabled={false} // Enable the Show button if the page is hidden
                >
                    Show Page
                </button>
            )
        }

        {
            obj.hidden === "1" ? (
                <button
                    onClick={() => handleShow(obj.id, obj.hidden)}
                    disabled={false} // Enable the Show button if the page is hidden
                >
                    Show Page
                </button>
            ) : (
                <button
                    onClick={() => handleHide(obj.id, obj.hidden)}
                    disabled={false} // Enable the Hide button if the page is shown
                >
                    Hide Page
                </button>
            )
        }
    }

    const editform = () => {

        return (
            <div className='AdminPageFormContainer'>
                <form onSubmit={handleSave} className="major-events-form">
                    Header
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="header"
                            value={editedData?.header || ''}
                            onChange={handleEditChange}
                            required
                        />
                    </label>
                    Organization (Optional)
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="organization"
                            value={editedData?.organization || ''}
                            onChange={handleEditChange}
                        />
                    </label>
                    Location (Optional)
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="location"
                            value={editedData?.location || ''}
                            onChange={handleEditChange}
                        />
                    </label>
                    Date Range (Optional)
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="date_range"
                            value={editedData?.date_range || ''}
                            onChange={handleEditChange}
                        />
                    </label>
                    {/* <label htmlFor="firstPage">JPG image to go to the right of the Event Heading</label>
                    <input
                        className='major-events-form-field'
                        type="file"
                        name="firstPage"
                        onChange={handleChange}
                        accept=".jpg"
                    /> */}
                    <span>Event Description - Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="event_description"
                            value={editedData?.event_description || ''}
                            onChange={handleEditChange}
                            required
                            rows={10}
                            cols={100}
                        />
                    </label>
                    Event Page URL (Greyed out options are being used):
                    <div className='AdminPageFormFieldDiv'>
                        <label>
                            <input
                                type="radio"
                                name="major_event_url"
                                value="None"
                                onChange={handleRadioChangeEdit}
                            />
                            None
                        </label>
                        {strings.length > 0 ? (strings.map((str, index) => {
                            const isDisabled = eventPages.some((page) => page.page_url === str);
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="major_event_url"
                                        value={str}
                                        onChange={handleRadioChangeEdit}
                                        disabled={isDisabled} // Disable if there's a match
                                    />
                                    {str}
                                </label>
                            );
                        })
                        ) : null}
                    </div>
                    <div>
                        <button className="AdminPageSubmitButton" onClick={handleCancel}>Cancel</button>
                        <button className="AdminPageSubmitButton" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }


    return (

        <div className='AdminPageContainer'>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>
            <>{inputform()}</>
            {/* Page Preview */}
            Preview:
            <div id="main-content">
                <div className='SummerOfCSSupercontainer'>
                    <div className="SummerOfCScontainer">
                        <div className="SummerOfCSHeaderContainer">
                            <div className="SummerOfCSHeaderContainerText">
                                <div className='SummerOfCSHeaderContainerTextHeader'><ReactMarkdown>{formData.header}</ReactMarkdown></div>
                                <div className='SummerOfCSHeaderContainerTextBody'><ReactMarkdown>{formData.organization}</ReactMarkdown></div>
                                <div className='SummerOfCSHeaderContainerTextBody'>{formData.location}</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>{formData.date_range}</div>
                                {/* <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" /> */}
                            </div>
                            {/* <div className='SummerOfCSHeaderPhotoContainer'>
                                <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" />
                            </div> */}
                        </div>
                    </div>
                    <div className='SummerOfCSSummary'>
                        <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>{formData.optional_event_description_bold_text}</span><ReactMarkdown>{formData.event_description}</ReactMarkdown></div>
                    </div>
                </div>
            </div>

            {eventPages.map((obj, index) => (
                <div key={obj.id} id="main-content">
                    <div className='SummerOfCSSupercontainer'>
                        <div className="SummerOfCScontainer">
                            <div className="SummerOfCSHeaderContainer">
                                <div className="SummerOfCSHeaderContainerText">
                                    <div className='SummerOfCSHeaderContainerTextHeader'><ReactMarkdown>{obj.header}</ReactMarkdown></div>
                                    <div className='SummerOfCSHeaderContainerTextBody'><ReactMarkdown>{obj.organization}</ReactMarkdown></div>
                                    <div className='SummerOfCSHeaderContainerTextBody'>{obj.location}</div>
                                    <div className='SummerOfCSHeaderContainerTextBody'>{obj.date_range}</div>
                                    {/* <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" /> */}
                                </div>
                                {/* <div className='SummerOfCSHeaderPhotoContainer'>
                                    <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" />
                                </div> */}
                            </div>
                        </div>
                        <div className='SummerOfCSSummary'>
                            <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>{obj.optional_event_description_bold_text}</span>
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
                                    {obj.event_description}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => handleDelete(obj.id)}>
                        Delete Event Page Above
                    </button>
                    <>
                        {obj.hidden === "0" ? (
                            <button
                                onClick={() => handleHide(obj.id, obj.hidden)}
                                disabled={true} // Disable the Hide button if the page is shown
                            >
                                Show Page
                            </button>
                        ) : (
                            <button
                                onClick={() => handleShow(obj.id, obj.hidden)}
                                disabled={false} // Enable the Show button if the page is hidden
                            >
                                Show Page
                            </button>
                        )}
                        {obj.hidden === "1" ? (
                            <button
                                onClick={() => handleShow(obj.id, obj.hidden)}
                                disabled={true} // Enable the Show button if the page is hidden
                            >
                                Hide Page
                            </button>
                        ) : (
                            <button
                                onClick={() => handleHide(obj.id, obj.hidden)}
                                disabled={false} // Enable the Hide button if the page is shown
                            >
                                Hide Page
                            </button>
                        )}
                    </>
                    {editingId === obj.id ? (editform()) : (<button onClick={() => handleEditClick(obj.id, obj)}>Edit</button>)}

                    <div className='summer-of-cs-event-cards-container'>
                        {events.filter(event => event.major_event_associated == obj.header)
                            .map((event, index) => (
                                <div key={event.id} className='event-cards-background'>
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
}
