import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { EventPage, NewEventPage, RetrievedEventCard } from '../../../types/eventTypes';
import ReactMarkdown from 'react-markdown';
import { usePolicyText } from './PolicyPageContext.tsx';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function PolicyAdminPage() {

    //const [localPolicyText, setLocalPolicyText] = useState('');

    const { policyText, setPolicyText } = usePolicyText();
    console.log("provider", policyText);

    const handleChange = (e) => {
        console.log(e.target);
        const { value } = e.target;
        setPolicyText(value);
        console.log(policyText)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`${apiBaseUrl}policy_update.php`, { policyText });
            console.log('Object uploaded successfully:', res.data);

            // const newEventPage = res.data;
            // Update the local state to include the newly created event page
            //setEventPages((prevEventPages) => [...prevEventPages, newEventPage]);

            // Reseting the Form to be empty
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 2000);

            // getEventPages(); Redundent with local state change.
        } catch (error) {
            console.log('Error uploading object:', error);
        }
    }

    return (
        <div className='AdminPageContainer'>
            <p className='AdminPageTitle'>Policy Admin Page</p>
            <p className='text-align-center'>This is the admin page to change the text in the "Oregon Policy" text box in the policy page of the RESEARCH & POLICY drop down.</p>
            <p className='text-align-center'>You can edit the text here and press submit when you are done.</p>
            <div className='AdminPageFormContainer'>
                <form onSubmit={handleSubmit} className="major-events-form">
                    <span>Markdown is supported here. See <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Mark Down Tutorial</a> for how to use Markdown.</span>
                    <label>
                        <textarea
                            className='major-events-form-field'
                            name="event_description"
                            value={policyText}
                            onChange={handleChange}
                            required
                            rows={10}
                            cols={100}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div id="main-content">
                <div className={'Background'}>
                    <div className={'TopPageBox'}>
                        <p className="PolicyHeader"> Oregon Policy</p>
                        <div className={'TopPageText'}>
                            <div className='SummerOfCSSummaryText'>
                                <ReactMarkdown
                                    components={{
                                        a: ({ node, ...props }) => (
                                            <a {...props} target="_blank" rel="noopener noreferrer">
                                                {props.children}
                                            </a>
                                        ),
                                    }}
                                >
                                    {policyText}
                                </ReactMarkdown>
                            </div>
                            {/* <div className='SummerOfCSSummaryText'><ReactMarkdown>{policyText}</ReactMarkdown></div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}