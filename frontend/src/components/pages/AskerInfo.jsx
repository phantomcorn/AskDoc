import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { useAuth } from "../../contexts/AuthContext";
import "../../css/AskerInfo.css";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Legend from "../Legend";
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

export default function AskerInfo() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const threadHost = `${domain}/api/threads`;
    const location = useLocation();
    const asker = location.state.asker
    const thread = location.state.thread
    const {currentUser} = useAuth();
    const navi = useNavigate();

    let linkState = false;
    
    if (thread.link !== "") {
      linkState = true;
    }

    let link = <a href={thread.link} target="_blank"> Link</a>


    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
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
                <h5 class="title"> Question: {thread.title} </h5>
                <h6 class="content"> Description: {thread.content} </h6>
                <div class="link"> {linkState && link} </div>
            </div>

            <div class="asker-info">

                <div className="w-100 text-center mt-3">
                    <h3>Asker's Information</h3>
                </div>

                <div>
                <h5> Name : {asker.name} </h5>
                <h5> Email : {asker.email} </h5>
                <h5> Phone no. : {asker.phone} </h5>
                <h5>Location :</h5>
                <div class="google-map">
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
                          scaledSize: new window.google.maps.Size(15, 15)
                        }}
                      />
                      {/* Asker's location */}
                      <Marker 
                        position={{ lat: thread.lat, lng: thread.lng }} 
                      />
                  </GoogleMap>
                </div>
                <Legend />
                <h6> Asker's notes : {thread.askerNote} </h6>
            </div>
            </div>
            <div className="w-100 text-center mt-3" class="finish">
                            <Link to="/" onClick={handleRemove}><h3>Finish</h3></Link>
            </div>
        </div>
    );
};
