import logo from './assets/logo.webp';
import './styles.css'

function Footer(){

    return(
        <footer style={{ backgroundColor: '#4D6485' , fontFamily: 'Montserrat, sans-serif'}} className= 'footer'>
            <h1 style={{ textAlign: 'left', marginTop: '30px', marginLeft: '30px'}} className= "footer-textbox">CS For All In Oregon</h1>
            <img className="logo-image" src={logo} alt="logo" />
            
            <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '80px', marginRight: '40px'}} className= 'top-right-div'>
                <div style={{marginRight: '40px'}}>
                    <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className= "footer-textbox">
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
                            <li><a href='#' className="footer-textbox">Accessibility</a></li>
                            <li><a href='#' className="footer-textbox">Private Policy</a></li>
                            <li><a href='#' className="footer-textbox">Contact Us</a></li>
                            <li><a href='#' className="footer-textbox">Media</a></li>
                        </ul>
                    </nav>
                </div>
                
                <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '20px', margin: '0' }} className= "footer-textbox">Join Our Mailing List</p>
                    <p style={{ margin: '5px 0', fontWeight: '400'}} className= "footer-textbox">Never miss an update</p>
                    <input type="email" placeholder="your@email.com" style={{ padding: '10px', border: 'none', borderRadius: '5px', fontSize: '16px', width: '250px' }} />
                </div>
            </div>
            <div>
                <p>&copy; {new Date().getFullYear()} COPYRIGHT CS FOR OREGON – ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
};

export default Footer;