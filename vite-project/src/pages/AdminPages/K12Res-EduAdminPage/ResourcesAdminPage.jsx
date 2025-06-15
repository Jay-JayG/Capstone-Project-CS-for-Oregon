import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify
import { Link } from 'react-router-dom';

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

export default function ResourcesAdminPage() {

    // Pro-Dev and Credentialing
    // Our Mission Variables

    const [proDevAbove, setProDevAboveText] = useState("");
    const [proDevBelow, setProDevBelowText] = useState("");
    const [credentialing, setCredentialingText] = useState("");
    const [statusMessage, setStatusMessage] = useState('');
    const [mainButton, setMainButton] = useState({
        text: "",
        link: ""
    });

    const getAboutUsText = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}resources_text.php?timestamp=${new Date().getTime()}`);
            console.log(response.data);
            setProDevAboveText(response.data.proDevAbove);
            setProDevBelowText(response.data.proDevBelow);
            setCredentialingText(response.data.credentialing)
        } catch (error) {
            console.log('Error retrieving about us text', error.response?.data || error.message)
        }
    }

    const getMainButton = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}resources_button.php?timestamp=${new Date().getTime()}`);
            // console.log({response.data}, "response.data");
            setMainButton(response.data);
            // console.log(mainButton, "mainButton");
        } catch (error) {
            console.log('Error retrieving about us text', error.response?.data || error.message)
        }
    }
    useEffect(() => {
        getAboutUsText();
        getMainButton();
    }, []);

    const updateProDevAboveText = async (e) => {
        e.preventDefault();
        const dataToSend = {
            id: 1, // Fixed id value because about_us_text MySQL table has ony one entry/row.
            field: "proDevAbove",
            value: proDevAbove
        };
        try {
            const response = await axios.put(`${apiBaseUrl}resources_text.php`, dataToSend);
            setProDevAboveText(response.data.proDevAbove);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (error) {
            console.error('Error updating proDevAboveText text:', error);
        }
    }

    const updateMainButton = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiBaseUrl}resources_button.php`, mainButton);
            setMainButton(response.data);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (error) {
            console.error('Error updating proDevAboveText text:', error);
        }
    }

    const updateProDevBelowText = async (e) => {
        e.preventDefault();
        const dataToSend = {
            id: 1, // Fixed id value because about_us_text MySQL table has ony one entry/row.
            field: "proDevBelow",
            value: proDevBelow
        };
        try {
            const response = await axios.put(`${apiBaseUrl}resources_text.php`, dataToSend);
            setProDevBelowText(response.data.proDevBelow);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (error) {
            console.error('Error updating proDevBelowText text:', error);
        }
    }

    const updateCredentialingText = async (e) => {
        e.preventDefault();
        const dataToSend = {
            id: 1, // Fixed id value because about_us_text MySQL table has ony one entry/row.
            field: "credentialing",
            value: credentialing
        };
        try {
            const response = await axios.put(`${apiBaseUrl}resources_text.php`, dataToSend);
            setCredentialingText(response.data.credentialing);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
        } catch (error) {
            console.error('Error updating credentialing text:', error.response?.data || error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "proDevAbove") {
            setProDevAboveText(value);
        } else if (name === "proDevBelow") {
            setProDevBelowText(value);
        } else if (name === "credentialing") {
            setCredentialingText(value);
        } else if (name === "text") {
            setMainButton(prev => ({
                ...prev,
                [name]: value
            }));
        } else if (name === "link") {
            setMainButton(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };



    // Teaching & Learning Resources

    const [resources, setResources] = useState([]);
    const [formData, setFormData] = useState({ logo: null, resource_name: '', url_link: '' });
    const [previewImage, setPreviewImage] = useState(null);
    const [editData, setEditData] = useState({ logo: null, resource_name: '', url_link: '' }); // Data from the edit modal to update entries already in the database
    const [isModalOpen, setIsModalOpen] = useState(false);


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

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('resource_name', editData.resource_name);
            formDataToSend.append('url_link', editData.url_link);

            if (editData.logo instanceof File) {
                formDataToSend.append('logo', editData.logo);
            }

            formDataToSend.append('id', editData.id);

            const res = await axios.post(`${apiBaseUrl}resources.php`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Uploaded:', res.data);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
            setEditData({ logo: null, resource_name: '', url_link: '' });
            setIsModalOpen(false);
            fetchResources();
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

    const handleEditChange = (e) => {
        const { name, type, value, files } = e.target;

        const newValue = type === 'file' ? files[0] : value;

        setEditData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditData({});
    };

    const handleEdit = (item) => {
        setEditData(item);
        setIsModalOpen(true);
    };

    return (
        <div className='AdminPageContainer'>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>

            <p className='AdminPageTitle'>Professional Development Box Before Button</p>
            <div className='AdminPageFormContainer'>
                <form onSubmit={updateProDevAboveText} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="proDevAbove"
                            value={proDevAbove}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </div>

            <p className='AdminPageTitle'>Main Button</p>
            <div className='AdminPageFormContainer'>
                <form onSubmit={updateMainButton} className="major-events-form">
                    Button Text:
                    <textarea
                        className='major-events-form-field'
                        name="text" // Be careful of using "text" for anything else, this "text" is passed as name to the handleChange function.
                        value={mainButton.text}
                        onChange={handleChange}
                        required
                        rows={2}
                        cols={200}
                    />
                    Button Link<br />
                    Note if the link points to a page on this site remove https://csfororegon.org or csfororegon.org from the front of it, e.g., https://csfororegon.org/summerOfCS {'=>'} /summerOfCS
                    <textarea
                        className='major-events-form-field'
                        name="link" // Be careful of using "link" for anything else, this "link" is passed as name to the handleChange function.
                        value={mainButton.link}
                        onChange={handleChange}
                        required
                        rows={2}
                        cols={200}
                    />
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </div>

            <p className='AdminPageTitle'>Professional Development Box After Button</p>
            <div className='AdminPageFormContainer'>
                <form onSubmit={updateProDevBelowText} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="proDevBelow"
                            value={proDevBelow}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </div>

            <div className="EducatorsContainer1">
                <div className="EducatorsSection1Container">
                    preview:
                    <h2 className="EducatorsHeading">Professional Development</h2>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            a: ({ node, ...props }) => (
                                <a {...props} target="_blank" rel="noopener noreferrer">
                                    {props.children}
                                </a>
                            ),
                        }}
                        className="Section1Text"
                    >
                        {proDevAbove}
                    </ReactMarkdown>
                    <div className="EducatorsSection2Container">
                        <Link to={mainButton.link} className="EducatorsHeading2">{mainButton.text}</Link>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer">
                                        {props.children}
                                    </a>
                                ),
                            }}
                            className="Section1Text"
                        >
                            {proDevBelow}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            <p className='AdminPageTitle'>Credentialing Box</p>
            <div className='AdminPageFormContainer'>
                <form onSubmit={updateCredentialingText} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="credentialing"
                            value={credentialing}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </div>

            <div className="EducatorsContaier3">
                <div className='EducatorsSection3Container'>
                    preview:
                    <h2 className="EducatorsHeading3">Credentialing</h2>
                    <div className='Section3TextContaier'>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer">
                                        {props.children}
                                    </a>
                                ),
                            }}
                            className="Section1Text"
                        >
                            {credentialing}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            <p className='AdminPageTitle'>Add Teaching & Learning Resources</p>
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

            <div className='MediaCard'>
                <a className='MediaLink' href={formData.url_link} target="_blank">
                    <img className='MediaImage'
                        src={previewImage || formData.logo}
                        alt='No Resource Logo/Image Provided' />
                </a>
                <a className='MediaLink' href={formData.url_link} target="_blank">{formData.resource_name}</a>
            </div>

            <p className='AdminPageTitle'>Teaching & Learning Resources</p>
            <div className="MediaSubContainer1">
                <div className="MediaGrid">
                    {resources.length > 0 && Array.isArray(resources) ? (
                        resources.map((resource) => (
                            <div className="MediaCard" key={resource.id}>
                                <a className='MediaLink' href={resource.url_link} target="_blank" rel="noopener noreferrer">
                                    <img className='MediaImage' src={`data:image/jpeg;base64,${resource.logo}`} alt={resource.resource_name} />
                                </a>
                                <a className='MediaLink' href={resource.url_link} target="_blank">{resource.resource_name}</a>
                                <div>
                                    <button onClick={() => handleEdit(resource)}>Edit</button>
                                    <button onClick={() => handleDelete(resource.id)}>Delete</button>
                                </div>
                            </div>))) : (<p>No Resources available.</p>)}
                </div>
            </div>

            {/* Edit Form*/}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {resources && (
                    <div className="MediaGrid">
                        <div className='MediaCard'>
                            <a className='MediaLink' href={editData.url_link} target="_blank">
                                <img className='MediaImage' src={`data:image/jpeg;base64,${editData.logo}`} alt='Computer Science Education Statewide Implementation Plan Photo' />
                            </a>
                            <a className='MediaLink' href={editData.url_link} target="_blank">{editData.resource_name}</a>
                        </div>
                    </div>
                )}
                <form onSubmit={handleEditSubmit} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    Image Upload:
                    <label>
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleEditChange}
                            className="major-events-form-field"
                        />
                    </label>
                    Link Text:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="resource_name"
                            value={editData.resource_name}
                            onChange={handleEditChange}
                            required
                            rows={2}
                            cols={200}
                        />
                    </label>
                    Link URL:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="url_link"
                            value={editData.url_link}
                            onChange={handleEditChange}
                            required
                            rows={1}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </Modal >

        </div>
    )
}
