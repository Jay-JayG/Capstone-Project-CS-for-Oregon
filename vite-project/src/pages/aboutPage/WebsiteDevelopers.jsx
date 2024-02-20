import jack from '/src/assets/headshot.webp';
import joel from '/src/assets/headshotjoel.webp';
import anna from '/src/assets/headshotanna.webp';


function WebsiteDevelopers(){

    return (
        
        <div className="BoxesContainer">


            <div className="AboutSectionBoxes">
                <img src={joel} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Joel Gochez</div>
                <div className="BoxContent">Website developer, Oregon State University Cascades</div>
            </div>

            <div className="AboutSectionBoxes">
                <img src={jack} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">John Rundle</div>
                <div className="BoxContent">Website developer, Oregon State University Cascades </div>
            </div>

            <div className="AboutSectionBoxes">
                <img src={anna} alt="headshot image" className="BoxImage" />
                <div className="BoxHeader">Anna Vosko</div>
                <div className="BoxContent">Website developer, Oregon State University Cascades</div>
            </div>

            
        
        
        </div>
            
    );
        
};
        
export default WebsiteDevelopers;