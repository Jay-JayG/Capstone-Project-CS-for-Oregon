import './Admin.css';
import { useState } from 'react';
import axios from 'axios';

export default function AdminPage() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        extra: ''
    });

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
        } catch (error) {
            console.error('Error uploading object:', error);
        }
    }

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
        </div>
    );
}