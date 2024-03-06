import './Admin.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        extra: ''
    });

    const [objects, setObjects] = useState([]);

    const [submitted, setSubmitted] = useState(false);

    const handleTitleInputChange = (event) => {
        setFormData({ ...formData, title: event.target.value });
        console.log(formData.title)
    }

    const handleDescriptionInputChange = (event) => {
        setFormData({ ...formData, description: event.target.value });
    }

    const handleExtraInputChange = (event) => {
        setFormData({ ...formData, extra: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/objects', formData);
            console.log('Object uploaded successfullyy:', res.data);
            setSubmitted(true);
            setFormData({
                title: '',
                description: '',
                extra: ''
            });
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);
            await getObjects();
        } catch (error) {
            console.error('Error uploading object:', error);
        }
    }

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get('http://localhost:3001/objects');
                setObjects(res.data);
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
    }, []);

    const getObjects = async () => {
        try {
            const res = await axios.get('http://localhost:3001/objects');
            setObjects(res.data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/objects/${id}`);
            await getObjects();
        } catch (error) {
            console.log('Error deleting object', error);
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
                            onChange={handleDescriptionInputChange}
                            value={formData.description}
                            className='AdminPageFormField'
                            placeholder='Description'
                            name='Description'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleExtraInputChange}
                            value={formData.extra}
                            className='AdminPageFormField'
                            placeholder='Extra'
                            name='Extra'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <button className='AdminPageSubmitBotton' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className='admin-news-object-list'>
                {objects.map(obj => (
                    <div key={obj._id} className='admmin-news-object'>
                        <div className='admin-object-container'>
                            <h2>{obj.title}</h2>
                            <p>{obj.description}</p>
                            {obj.extra && <p>{obj.extra}</p>}
                        </div>
                        <button className='admin-delete_item_button' type='button' onClick={() => handleDelete(obj._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}