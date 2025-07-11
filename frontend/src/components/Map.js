import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 17.385044,
  lng: 78.486671,
};

const Map = ({ stops }) => {
  const [locations, setLocations] = useState([]);

  const geocodeStop = async (stop) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        stop + ", Hyderabad"
      )}&key=AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0`
    );
    const data = await response.json();
    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return { name: stop, position: location };
    } else {
      console.warn("Geocoding failed for", stop);
      return null;
    }
  };

  useEffect(() => {
    async function fetchAllCoordinates() {
      const coords = await Promise.all(stops.map(geocodeStop));
      setLocations(coords.filter((loc) => loc !== null));
    }

    fetchAllCoordinates();
  }, [stops]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAqjuHEXUhERkYhHd7zUMD8m6v7bzmxkP0">
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={12}>
        {locations.map((loc, index) => (
          <Marker key={index} position={loc.position} label={{
            text: loc.name,
            fontSize: '9px'
          }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;





