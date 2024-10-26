import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './Header.css';
import axios from 'axios';
import { useBanner } from './BannerContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Header(){

    const { bannerData } = useBanner();

    // const [formData, setFormData] = useState({
    //     banner_text: '',
    //     banner_link: '',
    //     banner_link_text: ''
    // });

    // const [objects, setObjects] = useState([]);

    // useEffect(() => {
    //     getObjects();
    // }, []);

    // const getObjects = async () => {
    //     try {
    //         const res = await axios.get(`${apiBaseUrl}get_headder.php`);
    //         const data = Array.isArray(res.data) ? res.data : [];
    //         setObjects(data);

    //     } catch (error) {
    //         console.log('Error retrieving objects', error);
    //     }
    // };

    return (
        <header className="header">
            
                {bannerData.banner_text ? (
                    <h1>
                        {bannerData.banner_text}<a href={bannerData.banner_link} className="HeaderLink">{bannerData.banner_link_text}</a>
                    </h1>
                ) : (<></>) }
        </header>
    );
}

export default Header;