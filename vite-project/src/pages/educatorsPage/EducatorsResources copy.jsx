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
            <div className="MediaContainer">
                <div className="MediaSubContainer1">
                    <div className="Media1">
                        <div className='Media1_1Container'>
                            <a className='Media1Link1' href='https://www.oregon.gov/ode/schools-and-districts/grants/pages/computer-science-implementation-plan.aspx' target="_blank">
                                <img className='CSEdu' src={CSEdu} alt='Computer Science Education Statewide Implementation Plan Photo' />
                            </a>
                            <a className='Media1Link1' href='https://www.oregon.gov/ode/schools-and-districts/grants/pages/computer-science-implementation-plan.aspx' target="_blank">Oregon Statewide Computer Science Implementation Plan</a>
                        </div>
                        <div className='Media1_2Container'>
                            <a className='Media1Link2' href='https://k12cs.org/' target="_blank">
                                <img className='K12CSFramework' src={K12CSFramework} alt='K12 Computer Science Framework Youtube Thumnail' />
                            </a>
                            <a className='Media1Link2' href='https://k12cs.org/' target="_blank">K-12 Computer Science Framework</a>
                        </div>
                        <div className='Media1_3Container'>
                            <a className='Meida1Link3' href='https://csteachers.org/' target="_blank">
                                <img className='CS_Teachers_Association' src={CS_Teachers_Association} alt='Computer Science Teachers’ Association Photo' />
                            </a>
                            <a className='Meida1Link3' href='https://csteachers.org/' target="_blank">Computer Science Teachers’ Association</a>
                        </div>
                    </div>
                </div>
                <div className="MediaSubContainer2">
                    <div className="Media2">
                        <div className='Media2_1Container'>
                            <a className='Meida2Link3' href='https://sites.google.com/sou.edu/socs-for-all/' target="_blank">
                                <img className='SOCS' src={SOCS} alt='ECS Logo' />
                            </a>
                            <a className='Meida2Link3' href='https://sites.google.com/sou.edu/socs-for-all/' target="_blank">Incorporate computational thinking (CT) into the elementary school curricula</a>
                        </div>
                        <div className='Media2_2Container'>
                            <a className='Media2Link1' href='https://ncwit.org/program/counselors-for-computing/' target="_blank">
                                <img className='NCWIT' src={NCWIT} alt='NCWIT logo' />
                            </a>
                            <a className='Media2Link1' href='https://ncwit.org/program/counselors-for-computing/' target="_blank">NCWIT Counselors for Computing</a>
                        </div>
                        <div className='Media2_3Container'>
                            <a className='Media2Link2' href='https://csforca.org/wp-content/uploads/2022/04/KC21004_ECS-Framework-Report_final.pdf' target="_blank">
                                <img className='Kapor' src={Kapor} alt='Kapor logo' />
                            </a>
                            <a className='Media2Link2' href='https://csforca.org/wp-content/uploads/2022/04/KC21004_ECS-Framework-Report_final.pdf' target="_blank">Kapor Center’s Culturally Responsive Curriculum Framework Guide</a>
                        </div>
                    </div>
                </div>
                <div className="MediaSubContainer3">
                    <div className="Media3">
                        <div className='Media3_1Container'>
                            <a className='Media3Link1' href='https://www.exploringcs.org' target="_blank">
                                <img className='ECSLogo' src={ECSLogo} alt='ECS Logo' />
                            </a>
                            <a className='Media3Link1' href='https://www.exploringcs.org' target="_blank">Exploring Computer Science research-based, high school intro-level curriculum and teacher professional development</a>
                        </div>
                        <div className='Media3_2Container'>
                            <a className='Media3Link2' href='https://www.exploringcs.org/e-textiles' target="_blank">
                                <img className='StitchingTheLoopLogo' src={StitchingTheLoopLogo} alt='StitchingTheLoopLogo' />
                            </a>
                            <a className='Media3Link2' href='https://www.exploringcs.org/e-textiles' target="_blank">Stitching the Loop E-Textiles Curriculum for ECS Teachers</a>
                        </div>
                        <div className='Media3_3Container'>
                            <a className='Meida3Link3' href='https://www.csforall.org/projects_and_programs/script/' target="_blank">
                                <img className='script_program_logo' src={script_program_logo} alt='Computer Science Teachers’ Association Photo' />
                            </a>
                            <a className='Meida3Link3' href='https://www.csforall.org/projects_and_programs/script/' target="_blank">The SCRIPT: Strategic CSforALL Planning Tool for School Districts</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}