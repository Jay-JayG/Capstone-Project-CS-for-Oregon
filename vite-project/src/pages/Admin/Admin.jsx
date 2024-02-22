import './Admin.css';
import { useState } from 'react';
import axios from 'axios';

export default function AdminPage() {

    const [formData, setFormData] = useState({
        Title: '',
        Description: '',
        Extra: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleTitleInputChange = (event) => {
        setFormData({ ...formData, Title: event.target.value });
        console.log(formData.Title)
    }

    const handleDescriptionInputChange = (event) => {
        setFormData({ ...formData, Description: event.target.value });
    }

    const handleExtraInputChange = (event) => {
        setFormData({ ...formData, Extra: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/objects', formData);
            console.log('Object uploaded successfullyy:', res.data);
            setSubmitted(true);
            setFormData({
                Title: '',
                Description: '',
                Extra: ''
            });
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
                            values={formData.Title}
                            className='AdminPageFormField'
                            placeholder='Titel'
                            name='Title'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleDescriptionInputChange}
                            values={formData.Description}
                            className='AdminPageFormField'
                            placeholder='Description'
                            name='Description'
                        />
                    </div>
                    <div className='AdminPageFormFieldDiv'>
                        <input
                            onChange={handleExtraInputChange}
                            values={formData.Extra}
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