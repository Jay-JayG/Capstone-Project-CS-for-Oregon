import CSSummerPhoto from '/src/assets/summer_of_cs_photo.png';
import CSSymposiumLogo from '../../assets/CS_SYM_JAN2024.png';
import ECSLogo from '/src/assets/ECS-Logo-.png';
import StitchingTheLoopLogo from '../../assets/stitching-the-loop-logo-transparent-bkgrnd.webp';
import './SummerOfCS.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SummerOfCS() {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const getObjects = async () => {
            try {
                const res = await axios.get("/api/endpoint");
                //const res = await axios.get("http://localhost/get_data.php"); // For local development
                setObjects(res.data);
                console.log(res.data)
            } catch (error) {
                console.log('Error retrieving objects', error);
            }
        };
        getObjects('news');
    }, []);

    const filteredObjects = objects.filter(obj => obj.news_type === '1');

    return (
        <div id="main-content">
            <div className='SummerOfCSSupercontainer'>
                <div className="SummerOfCScontainer">
                    <div className="SummerOfCSHeaderContainer">
                        <div className="SummerOfCSHeaderContainerText">
                            <div className='SummerOfCSHeaderContainerTextHeader'>Summer Equity Symposium</div>
                            <div className='SummerOfCSHeaderContainerTextBody'>OSU-Cascades</div>
                            <div className='SummerOfCSHeaderContainerTextBody'>Bend, Oregon</div>
                            <div className='SummerOfCSHeaderContainerTextBody'>July 29 - August 2, 2024</div>
                            <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" />
                        </div>
                        <div className='SummerOfCSHeaderPhotoContainer'>
                            <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="Summer Equity Symposium Group Photo" />
                        </div>
                    </div>
                </div>
                <div className='SummerOfCSSummary'>
                    <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>CS for Oregon</span> is hosting a K12 Computer Science Equity Summit in Bend, Oregon this summer for educators, school leaders and school counselors.  To join us, please submit an application for one of the four professional development (PD) opportunities described below.</div>
                </div>
                {/* <div className='SummerOfCSEventItem1'>

                    <div className='SummerOfCSEventItem1Heading'>Exploring Computer Science Teacher Professional Development</div>
                    <img className='SummerOfCSEventItem1HeadingPhoto' src={ECSLogo} alt="Exploring Computer Science Logo" />
                </div>
                <div className='SummerOfCSEventItem1SummaryContainer'>
                    <div className='SummerOfCSEventItem1SummaryText'><span className='SummerOfCSBoldText'>What: Exploring Computer Science</span> is a year-long, research-based, high school foundational computer science curriculum and teacher professional development program shown to broaden  participation in computing.</div>
                    <div className='SummerOfCSEventItem1SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon high school educators who are certified in any subject and interested in teaching ECS at their school. </div>
                    <div className='SummerOfCSEventItem1SummaryText'><span className='SummerOfCSBoldText'>When:</span>  July 29 - August 2, 2024</div>
                    <div className='SummerOfCSEventItem1SummaryEventOptionsContainer'>
                        <a className='SummerOfCSEventItem1SummaryEventOptionsFlyer' href='https://drive.google.com/file/d/1KE8GDDz4yj9cJujcfAH-7rkKHfThm2HO/view?usp=sharing' target='_blank'>Event Flyer</a>
                        <a className='SummerOfCSEventItem1SummaryEventOptionsFlyer' href='https://oregonstate.qualtrics.com/jfe/form/SV_0CCQlCf5FSHJxPM' target='_blank'>Apply Here</a>
                    </div>
                </div>
                <div className='SummerOfCSEventItem2'>

                    <div className='SummerOfCSEventItem2Heading'>E-Textiles Teacher Professional Development</div>
                    <img className='SummerOfCSEventItem2HeadingPhoto' src={StitchingTheLoopLogo} alt="Stitching the Loop Logo" />
                </div>
                <div className='SummerOfCSEventItem2SummaryContainer'>
                    <div className='SummerOfCSEventItem2SummaryText'><span className='SummerOfCSBoldText'>What: E-Textiles</span> is an engaging, introductory, research-based high school computer science unit for Exploring Computer Science(ECS). E-Textiles are fabric-based crafts made with conductive thread, microcontrollers, lights, sensors, and other electronic components.</div>
                    <div className='SummerOfCSEventItem2SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon high school educators with ECS teaching experience (more than one year) and completion of the ECS PD. ECS teachers are encouraged to invite an art teacher colleague at their school. Not an ECS trained teacher yet? Apply for the ECS Teacher PD and become one.</div>
                    <div className='SummerOfCSEventItem2SummaryText'><span className='SummerOfCSBoldText'>When:</span>  July 29 - August 1, 2024</div>
                    <div className='SummerOfCSEventItem2SummaryEventOptionsContainer'>
                        <a className='SummerOfCSEventItem2SummaryEventOptionsFlyer' href='https://drive.google.com/file/d/1w3QoDAEPTzTywabyNjIAjFjLVLGtDC2h/view?usp=sharing' target='_blank'>Event Flyer</a>
                        <a className='SummerOfCSEventItem2SummaryEventOptionsFlyer' href='https://oregonstate.qualtrics.com/jfe/form/SV_73etRVz37wQH8t8' target='_blank'>Apply Here</a>
                    </div>
                </div>
                <div className='SummerOfCSEventItem3'>
                    <div className='SummerOfCSEventItem3Heading'>CS Equity Workshop for School Leaders</div>
                </div>
                <div className='SummerOfCSEventItem3SummaryContainer'>
                    <div className='SummerOfCSEventItem3SummaryText'><span className='SummerOfCSBoldText'>What: School leaders</span> will gain a deeper understanding of the barriers and opportunities for implementing equitable computer science (CS) education in their schools and districts. This is in preparation for meeting  <a href='https://www.oregon.gov/ode/schools-and-districts/grants/pages/computer-science-implementation-plan.aspx' target='_blank'>Oregon’s Statewide CS Implementation Plan</a> goal of providing equitable computer science education to public school students by 2027-28.</div>
                    <div className='SummerOfCSEventItem3SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon School and District Administrators, Teachers on Special Assignment, Curriculum Directors, Counselors, and other equity-focused school leaders.</div>
                    <div className='SummerOfCSEventItem3SummaryText'><span className='SummerOfCSBoldText'>When:</span>  July 30 - 31, 2024</div>
                    <div className='SummerOfCSEventItem3SummaryEventOptionsContainer'>
                        <a className='SummerOfCSEventItem3SummaryEventOptionsFlyer' href='https://drive.google.com/file/d/12RyEFqnIe4YxqOCxgymGZK00eU-HkZ5H/view?usp=sharing' target='_blank'>Event Flyer</a>
                        <a className='SummerOfCSEventItem3SummaryEventOptionsFlyer' href='https://oregonstate.qualtrics.com/jfe/form/SV_bJhJQXgTRuYXid0' target='_blank'>Apply Here</a>
                    </div>
                </div>
                <div className='SummerOfCSEventItem4'>
                    <div className='SummerOfCSEventItem4Heading'>The Thinking in Computational Thinking for K-5 PD</div>
                </div>
                <div className='SummerOfCSEventItem4SummaryContainer'>
                    <div className='SummerOfCSEventItem4SummaryText'><span className='SummerOfCSBoldText'>What: Elementary teachers</span> will learn the fundamentals of computational thinking and  discover its applications across core subjects like math, science, and language arts. They will learn how to integrate computational thinking concepts into their curriculum, enhancing student understanding and critical thinking skills.</div>
                    <div className='SummerOfCSEventItem4SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon elementary school teachers</div>
                    <div className='SummerOfCSEventItem4SummaryText'><span className='SummerOfCSBoldText'>When:</span> July 30 - 31, 2024</div>
                    <div className='SummerOfCSEventItem4SummaryEventOptionsContainer'>
                        <a className='SummerOfCSEventItem4SummaryEventOptionsFlyer' href='https://drive.google.com/file/d/1mclDApms1-tPCe5iic9JDMt0VM0C3Rx-/view?usp=sharing' target='_blank'>Event Flyer</a>
                        <a className='SummerOfCSEventItem4SummaryEventOptionsFlyer' href='https://oregonstate.qualtrics.com/jfe/form/SV_0f9WnqEhYpivQJo' target='_blank'>Apply Here</a>
                    </div>
                </div>
                <div className='CSForOregonDescriptionContainer'>
                    <div className='CSForOregonDescriptionText'><span className='CSForOregonBoldText'>CS for Oregon</span> hosts research-based PD events for K12 educators, school leaders and school counselors to improve access, participation, equity, and engagement in high-quality computer science education. Particular emphasis is for students historically marginalized in computer science education including women, English-learners, low-income, rural, Black, Latinx, and Indigenous students in all regions of Oregon.</div>
                    <br></br>
                    <div className='CSForOregonDescriptionText'>The CS for Oregon PD series is supported by a grant from the National Science Foundation and the Oregon Department of Education.</div>
                </div> */}
                <div className='summer-of-cs-event-cards-container'>
                    {filteredObjects.map((obj, index) => (
                        <div key={index} className='event-cards-background'>
                            <div className='event-card-title' href={obj.bold}>{obj.title}</div>
                            <div className='event-card-description'><span className='event-bold-text'>What: {obj.bold} </span>{obj.what}</div>
                            <div className='event-card-date'><span className='event-bold-text'>Who is it for: </span>{obj.who}</div>
                            <div className='event-card-date'>{obj.when_date}</div>
                            {obj.is_full === "1" ? (
                                <div className='event-full'>
                                    <h3>Event Full</h3>
                                    We're sorry, but this event is currently at full capacity. Stay tuned for future opportunities.
                                </div>
                            ) : null}
                            <div className='event-buttons-container'>
                                <a className='event-buttons-Flyer' href={obj.flyer_link} target='_blank'>Event Flyer</a>
                                {obj.is_full === "1" ? (
                                    <div className='event-buttons-Flyer-disabled'>Event Full</div>
                                ) : <a className='event-buttons-Flyer' href={obj.apply_link} target='_blank'>Apply Here</a>}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};