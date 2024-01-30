import jack from '/src/assets/headshot.webp';


function WebsiteDevelopers(){

    return (
        <div className="BoxesContainer">
            <div className="AboutSectionBoxes">
                <img src={jack} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">John Rundle</div>
                <div className="BoxContent">Website developer</div>
            </div>
        </div>
            
    );
        
};
        
export default WebsiteDevelopers;