import CSSummerPhoto from '/src/assets/summer_of_cs_photo.png';
import CSSymposiumLogo from '../../assets/CS_SYM_JAN2024.png';
import ECSLogo from '/src/assets/ECS-Logo-.png';
import StitchingTheLoopLogo from '../../assets/stitching-the-loop-logo-transparent-bkgrnd.webp';
import './SummerOfCS.css';
export default function SummerOfCS() {
    return (
        <div className='SummerOfCSSupercontainer'>
            <div className='SummerCSPageTitle'>SUMMER EQUITY SYMPOSIUM</div>
            <div className="SummerOfCScontainer">
                <div className="SummerOfCSHeaderContainer">
                    <div className="SummerOfCSHeaderContainerText">
                        <div className='SummerOfCSHeaderContainerTextHeader'>Summer Equity Symposium</div>
                        <div className='SummerOfCSHeaderContainerTextBody'>OSU-Cascades</div>
                        <div className='SummerOfCSHeaderContainerTextBody'>Bend, Oregon</div>
                        <div className='SummerOfCSHeaderContainerTextBody'>July 29 - Aug 2, 2024</div>
                        <img className='CSSymposiumLogo' src={CSSymposiumLogo} alt="Summer Equity Symposium Logo" />
                    </div>
                    <div className='SummerOfCSHeaderPhotoContainer'>
                        <img className="SummerOfCSHeaderPhoto" src={CSSummerPhoto} alt="CSSummerPhoto" />
                    </div>
                </div>
            </div>
            <div className='SummerOfCSSummary'>
                <div className='SummerOfCSSummaryText'><span className='SummerOfCSSummaryTextBold'>CS for Oregon</span> is hosting a K12 Computer Science Equity Summit in Bend, Oregon this summer for educators, school leaders and school counselors.  To join us, please submit an application for one of the four professional development (PD) opportunities described below.</div>
                <br></br>
                <div className='SummerOfCSSummaryText'>We look forward to working with you to expand computer science educational opportunities for all in Oregon!  </div>
            </div>
            <div className='SummerOfCSEventItem1'>
                <img className='SummerOfCSEventItem1HeadingPhotoSpacer' src={ECSLogo} />
                <div className='SummerOfCSEventItem1Heading'>Exploring Computer Science Teacher PD</div>
                <img className='SummerOfCSEventItem1HeadingPhoto' src={ECSLogo} alt="Exploring Computer Science Logo" />
            </div>
            <div className='SummerOfCSEventItem1SummaryContainer'>
                <div className='SummerOfCSEventItem1SummaryText'><span className='SummerOfCSBoldText'>What:</span> Exploring Computer Science is a year-long, research-based, high school foundational computer science curriculum and teacher professional development program shown to broaden  participation in computing.</div>
                <div className='SummerOfCSEventItem1SummaryText'><span className='SummerOfCSBoldText'>When:</span>  July 29 - Aug 2, 2024</div>
                <div className='SummerOfCSEventItem1SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon high school educators who are certified in any subject and interested in teaching ECS at their school. </div>
                <div className='SummerOfCSEventItem1SummaryEventOptionsContainer'>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Event Flyer</a>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Apply Here</a>
                </div>
            </div>
            <div className='SummerOfCSEventItem2'>
                <img className='SummerOfCSEventItem2HeadingPhotoSpacer' src={StitchingTheLoopLogo} />
                <div className='SummerOfCSEventItem2Heading'>E-Textiles Teacher PD</div>
                <img className='SummerOfCSEventItem2HeadingPhoto' src={StitchingTheLoopLogo} alt="Stitching the Loop Logo" />
            </div>
            <div className='SummerOfCSEventItem2SummaryContainer'>
                <div className='SummerOfCSEventItem2SummaryText'><span className='SummerOfCSBoldText'>What:</span> E-Textiles is an engaging, introductory, research-based high school computer science unit for Exploring Computer Science. E-Textiles are fabric-based crafts made with conductive thread, microcontrollers, lights, sensors, and other electronic components.</div>
                <div className='SummerOfCSEventItem2SummaryText'><span className='SummerOfCSBoldText'>When:</span>  July 29 - Aug 1, 2024</div>
                <div className='SummerOfCSEventItem2SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon high school educators who are certified in any subject and interested in teaching ECS at their school. </div>
                <div className='SummerOfCSEventItem2SummaryEventOptionsContainer'>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Event Flyer</a>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Apply Here</a>
                </div>
            </div>
            <div className='SummerOfCSEventItem3'>
                <div className='SummerOfCSEventItem3Heading'>Administrator & Counselor Workshop</div>
            </div>
            <div className='SummerOfCSEventItem3SummaryContainer'>
                <div className='SummerOfCSEventItem3SummaryText'><span className='SummerOfCSBoldText'>What:</span> Administrators and counselors will gain a deeper understanding of the barriers and opportunities for implementing equitable CS education, and network with other school leaders who are passionate about making CS education accessible to all students.</div>
                <div className='SummerOfCSEventItem3SummaryText'><span className='SummerOfCSBoldText'>When:</span>  July 30 - 31, 2024</div>
                <div className='SummerOfCSEventItem3SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon administrators, TOSA, school leaders, and counselors</div>
                <div className='SummerOfCSEventItem3SummaryEventOptionsContainer'>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Event Flyer</a>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Apply Here</a>
                </div>
            </div>
            <div className='SummerOfCSEventItem4'>
                <div className='SummerOfCSEventItem4Heading'>Computational Thinking in Elementary PD</div>
            </div>
            <div className='SummerOfCSEventItem4SummaryContainer'>
                <div className='SummerOfCSEventItem4SummaryText'><span className='SummerOfCSBoldText'>What:</span>  Elementary teachers will gain a deeper understanding of what computational thinking (CT) is and learn how to incorporate CT concepts into core elementary school subjects.</div>
                <div className='SummerOfCSEventItem4SummaryText'><span className='SummerOfCSBoldText'>When:</span>  July 30 - 31, 2024</div>
                <div className='SummerOfCSEventItem4SummaryText'><span className='SummerOfCSBoldText'>Who is it for:</span> Oregon elementary school teachers</div>
                <div className='SummerOfCSEventItem4SummaryEventOptionsContainer'>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Event Flyer</a>
                    <a href='' className='SummerOfCSEventItem4SummaryEventOptionsFlyer'>Apply Here</a>
                </div>
            </div>
            <div className='CSForOregonDescriptionContainer'>
                <div className='CSForOregonDescriptionText'><span className='CSForOregonBoldText'>CS for Oregon</span> hosts research-based PD events for K12 educators, school leaders and school counselors to improve access, participation, equity, and engagement in high-quality computer science education. Particular emphasis is for students historically marginalized in computer science education including women, English-learners, low-income, rural, Black, Latinx, and Indigenous students in all regions of Oregon.</div>
                <br></br>
                <div className='CSForOregonDescriptionText'>The CS for Oregon PD series is supported by a grant from the National Science Foundation and the Oregon Department of Education.</div>
            </div>
        </div>
    );
};