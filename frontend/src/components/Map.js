import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../map.css';


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

function Map({ stops }) {
    const [coordinates, setCoordinates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCoordinates = async () => {
            const results = await Promise.all(stops.map(stop => fetchCoordinates(stop)));
            const validCoordinates = results
                .map((coord, index) => coord ? { ...coord, stop: stops[index] } : null)
                .filter(Boolean);
            setCoordinates(validCoordinates);
            setLoading(false);
        };
        loadCoordinates();
    }, [stops]);


    const createCustomIcon = () => {
        return divIcon({
            className: 'custom-marker',
            html: `<div class="custom-marker"></div>`,
            iconSize: [30, 30]
        });
    };

    const routeCoordinates = coordinates.map(coord => [coord.lat, coord.lon]);
    return (
        <div>
            {loading ? <p>Loading stops...</p> : null} {/* Show loading state */}
            <MapContainer center={[17.385044, 78.486671]} zoom={12} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {coordinates.map((coord, index) => (
                    <Marker key={index} position={[coord.lat, coord.lon]} icon={createCustomIcon()}>
                        <Popup>{coord.stop}</Popup> {/* Use the stop name from the mapped coordinates */}
                    </Marker>
                ))}

                {/* {routeCoordinates.length > 1 && (
                    <Polyline
                        positions={routeCoordinates}
                        color="blue"
                        weight={4}
                        opacity={0.6}
                    />
                )} */}
            </MapContainer>
        </div>
    );
}

export default Map;


