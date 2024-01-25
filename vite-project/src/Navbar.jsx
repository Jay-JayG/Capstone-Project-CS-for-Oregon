import { Link } from "react-router-dom";
import './styles.css'

function Navbar(){

    return (
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='fixedNav'>
                <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
                    <li style={{ marginRight: '20px' }}>
                        <Link to={`/`} className="navLink">Home</Link>
                    </li >
                    <li style={{ marginRight: '20px' }}>
                        <Link to={`About`} className="navLink">About</Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <Link to={`Educators`} className="navLink">CS Educators</Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                    <Link to={`Research&Policy`} className="navLink">Research & Policy</Link>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <a href='#' className="navLink">News & Features</a>
                    </li>
                    <li style={{ marginRight: '20px' }}>
                        <a href='#' className="navLink">Take Action</a>
                    </li>
                </ul>
                
            </nav>
    );


};

export default Navbar;