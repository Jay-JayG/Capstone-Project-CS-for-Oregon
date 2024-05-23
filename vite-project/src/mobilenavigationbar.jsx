{/* <nav className='NavigationBar'>
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
                    <div className="item-dropdown">
                        <span className="dropdown">
                            RESEARCH & POLICY
                            <div className="dropdown-content">
                                <NavLink
                                    to="/research"
                                    className={({ isActive }) =>
                                        isActive ? "active" : "inactive"
                                    }
                                >
                                    RESEARCH
                                </NavLink>
                                
                                <NavLink
                                    to="/researchAndPolicy"
                                    className={({ isActive }) =>
                                        isActive ? "active" : "inactive"
                                    }
                                >
                                    POLICY
                                </NavLink>
                            </div>
                        </span>
                    </div>
                    <div className="item-dropdown">
                        <span className="dropdown">
                            NEWS & EVENTS
                            <div className="dropdown-content">
                                <NavLink
                                    to="/news"
                                    className={({ isActive }) =>
                                        isActive ? "active" : "inactive"
                                    }
                                >
                                    NEWS
                                </NavLink>
                                
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        isActive ? "active" : "inactive"
                                    }
                                >
                                    EVENTS
                                </NavLink>
                            </div>
                        </span>
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
        </nav> */}