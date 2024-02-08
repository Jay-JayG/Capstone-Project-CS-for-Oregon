import { Link } from "react-router-dom";
import CS_logo from '/src/assets/logo.png';
import envelope from '/src/assets/envelope.webp';
import './NavigationBar.css'

export default function NavigationBar(){

    return (
        <nav className='NavigationBar'>
            <div className='NavLinksContainer'>
                <div className="item1">
                    <Link to={`/`} className="LogoContainer">
                        <img src={CS_logo} className="CS_logo" alt="logo" />
                        <div className="CSForOregon">CS For Oregon</div>
                    </Link>
                </div>
                <div className="item2">
                    <Link to={`/`} className="navLink">HOME</Link>
                </div>
                <div className="item3">
                    <Link to={`About`} className="navLink">ABOUT</Link>
                </div>
                <div className="item4">
                    <Link to={`Educators`} className="navLink">EDUCATORS, ADMINISTRATORS & COUNSELORS</Link>
                </div>
                <div className="item5">
                    <Link to={`NewsAndFeatures`} className="navLink">SUMMER OF CS</Link>
                </div>
                <a href='#' className="item6"><img src={envelope} className="envelope" alt="Send"/>Sign up</a>
            </div>
        </nav>
    );
};