import CSEdu from '/src/assets/cs_education_statewide_implementation_plan.png';
import K12CSFramework from '/src/assets/K12-CS-Framework-Image.webp';
import CS_Teachers_Association from '/src/assets/CS-Teachers-Association-Image.png';
import NCWIT from '/src/assets/NCWIT.png';
import Kapor from '/src/assets/Kapor-KC21004_ECS-Framework-Report_final-pdf-image-edited.jpg';
import ECSLogo from '/src/assets/ECS-Logo-.png';
import StitchingTheLoopLogo from '../../assets/stitching-the-loop-logo-transparent-bkgrnd.webp';
import SOCS from '/src/assets/SOCS for ALL.png';
import script_program_logo from '/src/assets/script program.png';
import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify
import { Link } from 'react-router-dom';

export default function EducatorsResources() {

    const [resources, setResources] = useState([]);

    const fetchResources = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}resources.php?timestamp=${new Date().getTime()}`);
            setResources(response.data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    return (
        <div className="EducatorsResourcesContainer">
            <p className="ResourcesHeading">Teaching & Learning Resources</p>
            <div className="MediaGrid Media1">
                {resources.map((item, index) => (
                    <div className="MediaCard" key={index}>
                        <a className="MediaLink" href={item.url_link} target="_blank" rel="noopener noreferrer">
                            <img className='MediaImage' src={`data:image/jpeg;base64,${item.logo}`} alt={item.resource_name} />
                        </a>
                        <a className="MediaLink" href={item.url_link} target="_blank" rel="noopener noreferrer">
                            {item.resource_name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}