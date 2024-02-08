import CSSummerPhoto from '/src/assets/summer_of_cs_photo.png';
import './SummerOfCS.css';

export default function OldSummerOfCS() {
    return (
        <div className="SummerOfCSContainer">
            <div className="SummerOfCSEvent1Container">
                <div className="NAF1leftcontainer">
                    <p className="Heading">EVENTS</p>
                    <div className='SubHeadingsContainer'>
                        <p>SUMMER OF CS</p>
                        <p>K12 CS Equity Summit & Workshops</p>
                        <p>Bend,Oregon</p>
                        <p>July 29 - Aug 2, 2024</p>
                    </div>
                    <div className='UnorderedListContainer'>
                        <ul>
                            <li>Exploring Computer Science Teacher PD | July 29- Aug 2</li>
                            <li>E-Textiles Teacher PD | July 29-Aug 1</li>
                            <li>Administrator & Counselor Workshop | July 30- July 31</li>
                            <li>Computational Training in Elementary Core | July 30 - 31</li>
                            <li>Rafting, Food, Breweries, Deer Crossings</li>
                        </ul>
                    </div>
                    <div className='LearnMoreButtonContainer'>
                        <div className="LearnMoreButton">Learn More!</div>
                    </div>
                </div>
                <div className='NAF1Rightcontaienr'>
                    <img className="CSSummerPhoto" src={CSSummerPhoto} alt="CSSummerPhoto" />
                </div>
            </div>
            <div className="SummerOfCSEvent1Text">
                <p className='textblock1'>Summer of CS is a research-based professional development event for K12 educators, school leaders and school counselors to improve access, participation, equity, and engagement in high-quality computer science education for students historically marginalized in computer science education including women, English-learners, low-income, rural, Black, Latinx, and Indigenous students in all regions of Oregon.</p>
                <p className='textblock2'>Seasons of CS is supported by a grant from the National Science Foundation and the Oregon Department of Education</p>
            </div>
        </div>
    );
};