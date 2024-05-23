import CSSummerPhoto from '/src/assets/summer_of_cs_photo.png';
import CSSymposiumLogo from '../../assets/CS_SYM_JAN2024.png';
import ECSLogo from '/src/assets/ECS-Logo-.png';
import StitchingTheLoopLogo from '../../assets/stitching-the-loop-logo-transparent-bkgrnd.webp';
import './SummerOfCS.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify



export default function SummerOfCS() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}get_data.php`);
                setObjects(res.data);
                console.log(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects('news');
    }, []);

    const filteredObjects = objects.filter(obj => obj.news_type === '1');

    return (
        <div id="main-content">
            <div className='SummerOfCSSupercontainer'>
                <div className="SummerOfCScontainer">
                    <div className="SummerOfCSHeaderContainer">
                        <div className="SummerOfCSHeaderContainerText">
                            <div className='SummerOfCSHeaderContainerTextHeader'>Summer Equity Symposium</div>
                            <div className='SummerOfCSHeaderContainerTextBody'>OSU-Cascades</div>
                            <div className='SummerOfCSHeaderContainerTextBody'>Bend, Oregon</div>
                            <div className='SummerOfCSHeaderContainerTextBody'>July 29 - August 2, 2024</div>
                            <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" />
                        </div>
                        <div className='SummerOfCSHeaderPhotoContainer'>
                            <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" />
                        </div>
                    </div>
                </div>
                <div className='SummerOfCSSummary'>
                    <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>CS for Oregon</span> is hosting a K12 Computer Science Equity Summit in Bend, Oregon this summer for educators, school leaders and school counselors.  To join us, please submit an application for one of the four professional development (PD) opportunities described below.</div>
                </div>
                <div className='summer-of-cs-event-cards-container'>
                    {filteredObjects.map((obj, index) => (
                        <div key={index} className='event-cards-background'>
                            <div className='event-card-title' href={obj.bold}>{obj.title}</div>
                            <div className='event-card-description'><span className='event-bold-text'>What: {obj.bold} </span>{obj.what}</div>
                            <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{obj.who}</div>
                            <div className='event-card-date'>{obj.when_date}</div>
                            {obj.is_full === "1" ? (
                                <div className='event-full'>
                                    <h3>Event Full</h3>
                                    We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                                </div>
                            ) : null}
                            <div className='event-buttons-container'>
                                <a className='event-buttons-Flyer' href={obj.flyer_link} target='_blank'>Event Flyer</a>
                                {obj.is_full === "1" ? (
                                    <div className='event-buttons-Flyer-disabled'>Event Full</div>
                                ) : <a className='event-buttons-Flyer' href={obj.apply_link} target='_blank'>Apply Here</a>}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};