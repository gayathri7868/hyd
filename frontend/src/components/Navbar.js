import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css'
import logo from './logo.jpeg';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Hyderabad Navigator Logo" className="navbar-logo" />
                    HYDERABAD NAVIGATOR
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/index">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about-us">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact-us">Contact Us</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#favorites">Download</a>
                        </li> */}

                        <li className="nav-item dropdown custom-dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="downloadDropdown" role="button">
                                Download
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="downloadDropdown">
                                <li><a className="dropdown-item" href="http://localhost:2000/static/bus_routes.csv">Routes</a></li>
                                <li><a className="dropdown-item" href="http://localhost:2000/static/stops.csv">Stops</a></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;