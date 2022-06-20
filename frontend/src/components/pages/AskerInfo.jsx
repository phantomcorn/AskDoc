import axios from "axios";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { useAuth } from "../../contexts/AuthContext";
import "../../css/AskerInfo.css";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
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

export default function AskerInfo() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const threadHost = `${domain}/api/threads`;
    const location = useLocation();
    const asker = location.state.asker
    const thread = location.state.thread
    const {currentUser} = useAuth();
    const navi = useNavigate();

    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      // googleMapsApiKey: undefined,
    });
    
    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading map...";
    
    // const handleCancel = async () => {
    //     const res = await axios.put(`${threadHost}/return/${thread._id}`)
    //     socket.emit("notify cancel to asker", asker);

    //     {/* Notify the socket for the event "new question posted" */}
    //     socket.emit("new question posted", res.data);
    // }

    const handleRemove = async () => {
        await axios.delete(`${threadHost}/${thread._id}`).catch(
          (err) => {
            console.log("The question has already been removed from the db");
          }
        )
        // socket.emit("notify finish to asker", asker);
    }

    // useEffect(() => {
    //     {/* Connect this user to the socket */}
    //     socket = io(domain);
    //     socket.emit("look at asker info", currentUser);
    // }, [location]);

    // useEffect(() => {
    //     // {/* If asker clicks cancel before helper */}
    //     // socket.on("asker cancels", () => navi('/', {
    //     //   state : {
    //     //     message : "Asker cancels your help",
    //     //     thread : thread
    //     //   }
    //     // }));
    //     {/* If asker clicks finish before helper */}
    //     socket.on("asker finishes", () => navi('/', {
    //       state : {
    //         message : "The asker finishes the session. Thank for helping :)",
    //       }
    //     }));
    // })


    return (
        <div class="asker-info-body">
            
            {/* <div className="w-100 text-center mt-3">
                <Link to="/" onClick={handleCancel} ><h2>Cancel</h2></Link>
            </div> */}
            
            <div className="QuestionsList mb-3" class="question"> 
                <h2> Question : </h2>
                <h4> #{thread.tag1} #{thread.tag2} </h4> 
                <h2> {thread.title} </h2> 
                <div> {thread.content} </div>
            </div>

            <div class="asker-info"> 
                <div className="w-100 text-center mt-3">
                    <h1>Asker's Information</h1>
                </div>
                <h2> Name : {asker.name} </h2>
                <h2> Email : {asker.email} </h2>
                <h2> Phone no. : {asker.phone} </h2>
                <div className="w-100 text-center mt-3">
                    <h2>Asker's Location</h2>
                </div>
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    zoom={17}
                    center={center}
                    options={options}
                >
                    {/* Helper's location */}
                    <Marker 
                      position={{ lat: location.state.helperLat, lng: location.state.helperLng }}
                      icon={{
                        url: "/you-are-here.png",
                        scaledSize: new window.google.maps.Size(20, 20)
                      }}
                    />
                    {/* Asker's location */}
                    <Marker position={{ lat: thread.lat, lng: thread.lng }} />
                </GoogleMap>
            </div>
            
            
            <div className="w-100 text-center mt-3" class="finish">
                <Link to="/" onClick={handleRemove}><h2>Finish</h2></Link>
            </div>
        </div>
    );
};
