import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
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
<<<<<<< HEAD
                    <Link to={`/`} className="LogoContainer">
=======
                    <Link to={`/`} className="logo-container">
>>>>>>> d8e6cb098f230b261adf31e38f0897ce236e4369
                        <img src={CS_logo} className="CS_logo" alt="logo that links to homepage." />
                    </Link>
                    <div className="CSForOregon">CS for Oregon</div>
                </div>
<<<<<<< HEAD
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
            
                
=======
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
                            textDecoration: "none",
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
                {/* <a href='#' className="item6" onClick={togglePopup}>
                    <img src={envelope} className="envelope" alt="Send" /> Contact Us
                </a> */}
>>>>>>> d8e6cb098f230b261adf31e38f0897ce236e4369

            </div>

            {/* {showPopup && (
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
<<<<<<< HEAD
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
=======
            )} */}
>>>>>>> d8e6cb098f230b261adf31e38f0897ce236e4369
        </nav>
    );
};