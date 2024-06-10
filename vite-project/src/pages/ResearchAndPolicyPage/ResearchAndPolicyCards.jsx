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
                    The Oregon Department of Education (ODE) and the Higher Education Coordinating Commission (HECC) released:{" "}
                    <a
                        className="OregonPolicyLink"
                        href="https://www.oregon.gov/ode/schools-and-districts/grants/pages/computer-science-implementation-plan.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Oregon's Computer Science Education Statewide Implementation Plan
                    </a>
                    {" "}in December, 2023.
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
                header="K-12 Standards" content={<>Oregon has not yet adopted rigorous computer science standards that are publicly available across K-12. The future development of standards can be guided by the concepts, practices, and recommendations in the{" "}<a className="OregonPolicyLink" href="https://k12cs.org" target="_blank" rel="noopener noreferrer">K-12 Computer Science Framework.</a></>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />

            <Card 
                header="Funding" content={<>Oregon does not yet provide dedicated and sustained funding for rigorous computer science professional development and course support. Although funds may be available via broader programs, the state can strengthen its computer science programs by creating specific opportunities to bring computer science to school districts, such as matching fund programs.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Certification" content={<>Oregon does not yet have clear certification pathways for computer science teachers. The expansion of K-12 computer science education is hampered by the lack of qualified teachers. We can grow their ranks by creating clear, navigable, and rewarding professional paths for computer science teachers.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Pre-Service Programs" content={<>Oregon has not yet established programs at institutions of higher education to offer computer science to preservice teachers. The computer science teacher shortage can be addressed by exposing more preservice teachers to computer science during their required coursework or by creating specific pathways for computer science teachers.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Require High Schools to Offer" content={<>Oregon's Statewide Computer Science Implementation Plan directs that computer science education is made available to public school students on an equitable basis by the 2027/27 academic year. It recommends that all secondary schools offer at least two computer science courses, one of which must be a foundational computer science course.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={idkwtf} alt="idk mark" className="MarkIconIdk" /></div>} />
            <Card 
                header="Count Towards Graduation" content={<>Oregon has not yet passed a policy to allow computer science to count as a core graduation requirement. However, this is a district-level decision and some districts have chosen to count it as a core graduation requirement.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Higher Education Admission" content={<>Oregon does not yet allow computer science to satisfy an admission requirement at higher education institutions.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="Graduation Requirement" content={<>Oregon does not yet require students to take a computer science course to earn a high school diploma. This graduation requirement would ensure that all students get exposure to computer science.</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={X} alt="X mark" className="MarkIconX" /></div>} 
            />
            <Card 
                header="State Agency" content={<>Oregon hired its first Statewide Computer Science Education Specialist in 2023 and put it after Pre-Service Programs</>} mark={<div className="MarkContainer"><img src={background} alt="position" className="MarkBackground" /><img src={Check} alt="Check mark" className="MarkIconCheck" /></div>} 
            />



            </div>


        </>
    );
};

export default ResearchAndPolicyCards;
