import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../../Header.css';
import { useBanner } from '../../../BannerContext';
import './BannerAdminPage.css'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function BannerAdminPage() {

    const { bannerData, globalData, updateBannerData, updateGlobalData } = useBanner();

    const [formData, setFormData] = useState({
        banner_text: '',
        banner_link: '',
        banner_link_text: '',
        hidden: "1"
    });

    const [formEditedData, setEditedFormData] = useState({
        banner_text: '',
        banner_link: '',
        banner_link_text: '',
        hidden: ''
    });

    const [isToggled, setIsToggled] = useState(false);

    const [objects, setObjects] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    const [editFormVisibility, setEditFormVisibility] = useState({});

    const handleToggleEdit = (id, obj, fill = false) => {
        setEditFormVisibility((prev) => {
            const newVisability = {};
            newVisability[id] = !prev[id];
            if (fill) {
                const mergedData = {
                    ...obj
                };
                setEditedFormData(mergedData);
                console.log(formEditedData);
                console.log(fill);
            }
            return newVisability;
        });
    };

    useEffect(() => {
        getObjects();
        if (globalData) {
            setIsToggled(globalData.show_banner === '1'); // Expression return a boolean
        }
    }, [globalData]);

    const getObjects = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}get_headder.php`);
            const data = Array.isArray(res.data) ? res.data : [];
            setObjects(data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    const handleInputChange = (event, isEditing = false) => {
        const { name, value } = event.target;

        if (isEditing) {
            setEditedFormData({ ...formEditedData, [name]: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}get_headder.php`, formData);
            console.log('Object uploaded successfullyy:', res.data);
            setSubmitted(true);
            setFormData({
                banner_text: '',
                banner_link: '',
                banner_link_text: ''

            });
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            await getObjects();
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    const handleSubmitEdit = async (event, id, obj) => {
        event.preventDefault();
        try {

            const mergedData = {
                ...obj, // Original values
                ...Object.fromEntries( // Overwrite only the non-null values from formEditedData
                    Object.entries(formEditedData).filter(([key, value]) => value !== null)
                )
            };

            const res = await axios.put(`${apiBaseUrl}get_headder.php?id=${id}`, mergedData);
            console.log('Object uploaded successfullyy:', res.data);
            setEditFormVisibility((prev) => ({
                ...prev,
                [id]: false, // Set visibility of the form for this object to false
            }));
            updateBannerData(mergedData);
            getObjects();
        } catch (error) {
            console.log('Error updating object', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiBaseUrl}get_headder.php?id=${id}`);
            getObjects();
        } catch (error) {
            console.log('Error deleting object', error);
        }
    };


    useEffect(() => {
        if (editFormVisibility[objects.id]) {
            setEditedFormData({
                banner_text: objects.banner_text || '',
                banner_link: objects.banner_link || '',
                banner_link_text: objects.banner_link_text || ''
            });
        }
    }, [editFormVisibility, objects]);

    const updateGlobal = async (newValue) => {
        try {
            const response = await axios.put(`${apiBaseUrl}globals.php`, {
                show_banner: newValue ? '1' : '0' // Send '1' for ON, '0' for OFF
            });
            if (response.status === 200) {
                updateGlobalData({
                    show_banner: response.data.show_banner
                });
                console.log("Global data updated successfully. ", response.data);
            } else {
                console.error("Failed to update global data.");
            }
        } catch (error) {
            console.error("Error updating global data:", error);
        }
    };

    const handleSelectedBanner = async (id) => {
        try {
            await axios.put(`${apiBaseUrl}globals.php?`, {
                banner_to_show : id
            },
            {
                params: { update_type: 'banner_selected' }
            }
        );
        updateGlobalData({
            banner_to_show: id
        });
        } catch (error) {
            console.log('Error updating global', error);
        }
    };

    const handleToggleChange = (e) => {
        const newValue = e.target.checked; // true if ON, false if OFF
        setIsToggled(newValue); // Update local state
        updateGlobal(newValue);  // Call the update function to make the PUT request
    };

    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Admin Page</p>
            <p className='text-align-center'>This is the admin page to change the banner at the top the entire site.</p>
            <p className='text-align-center'>If you would like no banner at the top delete the current banner below.</p>
            <p className='text-align-center'>Only one banner can be used at a time.</p>
            <p className='text-align-center'>Please ensure the banner you want is the first and only banner in the data base.</p>
            {submitted ? <p className='AdminPageSubmittedText'>Submitted</p> : null}
            <div className='AdminPageFormContainer'>
                <form className='AdminPageForm' onSubmit={handleSubmit}>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            value={formData.banner_text}
                            className='AdminPageFormField'
                            placeholder='Banner Text'
                            name='banner_text'
                            size='50'
                        />
                    </div>
                    <div>Note: Include http:// or https:// in your link or your link will have https://csfororegon.org/ added to the font of it.</div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            value={formData.banner_link}
                            className='AdminPageFormField'
                            placeholder='https://your-link-url.com'
                            name='banner_link'
                            size='50'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            value={formData.banner_link_text}
                            className='AdminPageFormField'
                            placeholder='Text That Appears Inplace of url'
                            name='banner_link_text'
                            size='50'
                        />
                    </div>
                    <header className="header">
                        <h1>
                            {formData.banner_text}<a href={formData.banner_link} className="HeaderLink">{formData.banner_link_text ? formData.banner_link_text : formData.banner_link}</a>
                        </h1>
                    </header>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitButton' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <h2 className='banner-toggle-header'>Turn Banner on/off</h2>
            <div className='toggle-container'>
                <input
                    type="checkbox"
                    className="toggle-input"
                    id="toggle"
                    checked={isToggled}
                    onChange={handleToggleChange} // Triggered on toggle change    
                />
                <label className="toggle-slider" htmlFor="toggle">
                    <span className="toggle-text left">OFF</span>
                    <span className="toggle-text right">ON</span>
                </label>
            </div>
            <h2 className='banner-toggle-header'>Which banner to show: </h2>
            <div className='flex-rows-center margin_bottom-vh5'>{
                objects.map((obj, index) => (
                    <button
                        onClick={() => handleSelectedBanner(obj.id)}
                        key={obj.id}
                    >
                        {index + 1}
                    </button>))}
            </div>

            {
                objects.map((obj) => (
                    <div key={obj.id} className='object'>
                        <header className="header">
                            <h1>
                                {obj.banner_text}<a href={obj.banner_link} className="HeaderLink">{obj.banner_link_text}</a>
                            </h1>
                        </header>

                        {editFormVisibility[obj.id] && (
                            <div className='AdminPageFormContainer'>
                                <form className='AdminPageForm' onSubmit={(e) => handleSubmitEdit(e, obj.id, obj)}>
                                    <div className='AdminPageFormFieldDiv'>
                                        <input
                                            onChange={(e) => handleInputChange(e, true)}
                                            // defaultValue={obj.banner_text} 
                                            value={formEditedData.banner_text}
                                            className='AdminPageFormField'
                                            placeholder='Banner Text'
                                            name='banner_text'
                                            size='50'
                                        />
                                    </div>

                                    <div className='AdminPageFormFieldDiv'>
                                        <p>Note: Include http:// or https:// in your link or your link will have https://csfororegon.org/ added to the font of it.</p>
                                        <input
                                            onChange={(e) => handleInputChange(e, true)}
                                            // defaultValue={obj.banner_link}
                                            value={formEditedData.banner_link}
                                            className='AdminPageFormField'
                                            placeholder='http://your-link-url.com'
                                            name='banner_link'
                                            size='50'
                                        />
                                    </div>
                                    <div className='AdminPageFormFieldDiv'>
                                        <input
                                            onChange={(e) => handleInputChange(e, true)}
                                            // defaultValue={obj.banner_link_text}
                                            value={formEditedData.banner_link_text}
                                            className='AdminPageFormField'
                                            placeholder='Text That Appears Inplace of url'
                                            name='banner_link_text'
                                            size='50'
                                        />
                                    </div>
                                    <div className='AdminPageFormFieldDiv'>
                                        <button className='AdminPageSubmitButton' type='submit'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div className='flex-rows-center'>
                            <>
                                {obj.hidden === "0" ? (
                                    <button
                                        className={`object-delete-button ${obj.hidden === "0" ? 'object-delete-button-deactivated' : ''}`}
                                        onClick={() => handleHide(obj.id, obj.hidden)}
                                        disabled={true} // Disable the Hide button if the page is shown
                                    >
                                        Show banner
                                    </button>
                                ) : (
                                    <button
                                        className={`object-delete-button ${obj.hidden === "0" ? 'object-delete-button-deactivated' : ''}`}
                                        onClick={() => handleShow(obj.id, obj.hidden)}
                                        disabled={false} // Enable the Show button if the page is hidden
                                    >
                                        Show Banner
                                    </button>
                                )}
                                {obj.hidden === "1" ? (
                                    <button
                                        className={`object-delete-button ${obj.hidden === "1" ? 'object-delete-button-deactivated' : ''}`}
                                        onClick={() => handleShow(obj.id, obj.hidden)}
                                        disabled={true} // Enable the Show button if the page is hidden
                                    >
                                        Hide Banner
                                    </button>
                                ) : (
                                    <button
                                        className={`object-delete-button ${obj.hidden === "1" ? 'object-delete-button-deactivated' : ''}`}
                                        onClick={() => handleHide(obj.id, obj.hidden)}
                                        disabled={false} // Enable the Hide button if the page is shown
                                    >
                                        Hide Banner
                                    </button>
                                )}
                            </>
                            {editFormVisibility[obj.id] ? (<button className='object-delete-button' onClick={() => handleToggleEdit(obj.id, obj)}>
                                Cancel Edit
                            </button>) : (
                                <button className='object-delete-button' onClick={() => handleToggleEdit(obj.id, obj, true)}>
                                    Edit
                                </button>)}
                            <button className='object-delete-button' onClick={() => handleDelete(obj.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </div >
    );
}