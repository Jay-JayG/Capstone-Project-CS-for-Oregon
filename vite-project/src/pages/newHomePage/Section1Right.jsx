import Section1RightSubsection1 from "./Section1RightSubsection1";

function Section1Right() {

    return (
        <div className='Section1RightStats'>
            <div className="Section1RightStatsHeadingsContainer">
                <h2 className='Section1RightHeading' >ACCESS VS PARTICIPATION</h2>
                <p className='Section1RightSubHeading' >Oregon has a <span className='Section1RightSubHeadingBoltText'>participation</span> problem in CS education, particularly among girls and students of color.</p>
            </div>
            <Section1RightSubsection1 />
        </div>
    );
};

export default Section1Right;