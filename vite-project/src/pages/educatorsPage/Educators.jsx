import { Link } from 'react-router-dom';
import EducatorsResources from './EducatorsResources.jsx';
import './Educators.css';

export default function Educators() {
    return(
        <>
            <div className="EducatorsContainer1">
                <div className="EducatorsSection1Container">
                    <h2 className="EducatorsHeading">Professional Development</h2>
                    <p className="Section1Text">Professional development plays a key role in expanding the CS teacher workforce, addressing equity gaps, recruiting and retaining both new and experienced teachers, and recruiting and retaining diverse students. Quality computer science education is only possible with: </p>
                    <ul className="Section1UnorderedList">
                        <li>Diverse, qualified CS educators in every school.</li>
                        <li>Informed school leader and counselor champions.</li>
                        <li>Research-based, scalable curriculum intentionally designed to broaden participation in computing.</li>
                    </ul>
                    <div className="EducatorsSection2Container">
                    <h2 className="EducatorsHeading2">SUMMER OF CS</h2>
                    <p className="Section2Text1">Summer of CS is a research-based professional development event for K12 educators, school leaders and school counselors to improve access, participation, equity, and engagement in high-quality computer science education for students historically marginalized in computer science education including women, English-learners, low-income, rural, Black, Latinx, and Indigenous students in all regions of Oregon.</p>
                    <p className="Section2Text2">Seasons of CS is supported by a grant from the National Science Foundation and the Oregon Department of Education</p>
                    <Link to={`SummerOfCS`} className="SummerOfCSText">Sign Up - Click Here</Link>
                </div>
                </div>
            </div>
            <div className="EducatorsContaier3">
                <div className='EducatorsSection3Container'>
                    <h2 className="EducatorsHeading3">Credentialing</h2>
                    <div className='Section3TextContaier'>
                        <p className="Section3Text1">Every Student Succeeds Act (ESSA) requires teachers be properly licensed/endorsed for each course they teach. The Course to Endorsement Catalogue is a collaborative project between Oregon Department of Education (ODE) and Oregon Teacher Standards and Practices Commission (TSPC) which identifies, by endorsement, the courses that teachers are authorized to teach.</p>
                        <p className='Section3Text2'><span className='Section3BoldText'>In-service teachers certified in any subject can teach many foundational computer science courses.</span> For example, Exploring Computer Science and AP Computer Science Principles can be taught by a teacher certified in any subject after participating in professional development. <a href='https://www.oregon.gov/ode/learning-options/CTE/TLCresources/Pages/CTE-Teacher-Licensure.aspx' target="_blank">Find the TSPC endorsement to course lookup tool here.</a> Educators from other subject areas bring a wealth of experience and pedagogical practices to a computer science classroom while also serving to promote computer science to the broader school community. This approach may help to ensure computer science educators reflect the diversity of the schools in which they teach, serving as role models to their students and promoting inclusion in their communities.</p>
                        <p className='Section3Text3'>Schools may choose to incorporate computer science courses as part of a Career and Technical Education (CTE) Computer Science Program of Study (POS).  Each CTE POS is designed to be a series of courses beginning with foundational knowledge and culminating in related postsecondary learning or progression to a related career. To teach in a state approved computer science CTE POS, an educator must have a CTE license or endorsement typically in the Arts, Information and Communications area. <a href='https://www.oregon.gov/ode/learning-options/CTE/TLCresources/Pages/CTE-Teacher-Licensure.aspx' target="_blank">Find out about CTE licensing and endorsements here.</a></p>
                        <p className='Section3Text4'><span className='Section3BoldText'>Pre-Service teacher programs</span> offer endorsements in the subject matter or specialty field in which an individual is licensed to teach. Current pre-service programs do not offer endorsements in computer science. CS for Oregon recognizes the importance of preparing both current and future computer science teachers. That’s why we are advocating for schools of education to develop pre-service computer science education programs in addition to credentialing for current teachers.</p>
                    </div>
                </div>
            </div>
            <EducatorsResources />
        </>
    );
}