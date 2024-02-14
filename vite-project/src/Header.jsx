import React from 'react';
import { Link } from "react-router-dom";
import './Header.css';


function Header(){

    return (
        <header className="header">
            <h1>
                Summer of CS July 29 - August 2, 2024 | <Link to={`SummerOfCS`} className="HeaderLink">LEARN MORE!</Link>
            </h1>
        </header>
    );
}

export default Header;