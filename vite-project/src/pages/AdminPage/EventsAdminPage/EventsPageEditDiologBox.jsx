import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useEventPages } from '../MajorEventsAdminPage/EventPageContext';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const EventsPageEditDiologBox = (event) => {

    const [currentData, setCurrentData] = useState(event.event);
    const [editingData, setEdditingtData] = useState(event.event);
    const [submitted, setSubmitted] = useState(false);
    const { eventPages, setEventPages } = useEventPages();

    const getEventPages = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}majorevents.php`);
            const data = Array.isArray(res.data) ? res.data : [];
            setEventPages(data);
        } catch (error) {
            console.log('Error retrieving EventPages', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(editingData);
            const res = await axios.put(`${apiBaseUrl}events.php?id=${editingData.id}`, editingData);
            console.log('Object uploaded successfullyy:', res.data);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 200);
        } catch (error) {
            console.log('Error uploading object:', error);
        }
        setCurrentData(editingData);
    }

    const handleDialogBoxEdit = (event) => {
        const { name, value } = event.target;
        setEdditingtData({ ...editingData, [name]: value });
    };

    const handleRadioChangeMajEvntAssocEdit = (event) => {
        setEdditingtData({ ...editingData, major_event_associated: event.target.value });
        console.log("Selected Event URL:", event.target.value);
    };

    const handleRadioEventFullEdit = (event) => {
        setEdditingtData({ ...editingData, is_full: event.target.value });
        console.log("Selected Event Display Status:", event.target.value);
    };

    const handleRadioChangeDisplayEventEdit = (event) => {
        setEdditingtData({ ...editingData, display_event: event.target.value });
    };

    const statusMap = {
        1: "Event Page",
        2: "Everywhere"
    };

    return (
        <div className='dialog-box-content-container'>
            <div className='event-cards-background-dialog-box'>
                Current
                <div className='event-card-title'>{currentData.title}</div>
                <div className='event-card-description'><span className='event-bold-text'>What: {currentData.bold} </span>{currentData.what}</div>
                <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{currentData.who}</div>
                <div className='event-card-date'>{currentData.when_date}</div>
                {currentData.is_full === "1" ? (
                    <div className='event-full'>
                        <h3>Event Full</h3>
                        We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                    </div>
                ) : null}
                <div className='event-buttons-container'>
                    <a className='event-buttons-Flyer' href={currentData.flyer_link} target='_blank'>Event Flyer</a>
                    {currentData.is_full === "1" ? (
                        <div className='event-buttons-Flyer-disabled'>Event Full</div>
                    ) : <a className='event-buttons-Flyer' href={currentData.apply_link} target='_blank'>Apply Here</a>}
                </div>
                <div>Is Event Full: {currentData.is_full}</div>
                <div>Major Event Associated: {currentData.major_event_associated}</div>
                <div>Display Event Status: {statusMap[currentData.display_event] || "Nowhere"}</div>
                
            </div>
            <div className='AdminPageFormContainer, EventEditForm-style'>
                <form className='AdminPageForm' onSubmit={handleSubmit}>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleDialogBoxEdit}
                            value={editingData.title}
                            className='AdminPageFormField'
                            placeholder='Title'
                            name='title'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleDialogBoxEdit}
                            value={editingData.bold}
                            className='AdminPageFormField'
                            placeholder='Bold Text Description'
                            name='bold'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleDialogBoxEdit}
                            value={editingData.what}
                            className='AdminPageFormField'
                            placeholder='What'
                            name='what'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleDialogBoxEdit}
                            value={editingData.who}
                            className='AdminPageFormField'
                            placeholder='Who'
                            name='who'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleDialogBoxEdit}
                            value={editingData.when_date}
                            className='AdminPageFormField'
                            placeholder='When'
                            name='when_date'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleDialogBoxEdit}
                            value={editingData.flyer_link}
                            className='AdminPageFormField'
                            placeholder='Flyer Link'
                            name='flyer_link'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleDialogBoxEdit}
                            value={editingData.apply_link}
                            className='AdminPageFormField'
                            placeholder='Apply Link'
                            name='apply_link'
                            cols={40}
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        If you want an Event Card to show on an Event Page select the event page below.<br /> To not associate a card with an Event Pgae select None.
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <label>
                            <input
                                type="radio"
                                name="major_event_associated"
                                value="None"
                                onChange={handleRadioChangeMajEvntAssocEdit}
                            />
                            None
                        </label>
                        {eventPages.length > 0 ? (eventPages.map((event, index) => (<label key={event.id || index}>
                            <input
                                type="radio"
                                name="major_event_associated"
                                value={event.header}
                                onChange={handleRadioChangeMajEvntAssocEdit}
                            />
                            {event.header}</label>
                        ))
                        ) : null}
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <label>
                            <input
                                type="radio"
                                name="is_full"
                                value={0}
                                onChange={handleRadioEventFullEdit}
                            />
                            Event Open
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="is_full"
                                value={1}
                                onChange={handleRadioEventFullEdit}
                            />
                            Event Full
                        </label>
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <label>
                            <input
                                type="radio"
                                name="display_event"
                                value={0}
                                onChange={handleRadioChangeDisplayEventEdit}
                            />
                            Nowhere
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="display_event"
                                value={1}
                                onChange={handleRadioChangeDisplayEventEdit}
                            />
                            Event Page Only
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="display_event"
                                value={2}
                                onChange={handleRadioChangeDisplayEventEdit}
                            />
                            Everywhere
                        </label>
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='EditSubmitButton' type='submit'>
                            Submit
                        </button>
                    </div >
                </form>
            </div>
            <div className='event-cards-background-dialog-box'>
                Preview
                <div className='event-card-title'>{editingData.title}</div>
                <div className='event-card-description'><span className='event-bold-text'>What: {editingData.bold} </span>{currentData.what}</div>
                <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{editingData.who}</div>
                <div className='event-card-date'>{editingData.when_date}</div>
                {editingData.is_full === "1" ? (
                    <div className='event-full'>
                        <h3>Event Full</h3>
                        We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                    </div>
                ) : null}
                <div className='event-buttons-container'>
                    <a className='event-buttons-Flyer' href={editingData.flyer_link} target='_blank'>Event Flyer</a>
                    {editingData.is_full === "1" ? (
                        <div className='event-buttons-Flyer-disabled'>Event Full</div>
                    ) : <a className='event-buttons-Flyer' href={editingData.apply_link} target='_blank'>Apply Here</a>}
                </div>
                <div>Is Event Full: {editingData.is_full}</div>
                <div>Major Event Associated: {editingData.major_event_associated}</div>
                <div>Display Event Status: {statusMap[editingData.display_event] || "Nowhere"}</div>
            </div>
        </div>
    );

}