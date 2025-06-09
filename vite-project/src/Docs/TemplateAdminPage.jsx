import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify
import { NavLink, Link } from 'react-router-dom';
import './TemplateAdminPage.css'

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

export default function TemplateAdminPage() {

    const [elements, setElements] = useState([]); // Data Retrieved from database to display
    const [formData, setFormData] = useState({}); // Data from the main form to post new entries to the database
    const [statusMessage, setStatusMessage] = useState('');
    const [editData, setEditData] = useState({}); // Data from the edit modal to update entries already in the database

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getElements = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}template_admin_page.php?timestamp=${new Date().getTime()}`); // Change php file name
            console.log(res.data);
            setElements(res.data); // Change to setElements equivalent
        } catch (error) {
            console.log('Error retrieving Navigation bar elements', error.res?.data || error.message)
        }
    }

    useEffect(() => {
        getElements(); // Change to getElements equivalent
        console.log(elements);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}template_admin_page.php`, formData);
            console.log('Uploaded:', res.data);
            setFormData({
                title: '',
                link: '',
            }); // Resets the main form to allow new entries to be posted to the database | Requires the fields of the formData object to be explicitly cleared.
            getElements();  // Refresh profiles after upload | Change to getElements equivalent
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`${apiBaseUrl}template_admin_page.php`, editData); // Change php file name
            console.log('Uploaded:', res.data);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
            setEditData({
                title: '',
                link: '',
            });  // Resets the edit form to allow the edit variable to be populated by the fields of whatever item is selected to edit next. | Requires the fields of the formData object to be explicitly cleared.
            setIsModalOpen(false); // Closes the edit modal
            getElements(); // Gets new changes
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
            const res = await axios.delete(`${apiBaseUrl}template_admin_page.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setElements(prevResources => prevResources.filter(resource => resource.id !== id)); // Change to setElements equivalent | filters out deleted items without needing a refresh or get request to display current database state.
            } else {
                console.error(`Failed to delete Item. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting object ${id}:`, error);
        }
    }

    const handleChange = (e) => { // Handles main form text changes
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(formData);
    };

    const handleEditChange = (e) => { // Handles edit form text changes
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(formData);
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
        <div className='AdminPageContainer-no-pad'>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>

            <div className='AdminPageTitle'>Template Admin Page</div>
            <br />
            {/* Main Form */}
            <div className='AdminPageFormContainer'>
                <form onSubmit={handleSubmit} className="major-events-form">
                    {/* <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span> */}
                    Title:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            rows={2}
                            cols={200}
                        />
                    </label>
                    Link:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                            rows={1}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>


            </div>

            <div>Preview:</div>
            <div >
                <div className="resource-container">
                    {elements.length > 0 && Array.isArray(elements) ? (
                        elements.map((item) => (
                            <div key={item.id} className="resource-item">
                                <div>{item.title}</div>
                                <div>{item.link}</div>
                                <br />
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                            </div>
                        ))
                    ) : (
                        <p>No Resources available.</p>
                    )}
                </div>

                {/* Edit Form*/}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {elements && (
                        <div className="resource-container">
                            <h2>Edit Nav Item</h2>
                            <div className="resource-item">
                                <div>{editData.title}</div>
                                <div>{editData.link}</div>
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleEditSubmit} className="major-events-form">
                        <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                        Title:
                        <label>
                            <textarea
                                className='major-events-form-field'
                                name="title"
                                value={editData.title}
                                onChange={handleEditChange}
                                required
                                rows={2}
                                cols={200}
                            />
                        </label>
                        Link:
                        <label>
                            <textarea
                                className='major-events-form-field'
                                name="link"
                                value={editData.link}
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
        </div>
    );
}