import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L, { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import busIconUrl from '../back.webp';

// Function to fetch coordinates using Nominatim geocoding
const fetchCoordinates = async (location) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`);
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        } else {
            console.warn(`No coordinates found for ${location}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching coordinates for ${location}:`, error);
        return null;
    }
};

// Helper function to interpolate between two coordinates
const interpolate = (start, end, t) => ({
    lat: start.lat + (end.lat - start.lat) * t,
    lon: start.lon + (end.lon - start.lon) * t,
});

function MapWithAnimatedBus({ stops }) {
    const [coordinates, setCoordinates] = useState([]);
    const [busPosition, setBusPosition] = useState(null);
    const [currentStopIndex, setCurrentStopIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadCoordinates = async () => {
            const results = await Promise.all(stops.map(stop => fetchCoordinates(stop)));
            const validCoordinates = results.filter(Boolean);
            setCoordinates(validCoordinates);
            setBusPosition(validCoordinates[0]); // Start at the first stop
        };
        loadCoordinates();
    }, [stops]);

    useEffect(() => {
        if (coordinates.length > 1 && currentStopIndex < coordinates.length - 1) {
            const start = coordinates[currentStopIndex];
            const end = coordinates[currentStopIndex + 1];
            const animationDuration = 3000; // Duration to move between two stops in ms

            let startTime = null;

            const animateMarker = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const t = Math.min(elapsed / animationDuration, 1); // Progress between 0 and 1

                const interpolatedPosition = interpolate(start, end, t);
                setBusPosition(interpolatedPosition);

                if (t < 1) {
                    requestAnimationFrame(animateMarker);
                } else {
                    setCurrentStopIndex((prev) => prev + 1); // Move to the next stop
                    setProgress(0); // Reset progress for the next segment
                }
            };

            requestAnimationFrame(animateMarker);
        }
    }, [coordinates, currentStopIndex]);

    const busIcon = icon({
        iconUrl: busIconUrl,
        iconSize: [30, 30], // Adjust the bus icon size as needed
        iconAnchor: [15, 15],
    });

    return (
        <MapContainer center={[17.385044, 78.486671]} zoom={12} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Draw the route path */}
            <Polyline positions={coordinates.map(coord => [coord.lat, coord.lon])} color="blue" />

            {/* Animated Bus Marker */}
            {busPosition && (
                <Marker
                    position={[busPosition.lat, busPosition.lon]}
                    icon={busIcon}
                    zIndexOffset={1000} // Ensure bus icon is above other markers
                />
            )}
        </MapContainer>
    );
}

export default MapWithAnimatedBus;
