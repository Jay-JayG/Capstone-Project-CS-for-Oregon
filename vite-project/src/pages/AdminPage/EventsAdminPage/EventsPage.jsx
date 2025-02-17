import './EventsPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEventPages } from '../MajorEventsAdminPage/EventPageContext';
import { EventsPageEditDiologBox } from './EventsPageEditDiologBox';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function EventsPage() {

    const [formData, setFormData] = useState({
        title: '',
        bold: '',
        what: '',
        who: '',
        when_date: '',
        is_full: 0,
        flyer_link: '',
        apply_link: '',
        major_event_associated: ''
    });

    const [currentEditingData, setCurrentEditingData] = useState({});

    // const [editingData, setEdditingtData] = useState({});

    const { eventPages, setEventPages } = useEventPages();

    // const getEventPages = async () => {
    //     try {
    //         const res = await axios.get(`${apiBaseUrl}majorevents.php`);
    //         const data = Array.isArray(res.data) ? res.data : [];
    //         setEventPages(data);
    //     } catch (error) {
    //         console.log('Error retrieving EventPages', error);
    //     }
    // };

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource(`${apiBaseUrl}get_event_cards_sse.php`);

        // Handle incoming SSE events
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setObjects(data);
            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        };

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            eventSource.close(); // Close the connection on error
        };

        // close the EventSource connection when the component unmounts
        return () => {
            eventSource.close();
        };
    }, [setObjects]);


    const [submitted, setSubmitted] = useState(false);

    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const handleEdit = (obj) => {
        setIsDialogVisible(true);
        setCurrentEditingData(obj);

    };

    const closeDialog = () => {
        setIsDialogVisible(false);
    };

    // const handleDialogBoxEdit = (event) => {
    //     const { name, value } = event.target;
    //     setEdditingtData({ ...editingData,  [name]: value});
    // }

    // const handleRadioChangeEdit = (event) => {
    //     setEdditingtData({ ...editingData, major_event_associated: event.target.value });
    //     console.log("Selected Event URL:", event.target.value);
    // };


    const handleTitleInputChange = (event) => {
        setFormData({ ...formData, title: event.target.value });
        console.log(formData.title)
    }

    const handleBoldInputChange = (event) => {
        setFormData({ ...formData, bold: event.target.value });
    }

    const handleWhatInputChange = (event) => {
        setFormData({ ...formData, what: event.target.value });
    }

    const handleWhoInputChange = (event) => {
        setFormData({ ...formData, who: event.target.value });
    }

    const handleWhen_dateInputChange = (event) => {
        setFormData({ ...formData, when_date: event.target.value });
    }

    const handleFlyerInputChange = (event) => {
        setFormData({ ...formData, flyer_link: event.target.value });
    }

    const handleApplyInputChange = (event) => {
        setFormData({ ...formData, apply_link: event.target.value });
    }

    const handleRadioChange = (event) => {
        setFormData({ ...formData, major_event_associated: event.target.value });
        console.log("Selected Event ID:", event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            const res = await axios.post(`${apiBaseUrl}events.php`, formData);
            console.log('Object uploaded successfullyy:', res.data);
            setSubmitted(true);
            setFormData({
                title: '',
                bold: '',
                what: '',
                who: '',
                when_date: '',
                is_full: 0,
                flyer_link: '',
                apply_link: '',
                major_event_associated: 0
            });
            setTimeout(() => {
                setSubmitted(false);
            }, 200);
            await getObjects();
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    useEffect(() => {
        getObjects();
        // getEventPages();
        //console.log("Test1: ", eventPages);
    }, []);

    const getObjects = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}events.php`);
            // const res = await axios.get('http://localhost/events.php'); // For local development
            setObjects(res.data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    const handleDelete = async (id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this event page?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            await axios.delete(`${apiBaseUrl}events.php?id=${id}`);
            setObjects(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.log('Error deleting object', error);
        }
    };

    const handleEditInputChange = (event, id) => {
        const { name, value } = event.target;
        console.log(`Editing ${name} to ${value}`);
        const updatedObjects = objects.map(obj => {
            if (obj.id === id) {
                return { ...obj, [name]: value };
            } else {
                return obj;
            }
        });
        setObjects(updatedObjects);
    };

    const handleCancelEdit = (id) => {
        const updatedObjects = objects.map(obj => {
            if (obj.id === id) {
                const { editingField, ...rest } = obj;
                return rest;
            } else {
                return obj;
            }
        });
        setObjects(updatedObjects);
    };

    const handleSaveEdit = async (id) => {
        try {
            const editedObject = objects.find(obj => obj.id === id);
            const res = await axios.put(`${apiBaseUrl}events.php?id=${id}`, editedObject);

            setObjects(prevObjects =>
                prevObjects.map(obj => (obj.id === id ? { ...obj, ...editedObject } : obj))
            );

            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 200);
            handleCancelEdit(id);

            console.log(res);
        } catch (error) {
            console.log('Error updating object', error);
        }
    };

    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Event Card Admin Page</p>
            {submitted ? <p className='AdminPageSubmittedText'>Submitted</p> : null}
            <div className='AdminPageFormContainer'>
                <form className='AdminPageForm' onSubmit={handleSubmit}>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleTitleInputChange}
                            value={formData.title}
                            className='AdminPageFormField'
                            placeholder='Title'
                            name='title'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleBoldInputChange}
                            value={formData.bold}
                            className='AdminPageFormField'
                            placeholder='Bold Text Description'
                            name='bold'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleWhatInputChange}
                            value={formData.what}
                            className='AdminPageFormField'
                            placeholder='What'
                            name='what'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleWhoInputChange}
                            value={formData.who}
                            className='AdminPageFormField'
                            placeholder='Who'
                            name='who'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleWhen_dateInputChange}
                            value={formData.when_date}
                            className='AdminPageFormField'
                            placeholder='When'
                            name='when'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleFlyerInputChange}
                            value={formData.flyer_link}
                            className='AdminPageFormField'
                            placeholder='Flyer Link'
                            name='flyer_link'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleApplyInputChange}
                            value={formData.apply_link}
                            className='AdminPageFormField'
                            placeholder='Apply Link'
                            name='apply_link'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        If you want an Event Card to show on an Event Page select the event page below.<br /> To not associate a card with an Event Pgae select None.
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <label>
                            <input
                                type="radio"
                                name="major_event"
                                value="None"
                                onChange={handleRadioChange}
                            />
                            None
                        </label>
                        {eventPages.length > 0 ? (eventPages.map((event, index) => (<label key={event.id || index}>
                            <input
                                type="radio"
                                name="major_event"
                                value={event.header}
                                onChange={handleRadioChange}
                            />
                            {event.header}</label>
                        ))
                        ) : null}
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitButton' type='submit'>
                            Submit
                        </button>
                    </div >
                </form>
            </div>

            {/* Preview Event Card */}
            <div className='event-cards-container'>
                <div className='event-cards-background'>
                    <div className='event-card-title' href={formData.bold}>{formData.title}</div>
                    <div className='event-card-description'><span className='event-bold-text'>What: {formData.bold} </span>{formData.what}</div>
                    <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{formData.who}</div>
                    <div className='event-card-date'>{formData.when_date}</div>
                    {formData.is_full === "1" ? (
                        <div className='event-full'>
                            <h3>Event Full</h3>
                            We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                        </div>
                    ) : null}
                    <div className='event-buttons-container'>
                        <a className='event-buttons-Flyer' href={formData.flyer_link} target='_blank'>Event Flyer</a>
                        {formData.is_full === "1" ? (
                            <div className='event-buttons-Flyer-disabled'>Event Full</div>
                        ) : <a className='event-buttons-Flyer' href={formData.apply_link} target='_blank'>Apply Here</a>}
                    </div>
                </div>
            </div>

            {/* All Event Cards */}
            <div className='summer-of-cs-event-cards-container'>
                {objects.map((event, eventIndex) => (
                    <>
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
                            <div>Is Event Full: {event.is_full}</div>
                            <div>Major Event Associated: {event.major_event_associated}</div>
                            {/* Make a button that reuses the ful put request and just changes the full state like the toggle button in banner*/}
                            <div className='buttons-center'>
                                <button className='admin-edit-button' onClick={() => handleEdit(event)}>Edit</button>
                                <button className='admin-edit-button' onClick={() => handleDelete(event.id)}>Delete</button>
                            </div>
                        </div>
                    </>
                ))}
                {isDialogVisible && (
                    <div className="dialog-overlay" onClick={closeDialog}>
                        <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                            <button onClick={closeDialog} className='admin-edit-button'>Cancel</button>
                            <EventsPageEditDiologBox event={currentEditingData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}