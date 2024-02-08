import CSSummerPhoto from '/src/assets/summer_of_cs_photo.png';
import ECSLogo from '/src/assets/ECS-Logo-.png';
import './SummerOfCS.css';
export default function SummerOfCS() {
    return (
        <div className='SummerOfCSSupercontainer'>
            <div className="SummerOfCScontainer">
                <div className="SummerOfCSHeaderContainer">
                    <div className="SummerOfCSHeaderContainerText">
                        <div className='SummerOfCSHeaderContainerTextHeader'>SUMMER OF CS</div>
                        <div className='SummerOfCSHeaderContainerTextSubheading'>K12 CS Equity Summit</div>
                        <div className='SummerOfCSHeaderContainerTextBody'>OSU-Cascades</div>
                        <div className='SummerOfCSHeaderContainerTextBody'>Bend ,Oregon</div>
                        <div className='SummerOfCSHeaderContainerTextBody'>July 29 - Aug 2, 2024</div>
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
                <div className='SummerOfCSEventItem1Heading'>Heading Event 1</div>
                <img className='SummerOfCSEventItem1HeadingPhoto' src={ECSLogo} alt="Exploring Computer Science Logo" />
            </div>
        </div>
    );
};