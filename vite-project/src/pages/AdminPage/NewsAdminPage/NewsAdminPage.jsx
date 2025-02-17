
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../NewsAndFeatures/NewsPage/NewsPage.css'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", apiBaseUrl); // Add this line to verify

export default function NewsAdminPage() {

    const [formData, setFormData] = useState({
        title: '',
        link: '',
        what: '',
        when_date: '',
    });

    const [updateData, setUpdateData] = useState({
        title: '',
        link: '',
        what: '',
        when_date: '',
    });

    const [showEditField, setShowEditField] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [objects, setObjects] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    const handleTitleInputChange = (event) => {
        setFormData({ ...formData, title: event.target.value });
        console.log(formData.title)
    }

    const handleBoldInputChange = (event) => {
        setFormData({ ...formData, link: event.target.value });
    }

    const handleWhatInputChange = (event) => {
        setFormData({ ...formData, what: event.target.value });
    }

    const handleWhen_dateInputChange = (event) => {
        setFormData({ ...formData, when_date: event.target.value });
    }

    const handleTitleInputUpdate = (event) => {
        setUpdateData({ ...updateData, title: event.target.value });
        console.log(updateData.title)
    }

    const handleBoldInputUpdate = (event) => {
        setUpdateData({ ...updateData, link: event.target.value });
    }

    const handleWhatInputUpdate = (event) => {
        setUpdateData({ ...updateData, what: event.target.value });
    }

    const handleWhen_dateInputUpdate = (event) => {
        setUpdateData({ ...updateData, when_date: event.target.value });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${apiBaseUrl}news.php`, formData);
            setSubmitted(true);
            setFormData({
                title: '',
                link: '',
                what: '',
                when_date: '',
            });
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            await getObjects();
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    const handleUpdate = async (id, updateData) => {
        try {
            const res = await axios.put(`${apiBaseUrl}news.php?id=${id}`, updateData);
            setSubmitted(true);
            setUpdateData({
                title: '',
                link: '',
                what: '',
                when_date: '',
            });
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            setEditIndex(null);
            await getObjects();
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    };

    const onSubmit = (id) => (e) => {
        e.preventDefault();
        handleUpdate(id, updateData);
    };

    const getObjects = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}news.php`);
            setObjects(res.data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    // const handleUpdate = async (event, id) => {
    //     event.preventDefault();
    //     try {
    //         const res = await axios.post(`${apiBaseUrl}news.phpid=${id}`, formData);
    //         setSubmitted(true);
    //         setFormData({
    //             title: '',
    //             link: '',
    //             what: '',
    //             when_date: '',
    //         });
    //         setTimeout(() => {
    //             setSubmitted(false);
    //         }, 2000);
    //         await getObjects();
    //     } catch (error) {
    //         console.log('Error uploading object:', error);
    //     }
    // }

    useEffect(() => {
        getObjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiBaseUrl}news.php?id=${id}`);
            // After successful deletion, fetch data again to update the UI
            getObjects();
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
            const res = await axios.put(`${apiBaseUrl}news.php?id=${id}`, editedObject);
            // await axios.put(`http://localhost/news.php?id=${id}`, editedObject); // For local development
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            handleCancelEdit(id);
            getObjects();
            console.log(res);
        } catch (error) {
            console.log('Error updating object', error);
        }
    };

    const handleEditClick = (index, obj) => {
        setEditIndex(index);
        setUpdateData({
            title: obj.title || '',
            link: obj.link || '',
            what: obj.what || '',
            when_date: obj.when_date || '',
        });
    };

    return (
        <div className='AdminPageContainer'>
            <Link to={`/admin`} className='link-to-page'> {`<`} Admin Home Page</Link>
            <p className='AdminPageTitle'>News Admin Page</p>
            {submitted ? <p className='AdminPageSubmittedText'>Submitted</p> : null}
            <div className='AdminPageFormContainer'>
                <form className='AdminPageForm' onSubmit={handleSubmit}>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleTitleInputChange}
                            value={formData.title}
                            className='AdminPageFormField'
                            placeholder='Title'
                            name='Title'
                            rows="6"
                            cols="50"
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleBoldInputChange}
                            value={formData.link}
                            className='AdminPageFormField'
                            placeholder='URL Link to News article'
                            name='Link'
                            rows="4"
                            cols="50"
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <textarea
                            onChange={handleWhatInputChange}
                            value={formData.what}
                            className='AdminPageFormField'
                            placeholder='Description of News article'
                            name='what'
                            rows="6"
                            cols="50"
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleWhen_dateInputChange}
                            value={formData.when_date}
                            className='AdminPageFormField'
                            placeholder='Date YYYY-MM-DD'
                            name='when'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitButton' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div className='news-and-features-page-container'>
                <div className='news-cards-container'>
                    <div className='news-cards-background'>
                        <a className='news-card-title' href={formData.link} target='_blank'>{formData.title}</a>
                        <div className='news-card-description'>{formData.what}</div>
                        <div className='news-card-date'>{formData.when_date}</div>
                    </div>
                </div>


                <div className='news-cards-container'>

                    {objects.map((obj, index) => (
                        <div key={index} className='news-cards-background'>
                            <a className='news-card-title' href={obj.link} target='_blank'>{obj.title}</a>
                            <div className='news-card-description'>{obj.what}</div>
                            <div className='news-card-date'>{obj.when_date}</div>
                            <button className='news-edit-button' onClick={() => handleDelete(obj.id)}>Delete Entry Above</button>
                            {editIndex !== index ? (<button className='news-edit-button' onClick={() => handleEditClick(index, obj)}>Edit</button>) : (<button className='news-edit-button' onClick={() => setEditIndex(null)}>Cancel</button>)}
                            {editIndex == index && <div className='AdminPageFormContainer'>
                                <form className='AdminPageForm' onSubmit={onSubmit(obj.id)}>
                                    <div className='AdminPageFormFieldDiv'>
                                        <textarea
                                            onChange={handleTitleInputUpdate}
                                            value={updateData.title}
                                            className='AdminPageFormField'
                                            placeholder='Title'
                                            name='Title'
                                            rows='6'
                                            cols="50"
                                        />
                                    </div>
                                    <div className='AdminPageFormFieldDiv'>
                                        <textarea
                                            onChange={handleBoldInputUpdate}
                                            value={updateData.link}
                                            className='AdminPageFormField'
                                            placeholder='URL Link to News article'
                                            name='Link'
                                            rows='4'
                                            cols="50"
                                        />
                                    </div>
                                    <div className='AdminPageFormFieldDiv'>
                                        <textarea
                                            onChange={handleWhatInputUpdate}
                                            value={updateData.what}
                                            className='AdminPageFormField'
                                            placeholder='What'
                                            name='what'
                                            rows='6'
                                            cols="50"
                                        />
                                    </div>
                                    <div className='AdminPageFormFieldDiv'>
                                        <input
                                            onChange={handleWhen_dateInputUpdate}
                                            value={updateData.when_date}
                                            className='AdminPageFormField'
                                            placeholder='Date YYYY-MM-DD'
                                            name='when'
                                        />
                                    </div>
                                    <div className='AdminPageFormFieldDiv'>
                                        <button className='AdminPageSubmitButton' type='submit'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>}
                        </div>
                    ))}

                </div>
            </div>

            {/* <div className='news-object-list'>
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
                                        <span className='object-bold-text'>Link: {obj.link}<button className='object-edit-button' onClick={() => handleEdit(obj.id, 'link')}>Edit</button> </span>
                                        {obj.what}
                                        <button className='object-edit-button' onClick={() => handleEdit(obj.id, 'what')}>Edit</button>
                                    </div>
                                    <div><span className='object-bold-text'>When: </span>{obj.when_date}<button className='object-edit-button' onClick={() => handleEdit(obj.id, 'when_date')}>Edit</button></div>
                                </div>
                                <button className='object-delete-button' onClick={() => handleDelete(obj.id)}>Delete Entry Above</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>*/}
        </div>
    );
}