import CSEdu from '/src/assets/cs_education_statewide_implementation_plan.png';
import K12CSFramework from '/src/assets/K12-CS-Framework-Image.png';
import CS_Teachers_Association from '/src/assets/CS-Teachers-Association-Image.png';

export default function EducatorsResources() {
    return (
        <div className="EducatorsResourcesContainer">
            <p className="ResourcesHeading">Teaching & Learning Resources</p>
            <div className="MediaContainer">
                <div className="MediaSubContainer1">
                    <div className="Media1">
                        <div className='Media_1Container'>
                        <img className='CSEdu' src={CSEdu} alt='Computer Science Education Statewide Implementation Plan Photo' />
                            <a className='Media1Link1' href='https://www.oregon.gov/ode/schools-and-districts/grants/pages/computer-science-implementation-plan.aspx'>Oregon Statewide Computer Science Implementation Plan</a>
                        </div>
                        <div className='Media_2Container'>
                            <img className='K12CSFramework' src={K12CSFramework} alt='K12 Computer Science Framework Youtube Thumnail' />   
                            <a className='Media1Link2' href='https://k12cs.org/'>K-12 Computer Science Framework</a>
                        </div>
                        <div className='Media_3Container'>
                            <img className='CS_Teachers_Association' src={CS_Teachers_Association} alt='Computer Science Teachers’ Association Photo' />
                            <a className='Meida1Link3' href='https://csteachers.org/'>Computer Science Teachers’ Association</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}