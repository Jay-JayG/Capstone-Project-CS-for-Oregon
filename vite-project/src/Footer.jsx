import React from 'react';
import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './Footer.css';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Footer() {

    const [formData, setFormData] = useState(
        {
            legal_notice: '',
        });

    const getContent = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}footer.php`);
            setFormData(res.data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    useEffect(() => {
            getContent();
        }, []);

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
                                <li><Link to={`Educators`}>Resources for K-12 Educators</Link></li>
                                <li>
                                    <a
                                        href="https://public.tableau.com/views/OregonComputerScienceEdDataDashboard/Access?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Data Dashboard
                                    </a>
                                </li>
                                <li><Link to={`SummerOfCS`}>Summer Equity Symposium</Link></li>
                                <li><Link to={`news`}>News</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div>
                <div className="footer-disclaimer">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {formData.legal_notice}
                    </ReactMarkdown>
                </div>
                <p className='footer-copyright'>&copy; {new Date().getFullYear()} COPYRIGHT CS FOR OREGON – ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
}

export default Footer;