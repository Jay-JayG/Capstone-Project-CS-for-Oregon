import { Link } from "react-router-dom";
import './NavigationBar.css'

export default function NavigationBar(){

    return (
        <nav className='NavigationBar'>
            <div className='NavLinksContainer'>
                <div>
                    <Link to={`/`} className="Home">HOME</Link>
                </div>
                <div>
                    <Link to={`About`} className="navLink">ABOUT</Link>
                </div>
                <div>
                    <Link to={`Educators`} className="navLink">EDUCATORS, ADMINISTRATORS & COUNSELORS</Link>
                </div>
                <div>
                    <Link to={`NEWS`} className="navLink">NEWS & FEATURES</Link>
                </div>
                <div>
                    <a href='#' className="navLink">SUMMER OF CS</a>
                </div>
            </div>
        </nav>
    );
};