import ResearchAndPolicyCards from "./ResearchAndPolicyCards.jsx";
import './ResearchAndPolicy.css';
import ReactMarkdown from 'react-markdown';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ResearchAndPolicy() {

    const [policyText, setPolicyText] = useState();

    useEffect(() => {

        const fetchInitialPolicyText = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}policy_update.php`); // Replace with your API endpoint for initial data
                setPolicyText(response.data.policyText);
            } catch (error) {
                console.error('Error fetching initial policy text:', error);
            }
        };

        fetchInitialPolicyText();

        const eventSource = new EventSource(`${apiBaseUrl}policy_update_sse.php`);

        // Handle incoming SSE events
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                // Update the context state with the new data
                setPolicyText(data.policyText);
            } catch (error) {
                console.error('Error parsing SSE data:', error);
            }
        };

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            eventSource.close(); // Close the connection on error
        };

        // Cleanup: close the EventSource connection when the component unmounts
        return () => {
            eventSource.close();
        };
    }, []);

    return (
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
                    </div>
                </div>
                <div>
                    <ResearchAndPolicyCards />
                </div>


            </div>
        </div>
    );
};