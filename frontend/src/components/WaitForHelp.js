import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import io from 'socket.io-client';
import { useAuth } from "../contexts/AuthContext";

var socket;

export default function WaitForHelp() {

  const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
  const navi = useNavigate();
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    {/* Connect this user to the socket */}
    socket = io(domain);
    {/* Join the room for this question */}
    socket.emit("wait", currentUser);
  }, [location]);

  useEffect(() => {
    {/* Controller listening for the event "my question picked" */}
    socket.on("my question picked", (helperData) => navi('/helper-info', {
      state : {
        helper : helperData,
        thread : location.state.thread
      }}));
  });

  return (
    typeof(location.state.message) === 'undefined' ? 
      <h1>Your question has been submitted. Please wait...</h1>
      :
      <h1>The helper cancels your question. Please wait for another helper...</h1>
  );
}