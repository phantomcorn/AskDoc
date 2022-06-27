import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "../../css/AskerInfo.css";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Legend from "../Legend";

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

    const handleRemove = async () => {
        await axios.delete(`${threadHost}/${thread._id}`).catch(
          (err) => {
            console.log("The question has already been removed from the db");
          }
        )
    }

    return (
      <div class="row justify-content-center">
          <div class="col-6">
          <div class="question">
              <h5 class="title"> Question: {thread.title} </h5>
              <h6 class="content"> Description: {thread.content} </h6>
              <div class="link"> {linkState && link} </div>
          </div>
          </div>

          <div class="col-6">
            <div class="asker-info">
            <div className="w-100 text-center mt-3">
                <h3>Asker's Information</h3>
            </div>
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
            <h5> Asker's note : {thread.askerNote} </h5>
            </div>
          </div>
          <Link to="/" onClick={handleRemove}>
              <Button className="w-90 mt-3" type="button" size="lg">
                Finish
              </Button>
          </Link>
      </div>
    );
};
