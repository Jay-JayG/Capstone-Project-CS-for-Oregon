import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CS_logo from '/src/assets/logo.png';
import envelope from '/src/assets/envelope.webp';
import './NavigationBar.css'

export default function NavigationBar() {
    const [showPopup, setShowPopup] = useState(false);

    // Toggle the popup's visibility
    const togglePopup = () => setShowPopup(!showPopup);

    // Close the popup if the user clicks outside of it
    const closePopup = (event) => {
        if (event.target.className === "popup-overlay") {
            setShowPopup(false);
        }
    };




    return (
        <nav className='NavigationBar'>
            <div className='NavLinksContainer'>
                <div className="item1">
                    <Link to={`/`} className="LogoContainer">
                        <img src={CS_logo} className="CS_logo" alt="logo" />
                        <div className="CSForOregon">CS For Oregon</div>
                    </Link>
                </div>
                <div className="item2">
                    <Link to={`/`} className="navLink">HOME</Link>
                </div>
                <div className="item3">
                    <Link to={`About`} className="navLink">ABOUT</Link>
                </div>
                <div className="item4">
                    <Link to={`Educators`} className="navLink">EDUCATORS, ADMINISTRATORS & COUNSELORS</Link>
                </div>
                <div className="item5">
                    <Link to={`SummerOfCS`} className="navLink">SUMMER OF CS</Link>
                </div>
                <a href='#' className="item6" onClick={togglePopup}>
                    <img src={envelope} className="envelope" alt="Send"/> Contact Us
                </a>
            </div>
            {showPopup && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content">
                        <p>Email: csfororegon@gmail.com</p>
                    </div>
                </div>
            )}
        </nav>
    );
};