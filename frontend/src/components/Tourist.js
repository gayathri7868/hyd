import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import '../tourist.css';

function TouristAttraction() {
    const navigate = useNavigate();
    const [attractionName, setAttractionName] = useState('');
    const [buses, setBuses] = useState([]);

    const handleAttraction = (event) => {
        event.preventDefault();
        const example = [
            {
                attractionName: 'Charminar',
                busNumber: 50,
                startLocation: 'MG Bus Station'
            },
            {
                attractionName: 'Charminar',
                busNumber: '50A',
                startLocation: 'Secunderabad'
            }
        ];
        setBuses(example);
    };

    return (
        <div className="tourist-attraction-page">
            <h1>Find Buses to Tourist Attractions</h1>
            <form className="attraction-form" onSubmit={handleAttraction}>
                <input
                    type="text"
                    className="form-control"
                    value={attractionName}
                    onChange={(e) => setAttractionName(e.target.value)}
                    placeholder="Enter Tourist Attraction Name"
                    required
                />
                <button type="submit" className="btn btn-primary">
                    Find Buses
                </button>
            </form>

            {buses.length > 0 && (
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Bus Number</th>
                            <th>Start Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buses.map((bus, index) => (
                            <tr key={index}>
                                <td>{bus.busNumber}</td>
                                <td>{bus.startLocation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button onClick={() => navigate('/index')} className="btn btn-secondary mt-3">
                Back to Home
            </button>
        </div>
    );
}

export default TouristAttraction;
