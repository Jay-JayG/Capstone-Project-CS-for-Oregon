import './AboutUsAdminPage.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
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
    const [statusMessage, setStatusMessage] = useState('');
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


    // About Us Profiles Variables

    const [isModalOpen, setIsModalOpen] = useState(false); // Edit profile box open/close variable
    const [formData, setFormData] = useState({ name: '', title: '', headshot: null });
    const [editFormData, setEditFormData] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [profiles, setProfiles] = useState([]);

    // Our Mission Variables

    const [ourMissionText, setOurMissionText] = useState(""); // database equivalent is our_mission
    const [ourValuesText, setOurValuesText] = useState(""); // database equivalent is our_values

    useEffect(() => {
        const getAboutUsText = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}about_us_our_mission.php?timestamp=${new Date().getTime()}`);
                console.log(response.data);
                setOurMissionText(response.data.our_mission);
                setOurValuesText(response.data.our_values);
            } catch (error) {
                console.log('Error retrieving about us text', error.response?.data || error.message)
            }
        }
        getAboutUsText();
    }, []);

    const updateOurMissionText = async (e) => {
        e.preventDefault();
        const dataToSend = {
            id: 1, // Fixed id value because about_us_text MySQL table has ony one entry/row.
            field: "our_mission",
            value: ourMissionText
        };
        try {
            const response = await axios.put(`${apiBaseUrl}about_us_our_mission.php`, dataToSend);
            setOurMissionText(response.data.our_mission);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (error) {
            console.error('Error updating our mission text:', error);
        }
    }

    const updateOurValuesText = async (e) => {
        e.preventDefault();
        const dataToSend = {
            id: 1, // Fixed id value because about_us_text MySQL table has ony one entry/row.
            field: "our_values",
            value: ourValuesText
        };
        try {
            const response = await axios.put(`${apiBaseUrl}about_us_our_mission.php`, dataToSend);
            setOurValuesText(response.data.our_values);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (error) {
            console.error('Error updating our values text:', error.response?.data || error.message);
        }
    }


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "ourMission") {
            setOurMissionText(value);
        } else if (name === "ourValues") {
            setOurValuesText(value);
        }
        console.log(ourMissionText)
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
        <div className=''>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>
            <p className='AdminPageTitle'>Our Mission Box</p>
            <div className='AdminPageFormContainer'>
                <form onSubmit={updateOurMissionText} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="ourMission"
                            value={ourMissionText}
                            onChange={handleChange}
                            required
                            rows={20}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>

            </div>
            <div id="main-content">
                <div className={'Background'}>
                    <div className={'TopPageBox'}>
                        Preview:
                        <p className="PolicyHeader">Our Mission</p>
                        <div className={'AboutSectionHeader'}>
                            <div className='AboutSectionText'>
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
                                    {ourMissionText}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className='AdminPageTitle'>Our Values Box</p>
            <div className='AdminPageFormContainer'>
                <form onSubmit={updateOurValuesText} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="ourValues"
                            value={ourValuesText}
                            onChange={handleChange}
                            required
                            rows={20}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </div>

            <div className='OurValuesBox'>
                <p className="AboutSectionHeader"> Our Values</p>
                <ul className='AboutSectionText'>
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
                        {ourValuesText}
                    </ReactMarkdown>
                </ul>
            </div>

            <p className='AdminPageTitle'>About Us Profiles</p>
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
                {profiles && profiles.length > 0 && Array.isArray(profiles) ? (
                    [...profiles]
                        .sort((a, b) => {
                            const aLastName = a.name.split(' ').slice(-1)[0].toLowerCase();
                            const bLastName = b.name.split(' ').slice(-1)[0].toLowerCase();
                            return aLastName.localeCompare(bLastName);
                        }).map((profile) => (
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
                                                rehypePlugins={[rehypeRaw]} >
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
                    <p>Loading profiles, please wait...</p>
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