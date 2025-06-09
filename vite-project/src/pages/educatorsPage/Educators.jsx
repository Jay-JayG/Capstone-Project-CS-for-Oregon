import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EducatorsResources from './EducatorsResources.jsx';
import './Educators.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useEventPages } from '../AdminPages/MajorEventsAdminPage/EventPageContext.tsx';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Educators() {

    const { eventPages } = useEventPages();
    console.log(eventPages);
    const visibleEventPage = eventPages
        .filter(page => page.hidden === "0")  // Filter out hidden pages
        .sort((a, b) => a.id - b.id)[0];   // Sort by id and take the first (smallest)

    // Set the header to the header of the first visible eventPage or use a default
    const header = visibleEventPage ? visibleEventPage.header : "Default Header";

    const [proDevAbove, setProDevAboveText] = useState("");
    const [proDevBelow, setProDevBelowText] = useState("");
    const [credentialing, setCredentialingText] = useState("");
    const [mainButton, setMainButton] = useState({
        text: "",
        link: ""
    });

    const getAboutUsText = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}resources_text.php?timestamp=${new Date().getTime()}`);
            console.log(response.data, "pro dev box");
            setProDevAboveText(response.data.proDevAbove);
            setProDevBelowText(response.data.proDevBelow);
            setCredentialingText(response.data.credentialing)
        } catch (error) {
            console.log('Error retrieving about us text', error.response?.data || error.message)
        }
    }

    const getMainButton = async () => {
        try {
            const response = await axios.get(`${apiBaseUrl}resources_button.php?timestamp=${new Date().getTime()}`);
            console.log(response.data, "response.data");
            setMainButton(response.data);
        } catch (error) {
            console.log('Error retrieving about us text', error.response?.data || error.message)
        }
    }
    useEffect(() => {
        getAboutUsText();
        getMainButton();
    }, []);

    return (
        <div id="main-content">

            <div className="EducatorsContainer1">
                <div className="EducatorsSection1Container">
                    <h2 className="EducatorsHeading">Professional Development</h2>
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            a: ({ node, ...props }) => (
                                <a {...props} target="_blank" rel="noopener noreferrer">
                                    {props.children}
                                </a>
                            ),
                        }}
                        className="Section1Text"
                    >
                        {proDevAbove}
                    </ReactMarkdown>
                    <div className="EducatorsSection2Container">
                        <Link to={mainButton.link} className="EducatorsHeading2">{mainButton.text}</Link>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer">
                                        {props.children}
                                    </a>
                                ),
                            }}
                            className="Section1Text"
                        >
                            {proDevBelow}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            <div className="EducatorsContaier3">
                <div className='EducatorsSection3Container'>
                    <h2 className="EducatorsHeading3">Credentialing</h2>
                    <div className='Section3TextContaier'>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer">
                                        {props.children}
                                    </a>
                                ),
                            }}
                            className="Section1Text"
                        >
                            {credentialing}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>

            {/* <div className="EducatorsContaier3">
                <div className='EducatorsSection3Container'>
                    <h2 className="EducatorsHeading3">Credentialing</h2>
                    <div className='Section3TextContaier'>
                        <p className="Section3Text1">Every Student Succeeds Act (ESSA) requires teachers be properly licensed/endorsed for each course they teach. The Course to Endorsement Catalogue is a collaborative project between Oregon Department of Education (ODE) and Oregon Teacher Standards and Practices Commission (TSPC) which identifies, by endorsement, the courses that teachers are authorized to teach.</p>
                        <p className='Section3Text2'><span className='Section3BoldText'>In-service teachers certified in any subject can teach many foundational computer science courses.</span> For example, Exploring Computer Science and AP Computer Science Principles can be taught by a teacher certified in any subject after participating in professional development. <a href='https://www.oregon.gov/ode/learning-options/CTE/TLCresources/Pages/CTE-Teacher-Licensure.aspx' target="_blank">Find the TSPC endorsement to course lookup tool here.</a> Educators from other subject areas bring a wealth of experience and pedagogical practices to a computer science classroom while also serving to promote computer science to the broader school community. This approach may help to ensure computer science educators reflect the diversity of the schools in which they teach, serving as role models to their students and promoting inclusion in their communities.</p>
                        <p className='Section3Text3'>Schools may choose to incorporate computer science courses as part of a Career and Technical Education (CTE) Computer Science Program of Study (POS).  Each CTE POS is designed to be a series of courses beginning with foundational knowledge and culminating in related postsecondary learning or progression to a related career. To teach in a state approved computer science CTE POS, an educator must have a CTE license or endorsement typically in the Arts, Information and Communications area. <a href='https://www.oregon.gov/ode/learning-options/CTE/TLCresources/Pages/CTE-Teacher-Licensure.aspx' target="_blank">Find out about CTE licensing and endorsements here.</a></p>
                        <p className='Section3Text4'><span className='Section3BoldText'>Pre-Service teacher programs</span> offer endorsements in the subject matter or specialty field in which an individual is licensed to teach. Current pre-service programs do not offer endorsements in computer science. CS for Oregon recognizes the importance of preparing both current and future computer science teachers. That’s why we are advocating for schools of education to develop pre-service computer science education programs in addition to credentialing for current teachers.</p>
                        <p className='Section3Text5'>If you interested in learning more about becoming a ICT CTE teacher or learning about ICT programs of study you can email Arts, Information Communication Technologies Education Specialist Jeff Rhoades at <a href='mailto:jeff.rhoades@ode.oregon.gov'>jeff.rhoades@ode.oregon.gov</a></p>
                    </div>
                </div>
            </div> */}
            <EducatorsResources />
        </div>
    );
}