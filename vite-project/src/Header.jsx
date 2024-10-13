import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './Header.css';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

function Header(){

    const [formData, setFormData] = useState({
        banner_text: '',
        banner_link: '',
        banner_link_text: ''
    });

    const [objects, setObjects] = useState([]);

    useEffect(() => {
        getObjects();
    }, []);

    const getObjects = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}get_headder.php`);
            const data = Array.isArray(res.data) ? res.data : [];
            setObjects(data);
            console.log(data)

        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    return (
        <header className="header">
            
                {objects.length > 0 ? (
                    <h1>
                        {objects[0].banner_text}<Link to={objects[0].banner_link} className="HeaderLink">{objects[0].banner_link_text}</Link>
                    </h1>
                ) : (<></>) }
        </header>
    );
}

export default Header;