import React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DropDownEventsAdminPage.css'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function DropDownEventsAdminPage() {

    const [eventContent, setEventContent] = useState(
        {
            title: '',
            content: '',
            image_icon: null
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
                [eventId]: { id: eventId, title: event.title, content: event.content },
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

    const handleIconChange = (event) => {
        setEventContent(prevState => ({ ...prevState, image_icon: event.target.files[0] }));
    };

    const handleEditFileChange = (eventId, event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            setEditFormFields((prevState) => ({
                ...prevState,
                [eventId]: {
                    ...prevState[eventId], // Preserve existing title & content
                    image_icon: file, // Update image field
                },
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', eventContent.title);
            formDataToSend.append('content', eventContent.content);
            if (eventContent.image_icon instanceof File) {
                formDataToSend.append('image_icon', eventContent.image_icon);
            }
            const res = await axios.post(`${apiBaseUrl}event_dropdowns.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(res.data);

            setTimeout(() => {
                setSubmitted(false);
            }, 2000);

            setEventContent({
                title: '',
                content: '',
                image_icon: null
            });
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    const handleEditSubmit = async (event, eventId) => {
        event.preventDefault();
        try {
            const formDataToSend = new FormData();
            console.log("formdata1", editFormFields[eventId]);
            console.log("formdata id", eventId);
            console.log("formdata title", editFormFields[eventId].title);
            console.log("formdata image_icon", editFormFields[eventId].image_icon);
            formDataToSend.append('id', eventId);
            formDataToSend.append('title', editFormFields[eventId].title);
            formDataToSend.append('content', editFormFields[eventId].content);
            if (editFormFields[eventId].image_icon instanceof File) {
                formDataToSend.append('image_icon', editFormFields[eventId].image_icon);
            }
            console.log("formdata", formDataToSend);

            const res = await axios.post(`${apiBaseUrl}event_dropdowns.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Edit successful:', res.data);

            // Update the local state with the edited event
            setEventDropdowns((prevEvents) =>
                prevEvents.map((ev) =>
                    ev.id === eventId
                        ? { ...ev, title: editFormFields[eventId].title, content: editFormFields[eventId].content }
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

    const fetchEventDropdowns = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}event_dropdowns.php`);
            setEventDropdowns(response.data);
        } catch (error) {
            console.error("Error fetching event dropdowns:", error);
        }
    };

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
            const res = await axios.get(`${apiBaseUrl}workshop_schedule.php?timestamp=${new Date().getTime()}`);
            if (res.data.image) {
                setWorkShopImage(res.data.image); // Store base64 image
            }
        } catch (error) {
            console.log("Error fetching image:", error);
        }
    };

    const handleDelete = async (id) => {
        console.log("id", id);
        const userConfirmed = window.confirm("Are you sure you want to delete this Dropdown Event?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            const res = await axios.delete(`${apiBaseUrl}event_dropdowns.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setEventDropdowns(prevEventDropdowns => prevEventDropdowns.filter(event => event.id !== id));
            } else {
                console.error(`Failed to delete the event. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting object ${id}:`, error);
        }
    }

    // Fetch image when component mounts
    useEffect(() => {
        fetchEventDropdowns();
        fetchImage();
    }, []);


    return (
        <div className='AdminPageContainer'>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>
            <p className='AdminPageTitle'>Drop Down Events for Summer of CS</p>
            <p className='AdminPageTitle'>Scroll Down to edit events</p>
            <p className='text-align-center'>This is the admin page to change the text in the "Summer Equity Sumposium" page drop down events.</p>
            <p className='text-align-center'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</p>

            <div className='AdminPageFormContainer' style={{ display: "flex", flexDirection: "column" }}>
                <p className='AdminPageTitle'>Add an Event:</p>
                <form onSubmit={handleSubmit} className="major-events-form" style={{ padding: '1%' }}>
                    Event Icon
                    <label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleIconChange}
                            className='major-events-form-field'
                        />
                    </label>
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
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{eventContent.content}</ReactMarkdown>
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
                {workShopImage && <img src={workShopImage} alt="Workshop Schedule" className='workshopimage' />}
            </div>

            <p className='AdminPageTitle'>Edit Events:</p>
            <div className='drop-down-container'>
                {eventDropdowns?.length > 0 && eventDropdowns.map(event => (
                    <div key={event.id} className='event-drop-down'>

                        <button className='event-drop-down-button'>
                            {event.image_icon && (
                                <img
                                    src={`data:image/jpeg;base64,${event.image_icon}`}
                                    alt={event.title}
                                    className="eventimage"
                                />)}
                            {/* <img className='eventimage' src={event.image} alt={event.title} /> */}
                            {openForms[event.id] ? (<span className='event-title'>{editFormFields[event.id]?.title || ''} <i className="arrow up"></i></span>) : (<span className='event-title'><ReactMarkdown rehypePlugins={[rehypeRaw]}>{event.title}</ReactMarkdown> <i className="arrow up"></i></span>)}
                        </button>
                        <div className='drop-down-button-text'>
                            {openForms[event.id] ? (<ReactMarkdown rehypePlugins={[rehypeRaw]}>{editFormFields[event.id]?.content || ''}</ReactMarkdown>) : (<ReactMarkdown rehypePlugins={[rehypeRaw]}>{event.content}</ReactMarkdown>)}
                            <button onClick={() => toggleForm(event.id, event)} className='EditSubmitButton'>
                                {openForms[event.id] ? 'Close Edit Form' : 'Edit'}
                            </button>
                            <button className='EditSubmitButton' onClick={() => handleDelete(event.id)}>Delete</button>
                        </div>

                        {openForms[event.id] && (
                            <form onSubmit={(e) => handleEditSubmit(e, event.id)} className="major-events-form" style={{ padding: '1%' }}>
                                Event Icon
                                <label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleEditFileChange(event.id, e)}
                                        className='major-events-form-field'
                                    />
                                </label>
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
