import jack from '/src/assets/headshot.webp';
import joel from '/src/assets/headshotjoel.webp';

function WebsiteDevelopers(){

    return (
        <div className="BoxesContainer">
            <div className="AboutSectionBoxes">
                <img src={jack} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">John Rundle</div>
                <div className="BoxContent">Website developer</div>
            </div>

            
            <div className="AboutSectionBoxes">
                <img src={joel} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Joel Gochez</div>
                <div className="BoxContent">Website developer</div>
            </div>

            <div className="AboutSectionBoxes">
                <div className="BoxHeader">Anna</div>
                <div className="BoxContent">Website developer</div>
            </div>
        
        
        </div>
            
    );
        
};
        
export default WebsiteDevelopers;