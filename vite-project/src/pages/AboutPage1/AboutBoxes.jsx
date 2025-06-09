import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import { useProfiles } from '../../ProfileContext';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


function AboutBoxes() {

    const { profiles, setProfiles } = useProfiles();

    // Fallback fetch if someone lands directly on About page
    useEffect(() => {
        const fetchProfiles = async () => {
            if (!profiles) {
                const res = await axios.get(`${apiBaseUrl}about_us.php`);
                setProfiles(res.data);
            }
        };

        fetchProfiles();
    }, [profiles, setProfiles]);

    return (
        <div className="BoxesContainer">

            {profiles && profiles.length > 0 && Array.isArray(profiles) ? (
                 [...profiles]
                 .sort((a, b) => {
                     const aLastName = a.name.split(' ').slice(-1)[0].toLowerCase();
                     const bLastName = b.name.split(' ').slice(-1)[0].toLowerCase();
                     return aLastName.localeCompare(bLastName);
                 }).map((profile) => (
                    <div key={profile.id} className="ProfileCardWrapper">
                        <div className="AboutSectionBoxes">
                            <div className="ProfileCard">
                                <p>{profile.name}</p>
                                {profile.headshot && (
                                    <img
                                        src={`data:image/jpeg;base64,${profile.headshot}`}
                                        alt={profile.name}
                                        className="BoxImage"
                                        loading="lazy"
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
                                        rehypePlugins={[rehypeRaw]} >
                                        {profile.title}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading Profiles</p>
            )}

        </div>
    );

};

export default AboutBoxes;