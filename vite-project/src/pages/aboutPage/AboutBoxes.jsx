import headshot from '/Users/johnrundle/Capstone-Project-CS-for-Oregon/vite-project/src/assets/headshot.webp';

function AboutBoxes(){

    return (
        <div className="BoxesContainer">
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">John Rundle</div>
                <div className="BoxContent">About: Genius, Billionaire, Playboy, Philanthropist</div>
            </div>
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Text for Box 2</div>
                <div className="BoxContent">More text for Box 2</div>
            </div>
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Text for Box 3</div>
                <div className="BoxContent">More text for Box 3</div>
            </div>
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Text for Box 4</div>
                <div className="BoxContent">More text for Box 4</div>
            </div>
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Text for Box 1</div>
                <div className="BoxContent">More text for Box 1</div>
            </div>
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Text for Box 2</div>
                <div className="BoxContent">More text for Box 2</div>
            </div>
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Text for Box 3</div>
                <div className="BoxContent">More text for Box 3</div>
            </div>
            <div className="AboutSectionBoxes">
                <img src={headshot} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Text for Box 4</div>
                <div className="BoxContent">More text for Box 4</div>
            </div>
            
        </div>
    );

};

export default AboutBoxes;