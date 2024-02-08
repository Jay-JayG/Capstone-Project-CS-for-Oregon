import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';


function Header(){

    return (
        <header className="header">
            <h1>
                Summer of CS July 29-August | <Link to={`NewsAndFeatures`} className="HeaderLink">LEARN MORE!</Link>
            </h1>
        </header>
    );
}

export default Header;