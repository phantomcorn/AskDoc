import axios from "axios";
import { Link, useLocation } from "react-router-dom"

interface askerInfo {
    name : String, 
    email: String, 
    phone : String
};

export default function AskerInfo() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const threadHost = `${domain}/api/threads`;
    const location = useLocation();
    const asker = location.state.asker
    const thread = location.state.thread
    
    const handleCancel = async () => {
        await axios.put(`${threadHost}/return/${thread._id}`)
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
