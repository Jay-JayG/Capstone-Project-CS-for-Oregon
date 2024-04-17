import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import CS_logo from '../src/assets/logo.png';
import envelope from '../src/assets/envelope.webp';
import hamburger from '../src/assets/hamburger.webp';
import axios from 'axios';
import x from '../src/assets/x_icon.webp';
import './NavigationBar.css'

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

    const { name, title, employer, email, contact } = formData;

    // add or remove initial form fields here.
    const initialFormState = {
        name: '',
        title: '',
        employer: '',
        email: '',
        contact: ''
    };

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
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform form submission logic here
        if (!name || !title || !email || !contact) {
            setMissingFields(true);
            return;
        }
        setMissingFields(false);
        try {
            const res = await axios.post('http://localhost/backend/handle_form.php', formData);
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
            console.log('Error uploading object:', error)
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <nav className='NavigationBar'>
            <div className="OuterContainer">
                <div className="item1">
                    <Link to={`/`} className="LogoContainer">
                        <img src={CS_logo} className="CS_logo" alt="logo that links to homepage." />
                    </Link>
                    <div className="CSForOregon">CS for Oregon</div>
                </div>
                <div className="hamburger-icon" onClick={toggleNavLinks}>
                    <img src={showNavLinks ? x : hamburger} alt="showNavLinks ? 'Close Icon' : 'Hamburger Icon" />
                </div>
                <div className={`NavLinksContainer ${showNavLinks ? 'show' : ''}`}>
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
                    <div className="item5">
                        <NavLink
                            to="/researchAndPolicy"
                            className={({ isActive }) =>
                                isActive ? "active" : "inactive"
                            }
                        >
                            RESEARCH & POLICY
                        </NavLink>
                    </div>
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