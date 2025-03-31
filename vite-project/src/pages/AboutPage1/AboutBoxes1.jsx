import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


function AboutBoxes1() {

    const [profiles, setProfiles] = useState([]);

    const getProfiles = async () => {
        try {
            const res = await axios.get(`${apiBaseUrl}about_us.php?timestamp=${new Date().getTime()}`);
            setProfiles(res.data);
        } catch (error) {
            console.log('Error retrieving Profiles', error);
        }

    };

    useEffect(() => {
        console.log("Fetching profiles..."); // Debugging
        getProfiles();
    }, []);

    return (
        <div className="BoxesContainer">

            {profiles.length > 0 && Array.isArray(profiles) ? (
                profiles.map((profile) => (
                    <div key={profile.id} className="ProfileCardWrapper">
                        <div className="AboutSectionBoxes">
                            <div className="ProfileCard">
                                <p>{profile.name}</p>
                                {profile.headshot && (
                                    <img
                                        src={`data:image/jpeg;base64,${profile.headshot}`}
                                        alt={profile.name}
                                        className="BoxImage"
                                    />
                                )}
                                <div className="BoxHeader">{profile.name}</div>
                                <div className="BoxContent">
                                    <ReactMarkdown
                                        components={{
                                            a: ({ node, ...props }) => (
                                                <a {...props} target="_blank" rel="noopener noreferrer">
                                                    {props.children}
                                                </a>
                                            ),
                                        }}
                                    >
                                        {profile.title}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No profiles available.</p>
            )}

        </div>
    );

};

export default AboutBoxes1;