import './Admin.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function AdminPage() {

    const [formData, setFormData] = useState({
        title: '',
        bold: '',
        what: '',
        who: '',
        when_date: '',
        news_type: '',
    });

    const [objects, setObjects] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    const handleTitleInputChange = (event) => {
        setFormData({ ...formData, title: event.target.value });
        console.log(formData.title)
    }

    const handleBoldInputChange = (event) => {
        setFormData({ ...formData, bold: event.target.value });
    }

    const handleWhatInputChange = (event) => {
        setFormData({ ...formData, what: event.target.value });
    }

    const handleWhoInputChange = (event) => {
        setFormData({ ...formData, who: event.target.value });
    }

    const handleWhen_dateInputChange = (event) => {
        setFormData({ ...formData, when_date: event.target.value });
    }

    const handleNews_typeInputChange = (event) => {
        setFormData({ ...formData, news_type: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}get_data.php`, formData);
            // const res = await axios.post('http://localhost/get_data.php', formData); // For local development
            console.log('Object uploaded successfullyy:', res.data);
            setSubmitted(true);
            setFormData({
                title: '',
                bold: '',
                what: '',
                who: '',
                when_date: '',
                news_type: '',
            });
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            await getObjects();
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}get_data.php`);
                // const res = await axios.get("http://localhost/get_data.php"); // For local development
                setObjects(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects('news');
    }, []);

    const getObjects = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}get_data.php`);
            // const res = await axios.get('http://localhost/get_data.php'); // For local development
            setObjects(res.data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiBaseUrl}get_data.php?id=${id}`);
            // await axios.delete(`http://localhost/get_data.php?id=${id}`); // For local development
            // After successful deletion, fetch data again to update the UI
            const res = await axios.get(`${apiBaseUrl}get_data.php`);
            // const res = await axios.get("http://localhost/get_data.php"); // For local development
            setObjects(res.data);
        } catch (error) {
            console.log('Error deleting object', error);
        }
    };

    const handleEdit = (id, field) => {
        const updatedObjects = objects.map(obj => {
            if (obj.id === id) {
                return { ...obj, editingField: field };
            } else {
                return obj;
            }
        });
        setObjects(updatedObjects);
    };

    const handleEditInputChange = (event, id) => {
        const { name, value } = event.target;
        console.log(`Editing ${name} to ${value}`);
        const updatedObjects = objects.map(obj => {
            if (obj.id === id) {
                return { ...obj, [name]: value };
            } else {
                return obj;
            }
        });
        setObjects(updatedObjects);
    };

    const handleCancelEdit = (id) => {
        const updatedObjects = objects.map(obj => {
            if (obj.id === id) {
                const { editingField, ...rest } = obj;
                return rest;
            } else {
                return obj;
            }
        });
        setObjects(updatedObjects);
    };

    const handleSaveEdit = async (id) => {
        try {
            const editedObject = objects.find(obj => obj.id === id);
            console.log('Edited Object:', editedObject);
            await axios.put(`${apiBaseUrl}get_data.php?id=${id}`, editedObject);
            // await axios.put(`http://localhost/get_data.php?id=${id}`, editedObject); // For local development
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            handleCancelEdit(id);
            getObjects();
        } catch (error) {
            console.log('Error updating object', error);
        }
    };

    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Admin Page</p>
            {submitted ? <p className='AdminPageSubmittedText'>Submitted</p> : null}
            <div className='AdminPageFormContainer'>
                <form className='AdminPageForm' onSubmit={handleSubmit}>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleTitleInputChange}
                            value={formData.title}
                            className='AdminPageFormField'
                            placeholder='Titel'
                            name='Title'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleBoldInputChange}
                            value={formData.bold}
                            className='AdminPageFormField'
                            placeholder='Bold Text Description'
                            name='bold'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleWhatInputChange}
                            value={formData.what}
                            className='AdminPageFormField'
                            placeholder='What'
                            name='what'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleWhoInputChange}
                            value={formData.who}
                            className='AdminPageFormField'
                            placeholder='Who'
                            name='who'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleWhen_dateInputChange}
                            value={formData.when_date}
                            className='AdminPageFormField'
                            placeholder='When'
                            name='when'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleNews_typeInputChange}
                            value={formData.news_type}
                            className='AdminPageFormField'
                            placeholder='Type'
                            name='news_type'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitBotton' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className='news-object-list'>
                {objects.map((obj, index) => (
                    <div key={index} className='object'>
                        {obj.editingField ? (
                            <div className='object-edit'>
                                <input
                                    className='object-edit-input'
                                    type='text'
                                    name={obj.editingField}
                                    value={obj[obj.editingField]}
                                    onChange={(event) => handleEditInputChange(event, obj.id)}
                                />
                                <button className='object-save-button' onClick={() => handleSaveEdit(obj.id)}>Save</button>
                                <button className='object-cancel-button' onClick={() => handleCancelEdit(obj.id)}>Cancel</button>
                            </div>
                        ) : (
                            <div className='object-container'>
                                <div className='object-event'>
                                    <div className='object-title'>{obj.title}<button className='object-edit-button' onClick={() => handleEdit(obj.id, 'title')}>Edit</button></div>
                                </div>
                                <div className='object-event-details'>
                                    <div>
                                        <span className='object-bold-text'>What: {obj.bold}<button className='object-edit-button' onClick={() => handleEdit(obj.id, 'bold')}>Edit</button> </span>
                                        {obj.what}
                                        <button className='object-edit-button' onClick={() => handleEdit(obj.id, 'what')}>Edit</button>
                                    </div>
                                    <div><span className='object-bold-text'>Who is it for: </span>{obj.who}<button className='object-edit-button' onClick={() => handleEdit(obj.id, 'who')}>Edit</button></div>
                                    <div><span className='object-bold-text'>When: </span>{obj.when_date}<button className='object-edit-button' onClick={() => handleEdit(obj.id, 'when_date')}>Edit</button></div>
                                    <div><span className='object-bold-text'>Type: </span>{obj.news_type}<button className='object-edit-button' onClick={() => handleEdit(obj.id, 'news_type')}>Edit</button></div>
                                </div>
                                <button className='object-delete-button' onClick={() => handleDelete(obj.id)}>Delete Entry Above</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}