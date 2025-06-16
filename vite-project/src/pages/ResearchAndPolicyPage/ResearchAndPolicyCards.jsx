import "./ResearchAndPolicy.css"
import React, { useEffect, useState } from 'react';
import Check from '/src/assets/Check.webp';
import X from '/src/assets/Xmark.webp';
import idkwtf from '/src/assets/idkwtf.webp';
import background from '/src/assets/greentored.webp';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

import Card from './checkbox';

function ResearchAndPolicyCards() {

    const [Policies, setPolicies] = useState([]);
    const getStatePolicies = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}state_policies.php?timestamp=${new Date().getTime()}`);
            console.log('Retrieved:', res.data);
            setPolicies(res.data);
        } catch (error) {
            console.error('Error retrieving state policies:', error);
        }
    }

    useEffect(() => {
        getStatePolicies();
    }, []);

    function getMarkIcon(implementation) {
        switch (implementation) {
            case "1":
                return <img src={Check} alt="Check mark" className="MarkIconCheck" />;
            case "2":
                return <img src={idkwtf} alt="idk mark" className="MarkIconIdk" />;
            case "3":
                return <img src={X} alt="X mark" className="MarkIconX" />;
            default:
                return null; // Or a fallback icon/message
        }
    }

    return (
        <>

            <div className="CardsContainer">

                {Policies.length > 0 && Array.isArray(Policies) ? (
                    Policies.map((policy) => (<div key={policy.id}>
                        <Card

                            header={policy.title}
                            content={policy.text}
                            mark={
                                <div className="MarkContainer">
                                    <img src={background} alt="position" className="MarkBackground" />
                                    {getMarkIcon(policy.implementation)}
                                </div>
                            }
                        />
                        {/* <button onClick={() => handleDelete(policy.id)}>Delete</button>
                        <button onClick={() => handleEdit(policy)}>Edit</button> */}
                    </div>
                    ))) : (<p>Loading State Policies</p>)}



            </div>


        </>
    );
};

export default ResearchAndPolicyCards;
