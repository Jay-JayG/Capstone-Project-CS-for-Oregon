import React, { useState, useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import CS_logo from '../src/assets/logo.png';
import envelope from '../src/assets/envelope.webp';
import hamburger from '../src/assets/hamburger.webp';
import axios from 'axios';
import x from '../src/assets/x_icon.webp';
import './NavigationBar.css'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function NavigationBar() {
    const [showPopup, setShowPopup] = useState(false);
    const [showNavLinks, setShowNavLinks] = useState(false);
    const [missingFields, setMissingFields] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        employer: '',
        email: '',
        contact: ''
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

    const { name, title, employer, email, contact } = formData;

    // add or remove initial form fields here.
    const initialFormState = {
        name: '',
        title: '',
        employer: '',
        email: '',
        contact: ''
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 950);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const resetForm = () => {
        setFormData(initialFormState);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // Toggle the popup's visibility
    const togglePopup = () => setShowPopup(!showPopup);
    const toggleNavLinks = () => {
        setShowNavLinks(!showNavLinks);
        document.querySelector('.NavigationBar').classList.toggle('menu-expanded');
    };


    // Close the popup if the user clicks outside of it
    const closePopup = (event) => {
        if (event.target.className === "popup-overlay") {
            setShowPopup(false);
        }
    };
    const closeBtn = (event) => {
            setShowPopup(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform form submission logic here
        if (!name || !title || !email || !contact) {
            setMissingFields(true);
            return;
        }
        setMissingFields(false);
        try {
            const res = await axios.post(`${apiBaseUrl}handle_form.php`, formData);
            console.log('Server response:', res.data);

            if (res.data.success) {
                alert('Form submitted successfully!');
                resetForm(); // Reset form fields after successful submission
                setShowPopup(false); // Close the popup
            } else {
                //alert('Failed to submit form. Please try again.');
                resetForm(); // Reset form fields after successful submission
                setShowPopup(false); // Close the popup
            }
        } catch (error) {
            alert('Form submitted successfully!');
            console.log('Error uploading object:', error)
            setShowPopup(false);
            //alert('An error occurred. Please try again later.');
        }
    };

    return (
        <nav className='NavigationBar'>
            <div className={`OuterContainer ${showNavLinks ? 'OuterContainerExpanded' : 'OuterContainer'}`}>
                <div className="item1">
                    <Link to={`/`} className="LogoContainer">
                        <img src={CS_logo} className="CS_logo" alt="logo that links to homepage." />
                    </Link>
                    <div className="CSForOregon">CS for Oregon</div>
                </div>
                <div className="hamburger-icon" onClick={toggleNavLinks}>
                    <img src={showNavLinks ? x : hamburger} alt="showNavLinks ? 'Close Icon' : 'Hamburger Icon" />
                </div>
                <div className={`NavLinksContainer ${showNavLinks ? 'show' : ''}`} onClick={toggleNavLinks}>
                    <div className="item2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "active" : "inactive"
                            }
                        >
                            HOME
                        </NavLink>
                    </div>
                    <div className="item3">
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "active" : "inactive"
                            }
                        >
                            ABOUT
                        </NavLink>
                    </div>
                    <div className="item4">
                        <NavLink
                            to="/educators"
                            className={({ isActive }) =>
                                isActive ? "active" : "inactive"
                            }
                        >
                            K-12 EDUCATORS
                        </NavLink>
                    </div>
                    {/* Conditionally render based on isMobile */}
                    {isMobile ? (
                        <>
                            <div className="item-dropdown">
                                <NavLink to="/research" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>RESEARCH</NavLink>
                            </div>
                            <div className="item-dropdown">
                                <NavLink to="/researchAndPolicy" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>POLICY</NavLink>
                            </div>
                            <div className="item-dropdown">
                                <NavLink to="/news" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>NEWS & EVENTS</NavLink>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="item-dropdown">
                                <span className="dropdown">
                                    RESEARCH & POLICY
                                    <div className="dropdown-content">
                                        <NavLink to="/research" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>RESEARCH</NavLink>
                                        <NavLink to="/researchAndPolicy" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>POLICY</NavLink>
                                    </div>
                                </span>
                            </div>
                            <div className="item-dropdown">
                                <span className="dropdown">
                                    NEWS & EVENTS
                                    <div className="dropdown-content">
                                        <NavLink to="/news" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>NEWS</NavLink>
                                        <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>EVENTS</NavLink>
                                    </div>
                                </span>
                            </div>
                        </>
                    )}
                    <div className="item5">
                        <NavLink
                            to="/summerOfCS"
                            className={({ isActive }) =>
                                isActive ? "active" : "inactive"
                            }
                        >
                            SUMMER EQUITY SYMPOSIUM
                        </NavLink>
                    </div>
                    <a href='#' className="item6" onClick={togglePopup}>
                        <img src={envelope} className="envelope" alt="Send" /> Contact Us
                    </a>
                </div>
            </div>

            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={closeBtn}>
                        <img src={x} alt="Close" />
                    </button>
                        <h2>Contact Information</h2>
                        <div className="input-container">
                            <input type="text" id="name" name="name" value={name} onChange={handleInputChange} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-container">
                            <input type="text" id="title" name="title" value={title} onChange={handleInputChange} />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="input-container">
                            <input type="text" id="employer" name="employer" value={employer} onChange={handleInputChange} />
                            <label htmlFor="employer">Employer/Affiliation/Organization (optional)</label>
                        </div>
                        <div className="input-container">
                            <input type="text" id="email" name="email" value={email} onChange={handleInputChange} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-container">
                            <input type="text" id="contect" name="contact" value={contact} onChange={handleInputChange} />
                            <label htmlFor="contact">How can we help you?</label>
                        </div>
                        <div>
                            {missingFields && <p>Please fill all fields</p>}
                        </div>
                        <button onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            )}
        </nav>
    );
};