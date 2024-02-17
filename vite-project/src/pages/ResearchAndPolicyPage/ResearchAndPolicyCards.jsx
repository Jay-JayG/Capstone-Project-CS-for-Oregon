import "./ResearchAndPolicy.css"
import Check from '/src/assets/Check.webp';
import X from '/src/assets/Xmark.webp';
import idkwtf from '/src/assets/idkwtf.webp';

function ResearchAndPolicyCards() {
    return (
        <>
            <div className="CardsContainer">
                <div className="GreenCard">
                    <div className="CardHeader"> State Plan </div>
                    <img src={Check} alt="Check mark" className="Icon" />
                    <p className="BoxContent2">The Oregon Department of Education released a statewide implementation plan for CS education in December 2023: <a className='OregonPolicyLink' href="https://www.oregon.gov/ode/schools-and-districts/grants/pages/computer-science-implementation-plan.aspx">Oregon CS Education Statewide Implementation Plan.</a></p>
                </div>

                <div className="RedCard">
                    <div className="CardHeader"> K-12 Standards </div>
                    <img src={X} alt="X mark" className="Icon" />
                    <p className="BoxContent2">Oregon has not yet adopted rigorous CS standards that are publicly available across K-12. The future development of standards can be guided by the concepts, practices, and recommendations in the <a className='OregonPolicyLink' href='http://www.k12cs.org'>K-12 Computer Science Framework.</a></p>
                </div>

                <div className="RedCard">
                    <div className="CardHeader"> Funding </div>
                    <img src={X} alt="X mark" className="Icon" />
                    <p className="BoxContent2">Oregon does not yet provide dedicated and sustained funding for rigorous CS professional development and course support. Although funds may be available via broader programs, the state can strengthen its CS programs by creating specific opportunities to bring CS to school districts, such as matching fund programs.</p>
                </div>

                <div className="RedCard">
                    <div className="CardHeader"> Certification </div>
                    <img src={X} alt="X mark" className="Icon" />
                    <p className="BoxContent2">Oregon does not yet have clear certification pathways for CS teachers. The expansion of K-12 CS education is hampered by the lack of qualified teachers. We can grow their ranks by creating clear, navigable, and rewarding professional paths for CS teachers.</p>
                </div>

                <div className="RedCard">
                    <div className="CardHeader"> Pre-Service Programs </div>
                    <img src={X} alt="X mark" className="Icon" />
                    <p className="BoxContent2">Oregon has not yet established programs at institutions of higher education to offer CS to preservice teachers. The CS teacher shortage can be addressed by exposing more preservice teachers to CS during their required coursework or by creating specific pathways for CS teachers.</p>
                </div>

                <div className="YellowCard">
                    <div className="CardHeader"> Require High Schools to Offer  </div>
                    <img src={idkwtf} alt="idk mark" className="Icon" />
                    <p className="BoxContent2">Oregon’s Statewide Computer Science Implementation Plan directs that Computer science education is made available to public school students on an equitable basis by the 2027/27 academic year. It recommends that all secondary schools offer at least two computer science courses, one of which must be a foundational computer science course.</p>
                </div>

                <div className="RedCard">
                    <div className="CardHeader"> Count Towards Graduation </div>
                    <img src={X} alt="X mark" className="Icon" />
                    <p className="BoxContent2"> Oregon has not yet passed a policy to allow CS to count as a fourth science elective for graduation, but it is a district-level decision.</p>
                </div>

                <div className="RedCard">
                    <div className="CardHeader"> Higher Education Admission  </div>
                    <img src={X} alt="X mark" className="Icon" />
                    <p className="BoxContent2"> Oregon does not yet allow CS to count as a core admission requirement at institutions of higher education.</p>
                </div>

                <div className="RedCard">
                    <div className="CardHeader"> Graduation Requirement </div>
                    <img src={X} alt="X mark" className="Icon" />
                    <p className="BoxContent2"> Oregon does not yet require students to take a CS course to earn a high school diploma. This graduation requirement would ensure that all students get exposure to CS. </p>
                </div>



            </div>


        </>
    );
};

export default ResearchAndPolicyCards;
