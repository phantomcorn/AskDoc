import { useNavigate, useLocation } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap'
import "../css/PinLocation.css"

import io from 'socket.io-client';

var socket;

const mapContainerStyle = {
  width: "40vw",
  height: "40vh",
};

{/* William Penney Laboratory, South Kensington (Middle of Imperial College London) */}
const center = {
  lat: 51.498929,
  lng: -0.176601,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  restriction: {
    latLngBounds: { north: 51.501872, south: 51.497016, east: -0.170290, west: -0.180225 },
    strictBounds: true,
  },
};

export default function PinLocation() {

  const navi = useNavigate();
  const location = useLocation();
  const [marker, setMarker] = useState(null);
  const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`

  useEffect(() => {
    {/* Connect this user to the socket */}
    socket = io(domain);
  },[]);

  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // googleMapsApiKey: undefined,
  });
  
  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map...";

  function handlePickLocation(e) {
    e.preventDefault();
    if (marker === null) {
      alert("You forgot to pin your location");
      return
    }
    socket.emit("helper sets location", {helperLat: marker.lat, helperLng: marker.lng, askerEmail: location.state.asker.email});
    navi("/asker-info", {
      state : {
          asker : location.state.asker,
          thread : location.state.thread,
          helperLat : marker.lat,
          helperLng : marker.lng,
      }
    });
  }

  return (
  <div>
    <div className="pin-location-body">
        <h3>Please pin your location</h3>
        <br></br>
        <GoogleMap 
            mapContainerStyle={mapContainerStyle} 
            zoom={17}
            center={center}
            options={options}
            onClick={onMapClick}
        >
            { marker !== null &&
                <Marker position={{ lat: marker.lat, lng: marker.lng }}/>
            }
        </GoogleMap>
    </div>
    <div>
        <Button onClick={handlePickLocation} type="submit" class="sub">Submit</Button>
    </div>
  </div>
  );
}