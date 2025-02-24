import React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function DropDownEventsAdminPage() {

    const [eventContent, setEventContent] = useState(
        {
            title: '',
            content: ''
        }
    );

    const [openForms, setOpenForms] = useState({}); // Tracks which forms are open
    const [editFormFields, setEditFormFields] = useState({}); // Tracks current form values

    const toggleForm = (eventId, event) => {
        setOpenForms((prev) => ({
            ...prev,
            [eventId]: !prev[eventId], // Toggle the open/closed state
        }));

        if (!openForms[eventId]) {
            // Prefill the form fields if opening the form
            setEditFormFields((prev) => ({
                ...prev,
                [eventId]: { title: event.title, content: event.content },
            }));
        }
    };

    const handleFieldChange = (eventId, field, value) => {
        setEditFormFields((prev) => ({
            ...prev,
            [eventId]: { ...prev[eventId], [field]: value },
        }));
    };

    const [eventDropdowns, setEventDropdowns] = useState([]);
    console.log("provider", eventContent);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventContent((prevContent) => ({
            ...prevContent,
            [name]: value,
        }));
        console.log(eventContent)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}event_dropdowns.php`, eventContent);
            console.log(res.data);

            setTimeout(() => {
                setSubmitted(false);
            }, 2000);

            setEventContent({
                title: '',
                content: ''
            });
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    const handleEditSubmit = async (event, eventId) => {
        event.preventDefault();
        try {
            const updatedEvent = editFormFields[eventId]; // Get the updated title and content for the event

            const res = await axios.put(`${apiBaseUrl}event_dropdowns.php`, {
                id: eventId,
                title: updatedEvent.title,
                content: updatedEvent.content,
            });

            console.log('Edit successful:', res.data);

            // Update the local state with the edited event
            setEventDropdowns((prevEvents) =>
                prevEvents.map((ev) =>
                    ev.id === eventId
                        ? { ...ev, title: updatedEvent.title, content: updatedEvent.content }
                        : ev
                )
            );

            // Close the form after submission
            setOpenForms((prev) => ({
                ...prev,
                [eventId]: false,
            }));

        } catch (error) {
            console.error('Error submitting edited dropdown:', error);
        }
    };

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

    const [formData, setFormData] = useState(null);
    const [workShopImage, setWorkShopImage] = useState(null);

    const postImage = async (event) => {
        event.preventDefault();
        if (!formData) {
            console.log("No file selected.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("image", formData);

        try {
            const res = await axios.post(`${apiBaseUrl}workshop_schedule.php`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Image uploaded successfully:", res.data);

            // Fetch updated image after upload
            fetchImage();
        } catch (error) {
            console.log("Error uploading image:", error);
        }
    };

    const handleFileChange = (event) => {
        setFormData(event.target.files[0]); // Store file directly
    };

    const fetchImage = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}workshop_schedule.phptimestamp=${new Date().getTime()}`);
            if (res.data.image) {
                setWorkShopImage(res.data.image); // Store base64 image
            }
        } catch (error) {
            console.log("Error fetching image:", error);
        }
    };

    // Fetch image when component mounts
    useEffect(() => {
        fetchImage();
    }, []);


    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Drop Down Events for Summer of CS</p>
            <p className='AdminPageTitle'>Scroll Down to edit events</p>
            <p className='text-align-center'>This is the admin page to change the text in the "Summer Equity Sumposium" page drop down events.</p>
            <p className='text-align-center'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</p>

            <div className='AdminPageFormContainer' style={{ display: "flex", flexDirection: "column" }}>
                <p className='AdminPageTitle'>Add an Event:</p>
                <form onSubmit={handleSubmit} className="major-events-form" style={{ padding: '1%' }}>
                    Event Drop Down Title:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="title"
                            value={eventContent.title}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={100}
                        />
                    </label>
                    Event Drop Down Details:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="content"
                            value={eventContent.content}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={100}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            Preview:
            <div className='drop-down-container'>
                <div className='event-drop-down'>
                    <button className='event-drop-down-button'>
                        <span className='event-title'>{eventContent.title} <i className="arrow up"></i></span>
                    </button>
                    <div className='drop-down-button-text'>
                        <ReactMarkdown>{eventContent.content}</ReactMarkdown>
                    </div>
                </div>
            </div>

            <div className='AdminPageFormContainer' style={{ display: "flex", flexDirection: "column" }}>
                <p className='AdminPageTitle'>Change Workshop Schedule Image::</p>
                <form onSubmit={postImage} className="major-events-form" style={{ padding: '1%' }}>
                    <label>
                        <input
                            type="file"
                            accept="image/*"
                            className='major-events-form-field'
                            onChange={handleFileChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <div>Current Set Workshop Image:</div>
                    {workShopImage && <img src={workShopImage} alt="Workshop Schedule" className='workshopimage'/>}
            </div>

            <p className='AdminPageTitle'>Edit Events:</p>
            <div className='drop-down-container'>
                {eventDropdowns?.length > 0 && eventDropdowns.map(event => (
                    <div key={event.id} className='event-drop-down'>
                        <button className='event-drop-down-button'>
                            {/* <img className='eventimage' src={event.image} alt={event.title} /> */}
                            {openForms[event.id] ? (<span className='event-title'>{editFormFields[event.id]?.title || ''} <i className="arrow up"></i></span>) : (<span className='event-title'>{event.title} <i className="arrow up"></i></span>)}
                        </button>
                        <div className='drop-down-button-text'>
                            {openForms[event.id] ? (<ReactMarkdown>{editFormFields[event.id]?.content || ''}</ReactMarkdown>) : (<ReactMarkdown>{event.content}</ReactMarkdown>)}
                            <button onClick={() => toggleForm(event.id, event)} className='EditSubmitButton'>
                                {openForms[event.id] ? 'Close Edit Form' : 'Edit'}
                            </button>
                        </div>

                        {openForms[event.id] && (
                            <form onSubmit={(e) => handleEditSubmit(e, event.id)} className="major-events-form" style={{ padding: '1%' }}>
                                Event Drop Down Title:
                                <label>
                                    <textarea
                                        className='major-events-form-field'
                                        name="title"
                                        value={editFormFields[event.id]?.title || ''}
                                        onChange={(e) => handleFieldChange(event.id, 'title', e.target.value)}
                                        required
                                        rows={10}
                                        cols={100}
                                    />
                                </label>
                                Event Drop Down Details:
                                <label>
                                    <textarea
                                        className='major-events-form-field'
                                        name="content"
                                        value={editFormFields[event.id]?.content || ''}
                                        onChange={(e) => handleFieldChange(event.id, 'content', e.target.value)}
                                        required
                                        rows={10}
                                        cols={100}
                                    />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                    </div>
                ))}
                {/* <img src={workshopimage} alt="Summer Equity Symposium Logo" className='workshopimage' /> */}
            </div>
        </div>
    );
}

{/* <ReactMarkdown
                                    components={{
                                        a: ({ node, ...props }) => (
                                            <a {...props} target="_blank" rel="noopener noreferrer">
                                                {props.children}
                                            </a>
                                        ),
                                    }}
                                > */}

{/* <div className='SummerOfCSSummaryText'><ReactMarkdown>{eventContent}</ReactMarkdown></div> */ }
