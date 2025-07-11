import { useNavigate } from 'react-router-dom';
import '../css/screen.css';
import React from 'react';
import { useState } from 'react'

function Screen() {
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [stopName, setStopName] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        if (event.key === "Enter" && searchTerm.trim() !== "") {
            navigate(`/SpecificSpot`, { state: { query: searchTerm.trim() } });
        }
    };

    return (
        <div>
            <div className="app container">
                <div className="row">
                    <div className="col-md-4 screen screen1">
                        <div className="screen__header">
                            <h2>Discover the Routes</h2>
                        </div>
                        <div className="screen__content">
                            <p>Enter your start and end locations to get bus numbers:</p>
                            <div className='flex-col'>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={startLocation}
                                    onChange={(e) => setStartLocation(e.target.value)}
                                    placeholder="Start Location"
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={endLocation}
                                    onChange={(e) => setEndLocation(e.target.value)}
                                    placeholder="End Location"
                                />
                                <button className="btn btn-primary" onClick={() => navigate('/find-routes', { state: { startLocation, endLocation } })}>Find Routes</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 screen screen2">
                        <div className="screen__header">
                            <h2>Explore Stops</h2>
                        </div>
                        <div className="screen__content">
                            <p>Enter the stop name to see buses that pass through:</p>
                            <div className='flex-col'>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={stopName}
                                    onChange={(e) => setStopName(e.target.value)}
                                    placeholder="Stop Name"
                                />
                                <button className="btn btn-success" onClick={() => navigate('/find-stop', { state: { stopName } })}>Find Buses</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 screen screen3">
                        <div className="screen__header">
                            <h2>Tourist Favorites</h2>
                        </div>
                        <div className="screen__content">
                            <p>Enter the tourist spot name to find buses with their bus nos:</p>
                            <div className='flex-col'>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Tourist Spot Name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                />
                                <button className="btn btn-warning" onClick={() => navigate('/find-tourist')}>Find Buses</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Screen;
