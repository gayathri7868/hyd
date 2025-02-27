// PathAnimation.js
import React, { useEffect, useState } from 'react';
import '../pathAnimation.css'; // Ensure to create this CSS file for custom styles

function PathAnimation({ stops }) {
    const [currentStop, setCurrentStop] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStop((prevStop) => (prevStop < stops.length - 1 ? prevStop + 1 : prevStop));
        }, 1000); // Adjust interval for speed of animation

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [stops]);

    return (
        <div className="path-animation">
            {stops.map((stop, index) => (
                <div key={index} className={`stop ${index <= currentStop ? 'active' : ''}`}>
                    <div className="dot"></div>
                    <p>{stop}</p>
                </div>
            ))}
            <div className="progress-bar" style={{ width: `${(currentStop / (stops.length - 1)) * 100}%` }}></div>
        </div>
    );
}

export default PathAnimation;
