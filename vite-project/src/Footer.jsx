import React from 'react';
import logo from './assets/logo.png';
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='logo-and-links'>
                    <Link to={`/`} className="LogoContainer">
                        <img src={logo} className="logo-image" alt="logo" />
                        <div className="NavBarCSForOregon">CS for Oregon</div>
                    </Link>
                    <div className='footer-links'>
                        <nav className="footer-textbox">
                            <ul>
                                <li><Link to={`/`}>Home</Link></li>
                                <li><Link to={`About`}>About</Link></li>
                                <li><Link to={`Educators`}>K-12 Educators</Link></li>
                                <li><Link to={`SummerOfCS`}>Summer Equity Symposium</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div>
                <p className='footer-copyright'>&copy; {new Date().getFullYear()} COPYRIGHT CS FOR OREGON – ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
}

export default Footer;