import backround from './assets/backround.webp';
import logo from './assets/logo.webp';
import envelope from './assets/envelope.webp';
import './styles.css';

function HomeBanner() {
    return (
        <div style={{ position: 'relative' }}>
            <img style={{ width: '100vw' , height: '400px'}} className="background-image" src={backround} alt="background" />
            <div style={{ position: 'absolute', top: '10px', left: '1px' , display: 'flex', flexDirection: 'column'}}>
                <img className="logo-image" src={logo} alt="logo" style={{maxWidth: '250px', maxHeight: '250px'}} />
                
                <p style={{ color: '#08503B',fontFamily: 'Montserrat', fontSize: '10px',fontStyle: 'normal',fontWeight: '700', marginTop: '5px',marginLeft: '15px' }}>
                    CS for Oregon
                </p>
            </div>
            <div style={{ position: 'absolute', top: '10px', right: '15px', backgroundColor: '#1D5846', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '5px' }}>
                <img src={envelope} alt="envelope" style={{ marginRight: '5px', maxWidth: '25px', maxHeight: '25px' }} /> 
                <p style={{ color: '#FFF', fontFamily: 'Montserrat', fontSize: '8px', fontWeight: 500}}>
                    Sign Up
                </p>
            </div>
            <div style={{ color: 'grey', fontSize: '36px', fontWeight: '300' }} className="centered-text">
                Sample Text
            </div>
        </div>
    );
}

export default HomeBanner;