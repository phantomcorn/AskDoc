import { useNavigate, useLocation } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useState, useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'
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
  const locationRef = useRef();
  const thread = location.state.thread;
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

    socket.emit("helper sets location", {helperLat: marker.lat, helperLng: marker.lng, askerEmail: location.state.asker.email, helperNote : locationRef.current.value});
    navi("/asker-info", {
      state : {
          asker : location.state.asker,
          thread : thread,
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
        <div class="google-map">
          <GoogleMap 
              mapContainerStyle={mapContainerStyle} 
              zoom={17}
              center={center}
              options={options}
              onClick={onMapClick}
          >
              { marker !== null &&
                  <Marker 
                    position={{ lat: marker.lat, lng: marker.lng }}
                    icon={{
                      url: "/you-are-here.png",
                      scaledSize: new window.google.maps.Size(15, 15)
                    }}
                  />
              }
          </GoogleMap>
        </div>
        <Form.Group id="add-notes">
          <Form.Control type="notes" ref={locationRef} placeholder="Additional notes" as="textarea"/>
        </Form.Group>
  
    </div>
    <div>
        <Button onClick={handlePickLocation} type="submit" class="sub">Submit</Button>
    </div>
  </div>
  );
}