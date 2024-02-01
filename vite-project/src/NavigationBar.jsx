import { Link } from "react-router-dom";
import logo from '/src/assets/logo.webp';
import envelope from '/src/assets/envelope.webp';
import './NavigationBar.css'

export default function NavigationBar(){

    return (
        <nav className='NavigationBar'>
            <div className='NavLinksContainer'>
            <Link to={`/`} className="LogoContainer">
                    <img src={logo} className="logo" alt="logo" />
                    <span className="CSForOregon">CS For Oregon</span>
                </Link>
                <div>
                    <Link to={`/`} className="navLink">HOME</Link>
                </div>
                <div>
                    <Link to={`About`} className="navLink">ABOUT</Link>
                </div>
                <div>
                    <Link to={`Educators`} className="navLink">EDUCATORS, ADMINISTRATORS & COUNSELORS</Link>
                </div>
                <div>
                    <Link to={`NewsAndFeatures`} className="navLink">NEWS & FEATURES</Link>
                </div>
                {/* 
                <div>
                    <a href='#' className="navLink">SUMMER OF CS</a>
                </div>
                */}
                <a href='#' className="SignUp"><img src={envelope} className="envelope" alt="Send"/>Sign up</a>
            </div>
        </nav>
    );
};