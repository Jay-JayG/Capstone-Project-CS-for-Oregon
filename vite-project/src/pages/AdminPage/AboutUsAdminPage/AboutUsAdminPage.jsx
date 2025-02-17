import './AboutUsAdminPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

const Modal = React.memo(({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button className="modal-close-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
});

export default function AboutUsAdminPage() {

    const [authenticated, setAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}auth_check.php`, { withCredentials: true });
                if (response.data.status === 'authenticated') {
                    setAuthenticated(true);
                } else {
                    navigate('/admin'); // Redirect if not authenticated
                }
            } catch (error) {
                console.error("Authentication error", error);
                navigate('/admin'); // Redirect on error
            }
        };

        checkAuth();
    }, [navigate]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', title: '', headshot: null });
    const [editFormData, setEditFormData] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [profiles, setProfiles] = useState([]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditFormData({ name: '', title: '', headshot: null });
    };

    const handleEdit = (item) => {
        setEditFormData(item);
        setIsModalOpen(true);
    };

    const fetchProfiles = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}about_us.php?timestamp=${new Date().getTime()}`);
            setProfiles(response.data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    useEffect(() => {
        if (authenticated) {
            fetchProfiles();
        }
    }, [authenticated]);

    if (!authenticated) {
        return <div>Loading...</div>;
    }



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('headshot', formData.headshot);

            const res = await axios.post(`${apiBaseUrl}about_us.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('Uploaded:', res.data);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 200);
            setFormData({ name: '', title: '', headshot: null });
            fetchProfiles();  // Refresh profiles after upload
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const formDataToSend = new FormData();
            console.log("formdata", editFormData);
            formDataToSend.append('id', editFormData.id);
            formDataToSend.append('name', editFormData.name);
            formDataToSend.append('title', editFormData.title);

            if (editFormData.headshot instanceof File) {
                formDataToSend.append('headshot', editFormData.headshot);
            }
            console.log("edit fill", formDataToSend);
            const res = await axios.post(`${apiBaseUrl}about_us.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('Uploaded:', res.data);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 200);
            setEditFormData({ name: '', title: '', headshot: null });
            setIsModalOpen(false);
            fetchProfiles();  // Refresh profiles after upload
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleNameInputChange = (event) => {
        setFormData(prevState => ({ ...prevState, name: event.target.value }));
    };

    const handleTitleInputChange = (event) => {
        setFormData(prevState => ({ ...prevState, title: event.target.value }));
    };

    const handleFileChange = (event) => {
        setFormData(prevState => ({ ...prevState, headshot: event.target.files[0] }));
    };

    const handleEditNameInputChange = (event) => {
        setEditFormData(prevState => ({ ...prevState, name: event.target.value }));
    };

    const handleEditTitleInputChange = (event) => {
        setEditFormData(prevState => ({ ...prevState, title: event.target.value }));
    };

    const handleEditFileChange = (event) => {
        setEditFormData(prevState => ({ ...prevState, headshot: event.target.files[0] }));
    };

    const handleDelete = async (id) => {
        console.log("id", id);
        const userConfirmed = window.confirm("Are you sure you want to delete this Profile?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
        }
        try {
            const res = await axios.delete(`${apiBaseUrl}about_us.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== id));
            } else {
                console.error(`Failed to delete the event. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting object ${id}:`, error);
        }
    }

    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Event Card Admin Page</p>
            {submitted ? <p className='AdminPageSubmittedText'>Submitted</p> : null}
            <div className='AdminPageFormContainer'>
                <form className='AdminPageForm' onSubmit={handleSubmit}>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleNameInputChange}
                            value={formData.name}
                            className='AdminPageFormField'
                            placeholder='Name'
                            name='name'
                            cols={40}
                        />
                    </div>
                    <p></p>
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
                    <p></p>

                    <div className='AdminPageFormFieldDiv'>
                        Headshot Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className='AdminPageFormField'
                        />

                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitButton' type='submit'>
                            Submit
                        </button>
                    </div >
                </form>
            </div>

            {/* Display fetched profiles */}
            <div className="BoxesContainer">
                {profiles.length > 0 && Array.isArray(profiles) ? (
                    profiles.map((profile) => (
                        <div key={profile.id} className="ProfileCardWrapper">
                            <div className="AboutSectionBoxes">
                                <div className="ProfileCard">
                                    <p>{profile.name}</p>
                                    {profile.headshot && (
                                        <img
                                            src={`data:image/jpeg;base64,${profile.headshot}`}
                                            alt={profile.name}
                                            className="BoxImage"
                                        />
                                    )}
                                    <div className="BoxHeader">{profile.name}</div>
                                    <div className="BoxContent">
                                        <ReactMarkdown
                                            components={{
                                                a: ({ node, ...props }) => (
                                                    <a {...props} target="_blank" rel="noopener noreferrer">
                                                        {props.children}
                                                    </a>
                                                ),
                                            }}
                                        >
                                            {profile.title}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                            {/* Ensure delete button is outside of the "AboutSectionBoxes" */}
                            <button onClick={() => handleDelete(profile.id)}>Delete</button>
                            <button onClick={() => handleEdit(profile)}>Edit</button>
                        </div>
                    ))
                ) : (
                    <p>No profiles available.</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {editFormData && (
                    <div className='modal-container'>
                        <h2>Edit Profile</h2>
                        <div className="AboutSectionBoxes">
                            <div className="ProfileCard">
                                <p>{editFormData.name}</p>
                                {editFormData.headshot && (
                                    <img
                                        src={`data:image/jpeg;base64,${editFormData.headshot}`}
                                        alt={editFormData.name}
                                        className="BoxImage"
                                    />
                                )}
                                <div className="BoxHeader">{editFormData.name}</div>
                                <div className="BoxContent">
                                    <ReactMarkdown
                                        components={{
                                            a: ({ node, ...props }) => (
                                                <a {...props} target="_blank" rel="noopener noreferrer">
                                                    {props.children}
                                                </a>
                                            ),
                                        }}
                                    >
                                        {editFormData.title}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <form className='AdminPageForm' onSubmit={handleEditSubmit}>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleEditNameInputChange}
                            value={editFormData.name}
                            className='AdminPageFormField'
                            placeholder='Name'
                            name='name'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleEditTitleInputChange}
                            value={editFormData.title}
                            className='AdminPageFormField'
                            placeholder='Title'
                            name='title'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        Headshot Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditFileChange}
                            className='AdminPageFormField'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitButton' type='submit'>
                            Submit
                        </button>
                    </div >
                </form>
            </Modal>

        </div>
    )
}