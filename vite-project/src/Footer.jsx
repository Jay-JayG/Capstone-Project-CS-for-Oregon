import React from 'react';
import logo from './assets/logo.png';
import sendicon from './assets/sendicon.webp';
import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <h1 className='footer-textbox footer-textbox-left'>CS For All In Oregon</h1>
            <img className='logo-image' src={logo} alt='logo' />

            <div className='top-right-div'>
                <div className='footer-links'>
                    <nav className='footer-textbox'>
                        <ul>
                            <li><a href='#'>Accessibility</a></li>
                            <li><a href='#'>Private Policy</a></li>
                            <li><a href='#'>Contact Us</a></li>
                            <li><a href='#'>Media</a></li>
                        </ul>
                    </nav>
                </div>

                <div className='join-mailing-list'>
                    <h2 className='footer-textbox'>Join Our Mailing List</h2>
                    <p className='footer-textbox'>Never miss an update</p>
                    <div className='email-input-container'>
                        <input type='email' placeholder='your@email.com' className='email-input' />
                        <div className='send-icon-container'>
                            <img src={sendicon} alt='Send' className='send-icon' />
                        </div>
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