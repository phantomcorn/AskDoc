import axios from "axios";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import io from 'socket.io-client';
import { useAuth } from "../../contexts/AuthContext";

interface askerInfo {
    name : String, 
    email: String, 
    phone : String
};

var socket;

export default function AskerInfo() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const threadHost = `${domain}/api/threads`;
    const location = useLocation();
    const asker = location.state.asker
    const thread = location.state.thread
    const {currentUser} = useAuth();
    const navi = useNavigate();
    
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
        <div>
            <div className="w-100 text-center mt-3">
                <h1>Asker's Information</h1>
            </div>
            {/* <div className="w-100 text-center mt-3">
                <Link to="/" onClick={handleCancel} ><h2>Cancel</h2></Link>
            </div> */}
            <div className="w-100 text-center mt-3">
                <Link to="/" onClick={handleRemove}><h2>Finish</h2></Link>
            </div>
            <h2> Name : {asker.name} </h2>
            <h2> Email : {asker.email} </h2>
            <h2> Phone no. : {asker.phone} </h2>
            <h2> Question : </h2>
            <div className="QuestionsList mb-3"> 
                <h4> #{thread.tag1} #{thread.tag2} </h4> 
                <h2> {thread.title} </h2> 
                <div> {thread.content} </div>
            </div>
        </div>
    );
};
