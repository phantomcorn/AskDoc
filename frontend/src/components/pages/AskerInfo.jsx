import axios from "axios";
import { Link, useLocation } from "react-router-dom"
import io from 'socket.io-client';

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
    
    const handleCancel = async () => {
        const res = await axios.put(`${threadHost}/return/${thread._id}`)
        {/* Connect this user to the socket */}
        socket = io(domain);
        {/* Notify the socket for the event "new question posted" */}
        socket.emit("new question posted", res.data);
    }

    const handleRemove = async () => {
        await axios.delete(`${threadHost}/${thread._id}`)
    }


    return (
        <div>
            <div className="w-100 text-center mt-3">
                <Link to="/" onClick={handleCancel} ><h2>Cancel</h2></Link>
            </div>
            <div className="w-100 text-center mt-3">
                <Link to="/" onClick={handleRemove}><h2>Finish</h2></Link>
            </div>
            <h2> Name : {asker.name} </h2>
            <h2> Email : {asker.email} </h2>
            <h2> Phone no. : {asker.phone} </h2>
        </div>
    );
};
