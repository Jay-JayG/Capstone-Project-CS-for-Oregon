import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
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
                <NavLink
                        to="/"
                        exact  // Use exact to ensure it only matches the exact URL
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                        activeClassName="activeNavLink"  // Apply the active class when the link is active
                        style={({ isActive, isPending, isTransitioning }) => ({
                            color: isActive ? "green" : "black",  // Apply red color when active
                            fontWeight: isActive ? "bold" : "",  // Apply bold font weight when active
                            // You can add more styles based on other states if needed
                        })}
                    >
                        HOME
                    </NavLink>
                </div>
                <div className="item3">
                    <NavLink
                        to="/about"
                        exact  // Use exact to ensure it only matches the exact URL
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                        activeClassName="activeNavLink"  // Apply the active class when the link is active
                        style={({ isActive, isPending, isTransitioning }) => ({
                            color: isActive ? "green" : "black",  // Apply red color when active
                            fontWeight: isActive ? "bold" : "",  // Apply bold font weight when active
                            // You can add more styles based on other states if needed
                        })}
                    >
                        ABOUT
                    </NavLink>
                </div>
                <div className="item4">
                    <NavLink
                        to="/educators"
                        exact  // Use exact to ensure it only matches the exact URL
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                        activeClassName="activeNavLink"  // Apply the active class when the link is active
                        style={({ isActive, isPending, isTransitioning }) => ({
                            color: isActive ? "green" : "black",  // Apply red color when active
                            fontWeight: isActive ? "bold" : "",  // Apply bold font weight when active
                            // You can add more styles based on other states if needed
                        })}
                    >
                        K-12 EDUCATORS
                    </NavLink>
                </div>
                <div className="item5">
                    <NavLink
                        to="/researchAndPolicy"
                        exact  // Use exact to ensure it only matches the exact URL
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                        activeClassName="activeNavLink"  // Apply the active class when the link is active
                        style={({ isActive, isPending, isTransitioning }) => ({
                            color: isActive ? "green" : "black",  // Apply red color when active
                            fontWeight: isActive ? "bold" : "",  // Apply bold font weight when active
                            // You can add more styles based on other states if needed
                        })}
                    >
                        RESEARCH & POLICY
                    </NavLink>
                </div>
                <div className="item5">
                    <NavLink
                        to="/summerOfCS"
                        exact  // Use exact to ensure it only matches the exact URL
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                                isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }
                        activeClassName="activeNavLink"  // Apply the active class when the link is active
                        style={({ isActive, isPending, isTransitioning }) => ({
                            color: isActive ? "green" : "black",  // Apply red color when active
                            fontWeight: isActive ? "bold" : "",  // Apply bold font weight when active
                            // You can add more styles based on other states if needed
                        })}
                    >
                        SUMMER EQUITY SYMPOSIUM
                    </NavLink>
                </div>
                <a href='#' className="item6" onClick={togglePopup}>
                    <img src={envelope} className="envelope" alt="Send" /> Contact Us
                </a>

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
                        <button onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            )}
        </nav>
    );
};