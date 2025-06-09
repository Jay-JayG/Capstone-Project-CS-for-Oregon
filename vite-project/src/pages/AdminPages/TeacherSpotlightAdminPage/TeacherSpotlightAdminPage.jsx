import React from 'react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import { Link } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
import '../../AdminHomePage/AdminHomeButton.css'

export default function SpotlightAdminPage() {

    const [spotlightContent, setSpotlightContent] = useState(
        {
            title: '',
            text: '',
            image: null
        }
    );

    const [openForms, setOpenForms] = useState({}); // Tracks which forms are open
    const [editFormFields, setEditFormFields] = useState({}); // Tracks current form values

    const toggleForm = (eventId, spotlight) => {
        setOpenForms((prev) => ({
            ...prev,
            [eventId]: !prev[eventId], // Toggle the open/closed state
        }));

        if (!openForms[eventId]) {
            // Prefill the form fields if opening the form
            setEditFormFields((prev) => ({
                ...prev,
                [eventId]: { id: eventId, title: spotlight.title, text: spotlight.text },
            }));
        }
    };

    const handleFieldChange = (eventId, field, value) => {
        setEditFormFields((prev) => ({
            ...prev,
            [eventId]: { ...prev[eventId], [field]: value },
        }));
    };

    const [spotlights, setSpotlights] = useState([]);
    console.log("provider", spotlightContent);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSpotlightContent((prevContent) => ({
            ...prevContent,
            [name]: value,
        }));
        console.log(spotlightContent)
    };

    const handleIconChange = (event) => {
        setSpotlightContent(prevState => ({ ...prevState, image: event.target.files[0] }));
    };

    const handleEditFileChange = (eventId, event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            setEditFormFields((prevState) => ({
                ...prevState,
                [eventId]: {
                    ...prevState[eventId], // Preserve existing title & text
                    image: file, // Update image field
                },
            }));
        }
    };

    const handleSubmit = async (spotlight) => {
        spotlight.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', spotlightContent.title);
            formDataToSend.append('text', spotlightContent.text);
            if (spotlightContent.image instanceof File) {
                formDataToSend.append('image', spotlightContent.image);
            }
            const res = await axios.post(`${apiBaseUrl}spotlight.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(res.data);

            // setTimeout(() => {
            //     setSubmitted(false);
            // }, 2000);

            setSpotlightContent({
                title: '',
                text: '',
                image: null
            });
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    const handleEditSubmit = async (spotlight, eventId) => {
        spotlight.preventDefault();
        try {
            const formDataToSend = new FormData();
            console.log("formdata1", editFormFields[eventId]);
            console.log("formdata id", eventId);
            console.log("formdata image", editFormFields[eventId].image);
            formDataToSend.append('id', eventId);
            formDataToSend.append('title', editFormFields[eventId].title);
            formDataToSend.append('text', editFormFields[eventId].text);
            if (editFormFields[eventId].image instanceof File) {
                formDataToSend.append('image', editFormFields[eventId].image);
            }
            console.log("formdata", formDataToSend);

            const res = await axios.post(`${apiBaseUrl}spotlight.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Edit successful:', res.data);

            // Update the local state with the edited spotlight
            setSpotlights((prevSpotlights) =>
                prevSpotlights.map((ev) =>
                    ev.id === eventId
                        ? { ...ev, title: editFormFields[eventId].title, text: editFormFields[eventId].text }
                        : ev
                )
            );

            // Close the form after submission
            setOpenForms((prev) => ({
                ...prev,
                [eventId]: false,
            }));

        } catch (error) {
            console.error('Error submitting edited spotlight:', error);
        }
    };

    const getSpotlights = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}spotlight.php?timestamp=${new Date().getTime()}`);
            setSpotlights(response.data);
        } catch (error) {
            console.error("Error fetching spotlight dropdowns:", error);
        }
    };

    // Fetch image when component mounts
    useEffect(() => {
        getSpotlights();
    }, []);

    const handleDelete = async (id) => {
        console.log("id", id);
        const userConfirmed = window.confirm("Are you sure you want to delete this Spotlight Profile?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            const res = await axios.delete(`${apiBaseUrl}spotlight.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setSpotlights(prevSpotlights => prevSpotlights.filter(spotlight => spotlight.id !== id));
            } else {
                console.error(`Failed to delete the spotlight. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting object ${id}:`, error);
        }
    }


    return (
        <div className='AdminPageContainer'>

            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>

            <p className='AdminPageTitle'>Teacher Spotlight Carousel Admin Page</p>
            <p className='AdminPageTitle'>Scroll Down to edit Spotlight slides</p>
            <p className='text-align-center'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</p>

            <div className='AdminPageFormContainer' style={{ display: "flex", flexDirection: "column" }}>
                <p className='AdminPageTitle'>Add a Spotlight Slide:</p>
                <form onSubmit={handleSubmit} className="major-events-form" style={{ padding: '1%' }}>
                    Teacher Headshot Image
                    <label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleIconChange}
                            className='major-events-form-field'
                        />
                    </label>
                    Slide Content
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="title"
                            value={spotlightContent.title}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={100}
                        />
                    </label>
                    Spotlight Content
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="text"
                            value={spotlightContent.text}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={100}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {/* Preview:

            <div className="slider-outer-container">

                <div className='slider-container'>
                    {spotlightContent.image && (
                        <img
                            src={`data:image/jpeg;base64,${spotlightContent.image}`}
                            // alt={spotlight.title}
                            className="slider-image"
                        />)}
                    <h3>{spotlightContent.text}</h3>
                </div>
            </div> */}

            <p className='AdminPageTitle'>Edit Spotlights:</p>
            <div className="slider-outer-container">
                {spotlights?.length > 0 && spotlights.map(spotlight => (
                    <div key={spotlight.id} className='spotlight-drop-down'>

                        <div className="slider-container">
                            {spotlight.image && (
                                <img
                                    src={`data:image/jpeg;base64,${spotlight.image}`}
                                    // alt={spotlight.title}
                                    className="slider-image"
                                />)}
                            <div className="slide-content-container">
                                <div className="slide-title" >
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                        {spotlight.title}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* <p><ReactMarkdown>{spotlight.text}</ReactMarkdown></p> */}
                            {/* <img className='eventimage' src={spotlight.image} alt={spotlight.title} /> */}

                        </div>

                        <div className='drop-down-button-text'>
                            <button onClick={() => toggleForm(spotlight.id, spotlight)} className='EditSubmitButton'>
                                {openForms[spotlight.id] ? 'Close Edit Form' : 'Edit'}
                            </button>
                            <button className='EditSubmitButton' onClick={() => handleDelete(spotlight.id)}>Delete</button>
                        </div>

                        {openForms[spotlight.id] && (
                            <form onSubmit={(e) => handleEditSubmit(e, spotlight.id)} className="major-events-form" style={{ padding: '1%' }}>
                                Teacher Headshot Image
                                <label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleEditFileChange(spotlight.id, e)}
                                        className='major-events-form-field'
                                    />
                                </label>
                                Slide Content
                                <label>
                                    <textarea
                                        className='major-events-form-field'
                                        name="title"
                                        value={editFormFields[spotlight.id]?.title || ''}
                                        onChange={(e) => handleFieldChange(spotlight.id, 'title', e.target.value)}
                                        required
                                        rows={10}
                                        cols={100}
                                    />
                                </label>
                                Slide Content
                                <label>
                                    <textarea
                                        className='major-events-form-field'
                                        name="text"
                                        value={editFormFields[spotlight.id]?.text || ''}
                                        onChange={(e) => handleFieldChange(spotlight.id, 'text', e.target.value)}
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
            </div>
        </div>
    );
}
