import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function FooterAdminPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            legal_notice: '',
        });

    const getContent = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}footer.php`);
            setFormData(res.data);
        } catch (error) {
            console.log('Error retrieving objects', error);
        }
    };

    useEffect(() => {
        getContent();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(formData);
            const res = await axios.put(`${apiBaseUrl}footer.php`, formData);
            console.log('Object uploaded successfullyy:', res.data);
            navigate(0);
        } catch (error) {
            console.error('Upload error:', error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevData => ({ ...prevData, [name]: value }));
        console.log({ name, value });
    };

    const MarkdownWithClass = ({ text, className }) => (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
                p: ({ node, children }) => <p className={className}>{children}</p>,
            }}
        >
            {text}
        </ReactMarkdown>
    );

    return (
        <div>
            <div className='AdminPageContainer'>
                <Link to="/admin" className="admin-home-button">
                    Go Back
                </Link>
                <p className='AdminPageTitle'>Footer Admin Page</p>

                <div className='AdminPageFormContainer'>
                    <form className='AdminPageForm home-page-AdminPageContainer ' onSubmit={handleSubmit}>

                        {/* <div className='inter-section-heading'>Banner Section</div> */}

                        <div className='home-admin-page-banner-container section-inputbox-padding'>



                            <div className='AdminPageFormFieldDiv'>
                                <textarea
                                    onChange={handleChange}
                                    value={formData.legal_notice}
                                    className='AdminPageFormField'
                                    placeholder='Legal Notice'
                                    name='legal_notice'
                                    cols={150}
                                    rows={10}
                                />
                            </div>

                        </div>

                        <div className='AdminPageFormFieldDiv'>
                            <button className='AdminPageSubmitButton' type='submit'>
                                Submit
                            </button>
                        </div >
                    </form>
                </div>

                <p className='AdminPageTitle'>Preview:</p>
                <footer className='footer'>
                    <div className="footer-disclaimer">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {formData.legal_notice}
                        </ReactMarkdown>
                    </div>
                </footer>
            </div>

        </div>
    );
};