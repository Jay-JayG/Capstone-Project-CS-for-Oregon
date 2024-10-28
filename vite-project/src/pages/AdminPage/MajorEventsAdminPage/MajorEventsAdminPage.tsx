// import './MajorEventsAdminPage.css'
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './MajorEventsAdminPage.css'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify
// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ObjectType = {
    header: string;
    location: string;
    date_range: string;
    organization: string;
    optional_event_description_bold_text: string;
    event_description: string;
    event_season: number;
};

type EventType = {
    title: string;
    bold: string;
    what: string;
    who: string;
    when_date: string;
    flyer_link: string;
    apply_link: string;
    is_full: string;
    major_event_type: number;
};

export default function MajorEventsAdminPage() {
    const [formData, setFormData] = useState<ObjectType>({
        header: '',
        location: '',
        date_range: '',
        organization: '',
        optional_event_description_bold_text: '',
        event_description: '',
        event_season: 0
    });

    const [submitted, setSubmitted] = useState(false);

    const [objects, setObjects] = useState<ObjectType[]>([]);
    const [events, setEvents] = useState<EventType[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: Number(value) // Convert value to number for radio buttons
        });
        console.log(formData);
    };

    const getObjects = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}majorevents.php`);
            const data = Array.isArray(res.data) ? res.data : [];
            setObjects(data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    const getEvents = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}events.php`);
            // const res = await axios.get('http://localhost/events.php'); // For local development
            setEvents(res.data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };


    useEffect(() => {
        getObjects();
        getEvents();
        console.log(objects)
        console.log(events)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}majorevents.php`, formData);
            console.log('Object uploaded successfully:', res.data);
            setSubmitted(true);
            setFormData({
                header: '',
                location: '',
                date_range: '',
                organization: '',
                optional_event_description_bold_text: '',
                event_description: '',
                event_season: 0
            })
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            // await getObjects();
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }


    const inputform = () => {

        return (
            <div className='AdminPageFormContainer'>
                <form onSubmit={handleSubmit} className="major-events-form">
                    Header
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="header"
                            value={formData.header}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    Organization
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    Location
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    Date Range
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="date_range"
                            value={formData.date_range}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    Bold First Phrase
                    <label>
                        <input
                            className='major-events-form-field'
                            type="text"
                            name="optional_event_description_bold_text"
                            value={formData.optional_event_description_bold_text}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    Event Description
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="event_description"
                            value={formData.event_description}
                            onChange={handleChange}
                            required
                            rows={6}
                            cols={50}
                        />
                    </label>
                    <label>Event Season:</label>
                    <div className="major-events-form">

                        <label>
                            Spring:
                            <input
                                type="radio"
                                name="event_season"
                                value={0}
                                checked={formData.event_season === 0}
                                onChange={handleRadioChange}
                            />

                        </label>
                        <label>
                            Summer:
                            <input
                                type="radio"
                                name="event_season"
                                value={1}
                                checked={formData.event_season === 1}
                                onChange={handleRadioChange}
                            />

                        </label>
                        <label>
                            Autumn:
                            <input
                                type="radio"
                                name="event_season"
                                value={2}
                                checked={formData.event_season === 2}
                                onChange={handleRadioChange}
                            />

                        </label>
                        <label>
                            Winter:
                            <input
                                type="radio"
                                name="event_season"
                                value={4}
                                checked={formData.event_season === 4}
                                onChange={handleRadioChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

    return (

        <div className='AdminPageContainer'>

            <>{inputform()}</>
            {/* Page Preview */}
            <div id="main-content">
                <div className='SummerOfCSSupercontainer'>
                    <div className="SummerOfCScontainer">
                        <div className="SummerOfCSHeaderContainer">
                            <div className="SummerOfCSHeaderContainerText">
                                <div className='SummerOfCSHeaderContainerTextHeader'>{formData.header}</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>{formData.organization}</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>{formData.location}</div>
                                <div className='SummerOfCSHeaderContainerTextBody'>{formData.date_range}</div>
                                {/* <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" /> */}
                            </div>
                            <div className='SummerOfCSHeaderPhotoContainer'>
                                {/* <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" /> */}
                            </div>
                        </div>
                    </div>
                    <div className='SummerOfCSSummary'>
                        <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>{formData.optional_event_description_bold_text}</span>{formData.event_description}</div>
                    </div>
                </div>
            </div>


            {objects.map((obj, index) => (
                <div id="main-content">
                    <div key={index} className='SummerOfCSSupercontainer'>
                        <div className="SummerOfCScontainer">
                            <div className="SummerOfCSHeaderContainer">
                                <div className="SummerOfCSHeaderContainerText">
                                    <div className='SummerOfCSHeaderContainerTextHeader'>{obj.header}</div>
                                    <div className='SummerOfCSHeaderContainerTextBody'>{obj.organization}</div>
                                    <div className='SummerOfCSHeaderContainerTextBody'>{obj.location}</div>
                                    <div className='SummerOfCSHeaderContainerTextBody'>{obj.date_range}</div>
                                    {/* <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" /> */}
                                </div>
                                <div className='SummerOfCSHeaderPhotoContainer'>
                                    {/* <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" /> */}
                                </div>
                            </div>
                        </div>
                        <div className='SummerOfCSSummary'>
                            <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>{obj.optional_event_description_bold_text}</span>{obj.event_description}</div>
                        </div>
                    </div>

                    <div className='summer-of-cs-event-cards-container'>
                        {events.filter(event => event.major_event_type === obj.event_season)
                        .map((event, index) => (
                            <div key={index} className='event-cards-background'>
                                <div className='event-card-title'>{event.title}</div>
                                <div className='event-card-description'><span className='event-bold-text'>What: {event.bold} </span>{event.what}</div>
                                <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{event.who}</div>
                                <div className='event-card-date'>{event.when_date}</div>
                                {event.is_full === "1" ? (
                                    <div className='event-full'>
                                        <h3>Event Full</h3>
                                        We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                                    </div>
                                ) : null}
                                <div className='event-buttons-container'>
                                    <a className='event-buttons-Flyer' href={event.flyer_link} target='_blank'>Event Flyer</a>
                                    {event.is_full === "1" ? (
                                        <div className='event-buttons-Flyer-disabled'>Event Full</div>
                                    ) : <a className='event-buttons-Flyer' href={event.apply_link} target='_blank'>Apply Here</a>}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            ))}

        </div>
    );
}
