import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify
import { NavLink, Link } from 'react-router-dom';
import './NavigationBarAdminPage.css'
import { useEventPages } from '/src/pages/AdminPages/MajorEventsAdminPage/EventPageContext';

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

export default function NavigationBarAdminPage() {

    const [navBarElements, setNavBarElements] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        parent: ''
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [editData, setEditData] = useState({
        title: '',
        link: '',
        parent: ''
    });
    const [showNavLinks, setShowNavLinks] = useState(false);
    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
        document.querySelector('.NavigationBar').classList.toggle('menu-expanded');
    };
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { eventPages } = useEventPages();
    const [loading, setLoading] = useState(true);

    const getNavBarElements = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}navigation_bar.php?timestamp=${new Date().getTime()}`);
            console.log(res.data);
            setNavBarElements(res.data);
            setLoading(false);
        } catch (error) {
            console.log('Error retrieving Navigation bar elements', error.res?.data || error.message)
        }
    }

    useEffect(() => {
        getNavBarElements();
        console.log(navBarElements);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}navigation_bar.php`, formData);
            console.log('Uploaded:', res.data);
            setFormData({
                title: '',
                link: '',
                parent: ''
            });
            getNavBarElements();  // Refresh profiles after upload
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`${apiBaseUrl}navigation_bar.php`, editData);
            console.log('Uploaded:', res.data);
            setStatusMessage("Updated successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
            setEditData({
                title: '',
                link: '',
                parent: ''
            });
            setIsModalOpen(false);
            getNavBarElements();
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
            const res = await axios.delete(`${apiBaseUrl}navigation_bar.php?id=${id}`);
            if (res.status === 200) {
                // Update local state immediately to remove the item
                setNavBarElements(prevResources => prevResources.filter(resource => resource.id !== id));
            } else {
                console.error(`Failed to delete Nav Bar Element. Status code: ${res.status}`);
            }
        } catch (error) {
            console.log(`Error deleting object ${id}:`, error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(formData);
    };

    const handleEditChange = (e) => {
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

    const groupedNavItems = Array.isArray(navBarElements) && navBarElements.length > 0
  ? navBarElements.reduce((acc, item) => {
      const parentId = item.parent != null && item.parent !== '' ? String(item.parent) : 'root';
      if (!acc[parentId]) acc[parentId] = [];
      acc[parentId].push(item);
      return acc;
    }, {})
  : {};

    return (
        <div className='AdminPageContainer-no-pad'>
            <Link to="/admin" className="admin-home-button">
                Go Back
            </Link>

            <div className='AdminPageTitle'>Navigation Bar Admin Page</div>
            <br />

            <div className='AdminPageFormContainer'>
                <form onSubmit={handleSubmit} className="major-events-form">
                    <span className='policy-admin'>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
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
                    Parent:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="parent"
                            value={formData.parent}
                            onChange={handleChange}
                            rows={1}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>


            </div>

            <div>Preview:</div>
            <nav className='NavigationBar'>
                <div className={`OuterContainer ${showNavLinks ? 'OuterContainerExpanded' : 'OuterContainer'}`}>
                    <nav className="NavLinksContainer">
                        {loading ? (
                            <p className="nav-status">Loading navigation items...</p>
                        ) : (
                            groupedNavItems["root"]?.map((item) => {
                                const children = groupedNavItems[item.id] || [];

                                return (
                                    <div key={item.id} className="nav-item">
                                        {children.length > 0 ? (
                                            <div className="dropdown">
                                                <NavLink to={item.link} className="nav-link">
                                                    {item.title}
                                                </NavLink>
                                                <div className="dropdown-menu">
                                                    {children.map((child) => (
                                                        <NavLink key={child.id} to={child.link} className="dropdown-item">
                                                            {child.title}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <NavLink to={item.link} className="nav-link">
                                                {item.title}
                                            </NavLink>
                                        )}
                                    </div>

                                );
                            })
                        )}
                    </nav>

                    <div className={`NavLinksContainer ${showNavLinks ? 'show' : ''}`} onClick={toggleNavLinks}>
                        {navBarElements.length > 0 && Array.isArray(navBarElements) ? (
                            navBarElements.map((item) => (<div key={item.id}>
                                <NavLink
                                    to={`${item.link}`}
                                    className={({ isActive }) =>
                                        isActive ? "active" : "inactive"
                                    }
                                >
                                    {item.title}
                                </NavLink>
                                <br />
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                            </div>
                            ))) : (<p>No Resources available.</p>)}



                    </div>
                </div>
            </nav>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {navBarElements && (
                    <div className='modal-container'>
                        <h2>Edit Nav Item</h2>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "active" : "inactive"
                            }
                        >
                            Home
                        </NavLink>
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
                    Parent:
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="parent"
                            value={formData.parent}
                            onChange={handleChange}
                            rows={1}
                            cols={200}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    {statusMessage && <div className='AdminPageTitle'>{statusMessage}</div>}
                </form>
            </Modal >

        </div>
    );
}