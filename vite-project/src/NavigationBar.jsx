import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CS_logo from '../src/assets/logo.png';
import envelope from '../src/assets/envelope.webp';
import hamburger from '../src/assets/hamburger.webp';
import './NavigationBar.css'

export default function NavigationBar() {
    const [showPopup, setShowPopup] = useState(false);
    const [showNavLinks, setShowNavLinks] = useState(false);

    // Toggle the popup's visibility
    const togglePopup = () => setShowPopup(!showPopup);
    const toggleNavLinks = () => setShowNavLinks(!showNavLinks);


    // Close the popup if the user clicks outside of it
    const closePopup = (event) => {
        if (event.target.className === "popup-overlay") {
            setShowPopup(false);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log("Form submitted");
        // Close the popup after submission
        setShowPopup(false);
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
                    <img src={hamburger} alt="Hamburger Icon" />
                </div>
                <div className={`NavLinksContainer ${showNavLinks ? 'show' : ''}`}>
                    <div className="item2">
                        <Link to={`/`} className="navLink">HOME</Link>
                    </div>
                    <div className="item3">
                        <Link to="/about" className="navLink">ABOUT</Link>
                    </div>
                    <div className="item4">
                        <Link to={`/educators`} className="navLink">EDUCATORS, ADMINISTRATORS & COUNSELORS</Link>
                    </div>
                    <div className="item5">
                        <Link to={`/researchAndPolicy`} className="navLink">RESEARCH & POLICY</Link>
                    </div>
                    <div className="item5">
                        <Link to={`/summerOfCS`} className="navLink">SUMMER EQUITY SYMPOSIUM</Link>
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
                    <input type="text" id="name" name="name" required />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-container">
                    <input type="text" id="title" name="title" required />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="input-container">
                    <input type="text" id="employer" name="employer" required />
                    <label htmlFor="employer">Employer</label>
                </div>
                <div className="input-container">
                    <input type="email" id="email" name="email" required />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-container">
                    <input type="reason" id="reason" name="reason" required />
                    <label htmlFor="email">Reason for Contact</label>
                </div>
                <button onClick={handleSubmit}>Send</button>
                </div>
            </div>
            )}
        </nav>
    );
};