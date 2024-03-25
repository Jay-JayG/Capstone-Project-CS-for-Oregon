import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CS_logo from '../src/assets/logo.png';
import envelope from '../src/assets/envelope.webp';
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
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log("Form submitted");
        // Close the popup after submission
        setShowPopup(false);
      };




    return (
        <nav className='NavigationBar'>
            <div className='NavLinksContainer'>
                <div className="item1">
                    <Link to={`/`} className="logo-container">
                        <img src={CS_logo} className="CS_logo" alt="logo that links to homepage." />
                    </Link>
                    <div className="CSForOregon">CS for Oregon</div>
                </div>
                <div className="item2">
                    <Link to={`/`} className="navLink">HOME</Link>
                </div>
                <div className="item3">
                    <Link to="/about" className="navLink">ABOUT</Link>
                </div>
                <div className="item4">
                    <Link to={`/educators`} className="navLink">K-12 EDUCATORS</Link>
                </div>
                <div className="item5">
                    <Link to={`/researchAndPolicy`} className="navLink">RESEARCH & POLICY</Link>
                </div>
                <div className="item5">
                    <Link to={`/summerOfCS`} className="navLink">SUMMER EQUITY SYMPOSIUM</Link>
                </div>
            </div>
        </nav>
    );
};