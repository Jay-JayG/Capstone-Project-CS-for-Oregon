import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function ResourcesAdminPage() {

    const [formData, setFormData] = useState({ logo: null, resource_name: '', url_link: '' });
    const [resources, setResources] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);

    const handleNameInputChange = (event) => {
        setFormData(prevState => ({ ...prevState, resource_name: event.target.value }));
    };

    const handleTitleInputChange = (event) => {
        setFormData(prevState => ({ ...prevState, url_link: event.target.value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prevState => ({ ...prevState, logo: file }));
            setPreviewImage(URL.createObjectURL(file)); // Create preview URL
        }
    };

    const fetchResources = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}resources.php?timestamp=${new Date().getTime()}`);
            setResources(response.data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('resource_name', formData.resource_name);
            formDataToSend.append('url_link', formData.url_link);
            formDataToSend.append('logo', formData.logo);

            const res = await axios.post(`${apiBaseUrl}resources.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('Uploaded:', res.data);
            setFormData({ logo: null, resource_name: '', url_link: '' });
            fetchResources();  // Refresh profiles after upload
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleDelete = async (id) => {
        console.log("id", id);
        const userConfirmed = window.confirm("Are you sure you want to delete this Resource?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            const res = await axios.delete(`${apiBaseUrl}resources.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setResources(prevResources => prevResources.filter(resource => resource.id !== id));
            } else {
                console.error(`Failed to delete the event. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting object ${id}:`, error);
        }
    }

    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Resouce Admin Page</p>
            {/* {submitted ? <p className='AdminPageSubmittedText'>Submitted</p> : null} */}
            <div className='AdminPageFormContainer'>
                <form className='AdminPageForm' onSubmit={handleSubmit}>

                    <div className='AdminPageFormFieldDiv'>
                        Resource Logo/Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className='AdminPageFormField'
                        />
                    </div>
                    <p></p>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleNameInputChange}
                            value={formData.resource_name}
                            className='AdminPageFormField'
                            placeholder='Resource Name'
                            name='resource_name'
                            cols={55}
                        />
                    </div>
                    <p></p>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleTitleInputChange}
                            value={formData.url_link}
                            className='AdminPageFormField'
                            placeholder='URL link'
                            name='url_link'
                            cols={55}
                        />
                    </div>
                    <p></p>

                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitButton' type='submit'>
                            Submit
                        </button>
                    </div >
                </form>


            </div>
            <br />
            <br />
            <p className='AdminPageTitle'>Preview Resouce</p>

            <div className='Media1_1Container'>
                <a className='Media1Link1' href={formData.url_link} target="_blank">
                    <img className='CSEdu'
                        src={previewImage || formData.logo}
                        alt='No Resource Logo/Image Provided' />
                </a>
                <a className='Media1Link1' href={formData.url_link} target="_blank">{formData.resource_name}</a>
            </div>

            <p className='AdminPageTitle'>Teaching & Learning Resources</p>
            <div className="MediaSubContainer1">
                <div className="Media1">
                    {resources.length > 0 && Array.isArray(resources) ? (
                        resources.map((resource) => (
                            <div key={resource.id} className='Media1_1Container'>
                                <a className='Media1Link1' href={resource.url_link} target="_blank">
                                    <img className='CSEdu' src={`data:image/jpeg;base64,${resource.logo}`} alt='Computer Science Education Statewide Implementation Plan Photo' />
                                </a>
                                <a className='Media1Link1' href={resource.url_link} target="_blank">{resource.resource_name}</a>
                                <button onClick={() => handleDelete(resource.id)}>Delete</button>
                            </div>))) : (<p>No Resources available.</p>)}
                </div>
            </div>
        </div>
    )
}
