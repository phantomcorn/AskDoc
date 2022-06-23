import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from 'react-bootstrap'
import sandclock from "../assets/sandclock.png"
import "../css/WaitForHelp.css"
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
    socket.emit("cancel question", { id : thread._id });
    await axios.delete(`${threadHost}/${thread._id}`).catch(
      (err) => {
        console.log("The question has already been removed from the db");
      }
    );
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
    socket.on("my question picked", (helperData) => navi('/wait-for-location', {
      state : {
        helper : helperData,
        thread : location.state.thread,
        addNotes : location.state.addNotes
      }}));
  });

  return (
    <div class="wait-for-help-body">
      <div>
        { typeof(location.state.message) === 'undefined' ?
          <h2>Your question has been submitted. <br></br>Please wait...</h2>
          :
          <h2>The helper cancels your question. Please wait for another helper...</h2> }
          <br></br>
          <img src={sandclock} alt="Sandclock" className='center sandclock'></img>
      </div>

      <div>
        <Button onClick={handleCancel} type="submit">Cancel</Button>
      </div>
    </div>
  );
}