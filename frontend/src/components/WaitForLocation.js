import loading from '../assets/spinner.gif'
import "../css/WaitForLocation.css"
import { useNavigate, useLocation } from "react-router-dom";

import io from 'socket.io-client';
import { useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";

var socket;

export default function WaitForLocation() {

  const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
  const navi = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    {/* Connect this user to the socket */}
    socket = io(domain);
    {/* Join the room for waiting for location */}
    socket.emit("wait for location", currentUser);
  }, []);

  useEffect(() => {
    socket.on("helper's location acquired", (helperLocation) => navi('/helper-info', {
      state : {
        helper : location.state.helper,
        helperLat : helperLocation.lat,
        helperLng : helperLocation.lng,
        thread : location.state.thread,
        addNotes : location.state.addNotes
      }
    }));
  });

  return (
    <div className="wait-for-location-body">
      <h2 style={{color: "green"}}>Someone has picked up your question!</h2>
      <h2>Please wait for their location</h2>
      <img className='spinner' src={loading} alt="loading..." />
    </div>
  );
}