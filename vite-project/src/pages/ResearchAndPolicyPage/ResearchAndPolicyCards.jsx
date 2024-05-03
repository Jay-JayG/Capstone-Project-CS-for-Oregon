import "./ResearchAndPolicy.css"
import Check from '/src/assets/Check.webp';
import X from '/src/assets/Xmark.webp';
import idkwtf from '/src/assets/idkwtf.webp';
import background from '/src/assets/greentored.webp';

import Card from './checkbox';

function ResearchAndPolicyCards() {
    return (
        <>   
        
            <div className="CardsContainer">

            <Card
                header="State Plan"
                content={
                    <>
                    The Oregon Department of Education released a statewide implementation plan for CS education in December 2023:{" "}
                    <a
                        className="OregonPolicyLink"
                        href="https://www.oregon.gov/ode/schools-and-districts/grants/pages/computer-science-implementation-plan.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Oregon CS Education Statewide Implementation Plan.
                    </a>
                    </>
                    }
                    mark={
                        <div className="MarkContainer">
                          <img src={background} alt="position" className="MarkBackground" />
                          <img src={Check} alt="Check mark" className="MarkIconCheck" />
                        </div>
                      }
                />

                

            <Card 
                header="K-12 Standards" content={<>Oregon has not yet adopted rigorous CS standards that are publicly available across K-12. The future development of standards can be guided by the concepts, practices, and recommendations in the{" "}<a className="OregonPolicyLink" href="http://www.k12cs.org" target="_blank" rel="noopener noreferrer">K-12 Computer Science Framework.</a></>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />

            <Card 
                header="Funding" content={<>Oregon does not yet provide dedicated and sustained funding for rigorous CS professional development and course support. Although funds may be available via broader programs, the state can strengthen its CS programs by creating specific opportunities to bring CS to school districts, such as matching fund programs.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Certification" content={<>Oregon does not yet have clear certification pathways for CS teachers. The expansion of K-12 CS education is hampered by the lack of qualified teachers. We can grow their ranks by creating clear, navigable, and rewarding professional paths for CS teachers.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Pre-Service Programs" content={<>Oregon has not yet established programs at institutions of higher education to offer CS to preservice teachers. The CS teacher shortage can be addressed by exposing more preservice teachers to CS during their required coursework or by creating specific pathways for CS teachers.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Require High Schools to Offer" content={<>Oregon's Statewide Computer Science Implementation Plan directs that Computer science education is made available to public school students on an equitable basis by the 2027/27 academic year. It recommends that all secondary schools offer at least two computer science courses, one of which must be a foundational computer science course.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={idkwtf} alt="idk mark" className="MarkIconIdk" /></div>} />
            <Card 
                header="Count Towards Graduation" content={<>Oregon has not yet passed a policy to allow CS to count as a fourth science elective for graduation, but it is a district-level decision.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Higher Education Admission" content={<>Oregon does not yet allow CS to count as a core admission requirement at institutions of higher education.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Graduation Requirement" content={<>Oregon does not yet require students to take a CS course to earn a high school diploma. This graduation requirement would ensure that all students get exposure to CS.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="State Agency" content={<>Establish dedicated computer science positions in a state education agency</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={Check} alt="Check mark" className="MarkIconCheck" /></div>} 
            />



            </div>


        </>
    );
};

export default ResearchAndPolicyCards;
