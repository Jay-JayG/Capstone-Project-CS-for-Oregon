import './AdminHomePage.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export default function AdminHomePage() {

    const [openDropdowns, setOpenDropdowns] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const checkAuth = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}auth_check.php`, { withCredentials: true });
            if (response.data.status === 'authenticated') {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        } catch (error) {
            setAuthenticated(false);
        }
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${apiBaseUrl}login.php`,
                { username, password },
                { withCredentials: true }
            );
            if (response.data.status === 'authenticated') {
                setAuthenticated(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Invalid Credentials');
            }
        } catch (error) {
            setErrorMessage('Error during authentication');
            console.log('Error during authentication', error);
        }
    };

    useEffect(() => {
        console.log("Checkign auth...");
        checkAuth();
    }, []);

    if (!authenticated) {
        return (
            <div>
                <h2>Please log in to access the admin home page.</h2>
                <form onSubmit={login}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Log In</button>
                </form>
                {errorMessage && <div>{errorMessage}</div>}
            </div>
        );
    }

    // List of admin links and their descriptions
    const adminLinks = [
        { path: '/EventsAdminPage', title: 'Event Card', description: 'Manage event cards, add, edit, or delete events.' },
        { path: '/pdfPage', title: 'PDF Research Paper', description: 'Upload, update, or remove research papers in PDF format.' },
        { path: '/NewsAdminPage', title: 'News', description: 'Post and edit news articles.' },
        { path: '/BannerAdminPage', title: 'Banner', description: 'Update the website banner text and link.' },
        { path: '/MajorEventsAdminPage', title: 'Event Page', description: 'Manage event pages, change event visibility and URLs.' },
        { path: '/PolicyAdminPage', title: 'Policy Page', description: 'Edit text that appears in the "Oregon Policy" section of the Policy page.' },
        { path: '/AboutUsAdminPage', title: 'About Us Page', description: 'Add or remove people from the About Us page and edit their name and title.' },
        { path: '/DropDownEventsAdminPage', title: 'Drop Down Events on Summer Equity Symposium Page', description: 'Edit title and content of drop down events on the Summer Equity Symposium Page' },
        { path: '/ResourcesAdminPage', title: 'Resources for K-12 Educators', description: 'Add, remove and edit resources and their images/logos on the Resources for K-12 Educators page.' },
        { path: '/SpotlightAdminPage', title: 'Teacher Spotlight', description: 'Add and edit Teacher Spotlight slides to the carousel on the About page' },
        { path: '/HomePageAdminPage', title: 'Home Page', description: 'Edit the text displayed on the Home Page.' },
        { path: '/FooterAdminPage', title: 'Footer', description: 'Edit the legal notice displayed on the Footer.' },
        { path: '/StatePolicyAdminPage', title: 'State Policiess', description: 'Add edit and delete the State Policies Boxes on the Policy Page.' },
        { path: '/MarkdownEditor', title: 'Markdown Editor', description: 'Text Editor with helpful Markdown and Inline HTML formatting buttons.' },
        { path: '/NavigationBarAdminPage', title: 'Navigation Bar', description: 'Edit the title of pages on the Navigation Bar.' },
        { path: '/TemplateAdminPage', title: 'Template Admin Page', description: 'Example Admin Page to model workflow.' }
    ];

    const toggleDropdown = (index) => {
        setOpenDropdowns((prevOpenDropdowns) => {
            if (prevOpenDropdowns.includes(index)) {
                return prevOpenDropdowns.filter((i) => i !== index);
            } else {
                return [...prevOpenDropdowns, index];
            }
        });
    };

    return (
        <div className='admin-home-page-container'>
            <div className='links-container'>
                {adminLinks.map((link, index) => (
                    <div
                        key={index}
                        className={`link-item ${openDropdowns.includes(index) ? 'open' : ''}`}
                        onClick={() => toggleDropdown(index)}
                    >
                        <div className='link-row'>
                            <Link to={link.path} className='link-to-page'>{link.title}</Link>
                            <span className='toggle-icon'>
                                {openDropdowns.includes(index) ? '-' : '+'}
                            </span>
                        </div>
                        {openDropdowns.includes(index) && (
                            <div className='dropdown-description'>
                                {link.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
