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

export default function HelperInfo() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const threadHost = `${domain}/api/threads`;
    const location = useLocation();
    const helper = location.state.helper
    const thread = location.state.thread
    const navi = useNavigate();
    const {currentUser} = useAuth();
    
    // const handleCancel = async e => {
    //     e.preventDefault()
    //     const res = await axios.put(`${threadHost}/return/${thread._id}`)
    //     socket.emit("notify cancel to helper", helper);

    //     {/* Notify the socket for the event "new question posted" */}
    //     socket.emit("new question posted", res.data);
    //     navi('/wait-for-help', {
    //       state : {
    //         thread : thread
    //       }
    //     })
    // }

    const handleRemove = async () => {
        await axios.delete(`${threadHost}/${thread._id}`).catch(
          (err) => {
            console.log("The question has already been removed from the db");
          }
        );
        // socket.emit("notify finish to helper", helper);
    }

    // useEffect(() => {
    //     {/* Connect this user to the socket */}
    //     socket = io(domain);
    //     socket.emit("look at helper info", currentUser);
    // }, [location]);

    // useEffect(() => {
    //     // {/* If helper clicks cancel before asker */}
    //     // socket.on("helper cancels", () => navi('/wait-for-help', {
    //     //   state : {
    //     //     message : "Helper cancels your question",
    //     //     thread : thread
    //     //   }
    //     // }));
    //     {/* If helper clicks finish before asker */}
    //     socket.on("helper finishes", () => navi('/', {
    //       state : {
    //         message : "The helper finishes answering your question. Thank for asking :)",
    //       }
    //     }));
    // })


    return (
        <div>
            <div className="w-100 text-center mt-3">
                <h1>Helper's Information</h1>
            </div>
            {/* <div className="w-100 text-center mt-3">
                <Link to="/" onClick={handleCancel} ><h2>Cancel</h2></Link>
            </div> */}
            <div className="w-100 text-center mt-3">
                <Link to="/" onClick={handleRemove}><h2>Finish</h2></Link>
            </div>
            <h2> Name : {helper.name} </h2>
            <h2> Email : {helper.email} </h2>
            <h2> Phone no. : {helper.phone} </h2>
        </div>
    );
};