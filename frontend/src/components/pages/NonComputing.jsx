import React, { useRef, useState, useCallback } from 'react';
import map from "../../assets/map.png"
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap'
import "../../css/NonComputing.css"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

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
};

export default function NonComputing() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
    const {currentUser} = useAuth();
    const tag1Ref = useRef();
    const tag2Ref = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const navi = useNavigate();

    const [marker, setMarker] = useState(null);

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
    
    const handleSave = async (e) => {
        {/* Connect this user to the socket */}
        socket = io(domain);

        e.preventDefault();

        let taglan = tag1Ref.current.value;
        let tagCat = tag2Ref.current.value;
        let summary= titleRef.current.value;
        let detail = contentRef.current.value;
        
        if (detail === "" || summary=== "") {
            alert("You forgot to fill in a field");
            return
        }

        if (marker === null) {
            alert("You forgot to pin your location");
            return
        }

        const newThread = {
            tag1 : taglan,
            tag2 : tagCat,
            title: summary,
            content : detail,
            owner: currentUser.email,
            answer : "",
            lat : marker.lat,
            lng : marker.lng
        }

        await axios.post(`${domain}/api/threads`, newThread).then(function(res) {
            if (res.data.message) {
                alert(res.data.message);
            } else {
              {/* Notify the socket for the event "new question posted" */}
              socket.emit("new question posted", res.data);
              navi('/wait-for-help', {
                state : {
                  thread : res.data 
                }
              });
            }
        });
    }

    function Map() {
        return(
            <>
                <h4> Pin your location</h4>
                <img src={map} alt="Map" className='map'></img>
            </>
        );
    }

    return (
        <div class="non-computing">
            <Card>
                <Form onSubmit={handleSave}>
                    <Form.Group id="tag">
                        <Form.Label> Language </Form.Label>
                        <select ref={tag1Ref}> 
                            <option value="General">General</option>
                            <option value="Python">Python</option>
                            <option value="C language">C language</option>
                            <option value="C++ language">C++ language</option>
                            <option value="Java">Java</option>
                            <option value="Kotlin">Kotlin</option>
                            <option value="Scala">Scala</option>
                            <option value="R">R</option>
                        </select>
                        <label>&nbsp;&nbsp;</label>
                        <Form.Label> Category </Form.Label>
                        <select ref={tag2Ref}> 
                            <option value="General">General</option>
                            <option value="Syntax">Syntax</option>
                            <option value="Data Structure">Data Structure</option>
                            <option value="Algorithm">Algorithm</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Setup">Setup</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Bugs">Bugs</option>
                        </select>
                    </Form.Group>
                    <Form.Group id="title">
                        <Form.Label>Enter Message Title</Form.Label>
                        <Form.Control type="title" ref={titleRef} required placeholder="Title/Summary"/>
                    </Form.Group>
                    <Form.Group id="desc">
                        <Form.Label>Enter Problem</Form.Label>
                        <Form.Control type="description" ref={contentRef} required placeholder="Details/Description" as="textarea"/>
                    </Form.Group>
                    <Form.Label>Pin your location</Form.Label>
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
                    <Button className="w-100 mt-3" type="submit">
                        Post a question
                    </Button>
                </Form>
            </Card>
            <div className="w-100  text-center mt-3">
                <Link to="/"><h2>Cancel</h2></Link>
            </div>
        </div>
    );
}