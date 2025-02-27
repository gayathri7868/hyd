import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../navbar.css'
import logo from './logo.jpeg';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Hyderabad Navigator Logo" className="navbar-logo" />
                    Hyderabad Navigator
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#discover">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#explore">Contact Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#favorites">FAQs</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;