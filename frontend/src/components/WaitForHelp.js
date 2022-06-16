import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from 'react-bootstrap'

import io from 'socket.io-client';
import { useAuth } from "../contexts/AuthContext";

var socket;

export default function WaitForHelp() {

  const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
  const threadHost = `${domain}/api/threads`;
  const navi = useNavigate();
  const { currentUser } = useAuth();
  const location = useLocation();
  const thread = location.state.thread;

  async function handleCancel(e) {
    e.preventDefault()
    await axios.delete(`${threadHost}/${thread._id}`).catch(
      (err) => {
        console.log("The question has already been removed from the db");
      }
    );
    socket.emit("cancel question", { id : thread._id });
    navi("/");
  }

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
    <>
    { typeof(location.state.message) === 'undefined' ? 
      <h1>Your question has been submitted. Please wait...</h1>
      :
      <h1>The helper cancels your question. Please wait for another helper...</h1> }
      <Button onClick={handleCancel} type="submit">Cancel</Button>
    </>
  );
}