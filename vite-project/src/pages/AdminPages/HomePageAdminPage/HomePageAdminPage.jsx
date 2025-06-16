import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './HomePageAdminPage.css';
import Section1Left from '../../HomePage/Section1Left';
import Section1Right from '../../HomePage/Section1Right';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function HomePageAdminPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            banner_text: '',
            heading: '',
            content: '',
            heading1: '',
            content1: '',
            heading2: '',
            largeNumber1: '',
            largeNumber1context: '',
            largeNumber2: '',
            largeNumber2context: '',
            asteriskText: '',
            quote: '',
            quoteAttribution: '',
            doe: ''
        });

    const getContent = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}homepage.php`);
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
            const res = await axios.put(`${apiBaseUrl}homepage.php`, formData);
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
                <p className='AdminPageTitle'>Home Page Admin Page</p>

                <div className='AdminPageFormContainer'>
                    <form className='AdminPageForm home-page-AdminPageContainer ' onSubmit={handleSubmit}>

                        <div className='inter-section-heading'>Banner Section</div>

                        <div className='home-admin-page-banner-container section-inputbox-padding'>



                            <div className='AdminPageFormFieldDiv'>
                                <textarea
                                    onChange={handleChange}
                                    value={formData.banner_text}
                                    className='AdminPageFormField'
                                    placeholder='Banner Text'
                                    name='banner_text'
                                    cols={80}
                                />
                            </div>

                        </div>

                        <div className='inter-section-heading'>Section 1</div>

                        <div className='home-admin-page-section1-container section-inputbox-padding'>



                            <div className='home-admin-page-section1-left-container'>


                                <textarea
                                    onChange={handleChange}
                                    value={formData.heading}
                                    className='AdminPageFormField'
                                    placeholder='Heading:'
                                    name='heading'
                                    cols={80}
                                />

                                <textarea
                                    onChange={handleChange}
                                    value={formData.content}
                                    className='AdminPageFormField'
                                    placeholder='Content:'
                                    name='content'
                                    cols={80}
                                    rows={15}
                                />

                            </div>

                            <div className='home-admin-page-section1-right-container'>

                                <textarea
                                    onChange={handleChange}
                                    value={formData.heading1}
                                    className='AdminPageFormField'
                                    placeholder='Heading 1:'
                                    name='heading1'
                                    cols={80}
                                />

                                <textarea
                                    onChange={handleChange}
                                    value={formData.content1}
                                    className='AdminPageFormField'
                                    placeholder='Heading 1 Content:'
                                    name='content1'
                                    cols={80}
                                    rows={5}
                                />

                                <textarea
                                    onChange={handleChange}
                                    value={formData.heading2}
                                    className='AdminPageFormField'
                                    placeholder='Heading 2:'
                                    name='heading2'
                                    cols={80}
                                />

                                <div className='home-admin-page-section1-percentage-container'>

                                    <div className='home-admin-page-section1-percentage-section1'>


                                        <textarea
                                            onChange={handleChange}
                                            value={formData.largeNumber1}
                                            className='AdminPageFormField'
                                            placeholder='Large Number 1:'
                                            name='largeNumber1'
                                            cols={40}
                                        />

                                        <textarea
                                            onChange={handleChange}
                                            value={formData.largeNumber1context}
                                            className='AdminPageFormField'
                                            placeholder='Large Number 1 Context:'
                                            name='largeNumber1context'
                                            cols={40}
                                        />

                                    </div>

                                    <div className='home-admin-page-section1-percentage-section1'>


                                        <textarea
                                            onChange={handleChange}
                                            value={formData.largeNumber2}
                                            className='AdminPageFormField'
                                            placeholder='Large Number 2:'
                                            name='largeNumber2'
                                            cols={40}
                                        />

                                        <textarea
                                            onChange={handleChange}
                                            value={formData.largeNumber2context}
                                            className='AdminPageFormField'
                                            placeholder='Large Number 2 Context:'
                                            name='largeNumber2context'
                                            cols={40}
                                        />

                                    </div>

                                </div>

                                <textarea
                                    onChange={handleChange}
                                    value={formData.asteriskText}
                                    className='AdminPageFormField'
                                    placeholder='Asterisk Text:'
                                    name='asteriskText'
                                    cols={80}
                                />

                            </div>

                        </div>

                        <div className='inter-section-heading'>Section 2</div>

                        <div className='home-admin-page-section2-container section-inputbox-padding'>

                            <div className='AdminPageFormFieldDiv'>
                                <textarea
                                    onChange={handleChange}
                                    value={formData.quote}
                                    className='AdminPageFormField'
                                    placeholder='Quote:'
                                    name='quote'
                                    cols={200}
                                    rows={3}
                                />
                            </div>
                            <div className='AdminPageFormFieldDiv'>
                                <textarea
                                    onChange={handleChange}
                                    value={formData.quoteAttribution}
                                    className='AdminPageFormField'
                                    placeholder='Quote Attribution:'
                                    name='quoteAttribution'
                                    cols={200}
                                />
                            </div>

                        </div>

                        <div className='inter-section-heading'>Section 3</div>

                        <div className='home-admin-page-section3-container section-inputbox-padding'>

                            <div className='AdminPageFormFieldDiv'>
                                <textarea
                                    onChange={handleChange}
                                    value={formData.doe}
                                    className='AdminPageFormField'
                                    placeholder='Department of Education Section:'
                                    name='doe'
                                    cols={200}
                                    rows={8}
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

            </div>
            <div className='banner-container'>
                <div className='text-overlay'>
                    <h1>
                        {formData.banner_text}
                    </h1>
                </div>
                <span className="visually-hidden">
                    Banner image of diverse students coding.
                </span>
            </div>

            <div className='Section1'>
                <div className='Section1LeftContext'>
                    <MarkdownWithClass text={formData.heading} className='Section1LeftHeading' />
                    <MarkdownWithClass text={formData.content} className='Section1LeftText' />
                    {/* <p className='Section1LeftText'>CS for Oregon is on a mission to increase access to and participation in high quality, scalable and sustainable computer science education shown to broaden participation in computer science. We want all students to see how computing knowledge can help them thrive in college, careers, and life.</p> */}
                </div>
                <div className='Section1RightStats'>
                    <div className="Section1RightStatsHeadingsContainer">
                        <MarkdownWithClass text={formData.heading1} className='Section1RightHeading' />
                        <MarkdownWithClass text={formData.content1} className='Section1RightSubHeading' />
                    </div>
                    <div className='Section1RightSubsection1'>
                        <MarkdownWithClass text={formData.heading2} className="Section1RightSubsection1Heading" />
                        <div className="Section1RightSubsection1Container">
                            <div className="LeftPercentContainer">
                                <MarkdownWithClass text={formData.largeNumber1} className="LeftPercentNumber" />
                                <MarkdownWithClass text={formData.largeNumber1context} className="LeftPercentText" />
                            </div>
                            <div className="RightPercentContainer">
                                <MarkdownWithClass text={formData.largeNumber2} className="RightPercentNumber" />
                                <MarkdownWithClass text={formData.largeNumber2context} className="RightPercentText" />
                            </div>
                        </div>
                    </div>
                    <MarkdownWithClass text={formData.asteriskText} className="Asterisk" />
                </div>
            </div>
            <div className='Section2'>
                <MarkdownWithClass text={formData.quote} className="Section2Quote" />
                {/* <p className='Section2Quote'>
                    “Computer science has so much room for creativity. I learned so much about how I could make my ideas into reality. It taught me how to break things into smaller pieces and then build up to create the bigger picture. I find that really appealing.”
                </p> */}
                <p className="Section2Attribution">
                    {formData.quoteAttribution}
                </p>
            </div>
            <div className='Section3'>
                <div className='Section3Container'>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{
                        a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>
                                {props.children}
                            </a>
                        ),
                    }}
                        className="Section3-text">
                        {formData.doe}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};