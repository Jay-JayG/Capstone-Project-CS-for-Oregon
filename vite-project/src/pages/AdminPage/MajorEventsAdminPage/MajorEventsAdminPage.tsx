// import './MajorEventsAdminPage.css'
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MajorEventsAdminPage() {

    const [formData, setFormData] = useState({
        headder: '',
        location: '',
        date_range: '',
        optional_event_description_bold_text: '',
        event_description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission here
    };

    return (

        <div className='AdminPageContainer'>

            <form onSubmit={handleSubmit} className="modern-form">
                <label>
                    Name
                    <input
                        type="Headder"
                        name="headder"
                        value={formData.headder}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>

            <div id="main-content">
                <div className='SummerOfCSSupercontainer'>
                    <div className="SummerOfCScontainer">
                        <div className="SummerOfCSHeaderContainer">
                            <div className="SummerOfCSHeaderContainerText">
                                <div className='SummerOfCSHeaderContainerTextHeader'>{formData.headder}</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>OSU-Cascades</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>Bend, Oregon</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>July 29 - August 2, 2024</div>
                                {/* <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" /> */}
                            </div>
                            <div className='SummerOfCSHeaderPhotoContainer'>
                                {/* <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" /> */}
                            </div>
                        </div>
                    </div>
                    <div className='SummerOfCSSummary'>
                        <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>CS for Oregon</span> is hosting a K12 Computer Science Equity Summit in Bend, Oregon this summer for educators, school leaders and school counselors.  To join us, please submit an application for one of the four professional development (PD) opportunities described below.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}



