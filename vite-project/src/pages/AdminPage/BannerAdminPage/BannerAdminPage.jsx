import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../../Header.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function BannerAdminPage() {

    const [formData, setFormData] = useState({
        banner_text: '',
        banner_link: '',
        banner_link_text: ''
    });

    const [formEditedData, setEditedFormData] = useState({
        banner_text: '',
        banner_link: '',
        banner_link_text: ''
    });

    const [objects, setObjects] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    const [editFormVisibility, setEditFormVisibility] = useState({});

    const handleToggleEdit = (id, obj, fill=false) => {
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
    }, []);

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
                    Object.entries(formEditedData).filter(([key, value]) => value !== '' && value !== null)
                )
            };

            const res = await axios.put(`${apiBaseUrl}get_headder.php?id=${id}`, mergedData);
            console.log('Object uploaded successfullyy:', res.data);
            setEditFormVisibility((prev) => ({
                ...prev,
                [id]: false, // Set visibility of the form for this object to false
            }));
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

    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Admin Page</p>
            <p style={{ 'textAlign': 'center' }}>This is the admin page to change the banner at the top the entire site.</p>
            <p style={{ 'textAlign': 'center' }}>If you would like no banner at the top delete the current banner below.</p>
            <p style={{ 'textAlign': 'center' }}>Only one banner can be used at a time.</p>
            <p style={{ 'textAlign': 'center' }}>Please ensure the banner you want is the first and only banner in the data base.</p>
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
                    <div className='AdminPageFormFieldDiv'>
                    <p>Note: Include http:// or https:// in your link or your link will have https://csfororegon.org/ added to the font of it.</p>
                        <input
                            onChange={(e) => handleInputChange(e)}
                            value={formData.banner_link}
                            className='AdminPageFormField'
                            placeholder='http://your-link-url.com'
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
                        <button className='AdminPageSubmitBotton' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {objects.map((obj) => (
                <div key={obj.id} className='object'>
                    <header className="header">
                        <h1>
                        {objects[0].banner_text}<a href={objects[0].banner_link} className="HeaderLink">{objects[0].banner_link_text}</a>
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
                                    <button className='AdminPageSubmitBotton' type='submit'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className='flex-rows-center'>
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
            ))}
        </div>
    );
}