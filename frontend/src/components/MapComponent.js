import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 17.3850, 
  lng: 78.4867, 
};

const MapComponent = ({ startLocation, endLocation, intermediateStops, onClose }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      if (!startLocation || !endLocation) return;

      const directionsService = new window.google.maps.DirectionsService();

      const waypoints = intermediateStops.map((stop) => ({
        location: stop,
        stopover: true,
      }));

      const results = await directionsService.route({
        origin: startLocation,
        destination: endLocation,
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.TRANSIT, 
      });

      setDirectionsResponse(results);
    };

    fetchDirections();
  }, [startLocation, endLocation, intermediateStops]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0">
      <div className="map-overlay">
        <button className="close-map-btn" onClick={onClose}>✖</button>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}

          
          <Marker position={{ lat: startLocation.lat, lng: startLocation.lng }} label="🚩" />

          
          <Marker position={{ lat: endLocation.lat, lng: endLocation.lng }} label="🏁" />

          
          {intermediateStops.map((stop, index) => (
            <Marker key={index} position={{ lat: stop.lat, lng: stop.lng }} label="📍" />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
