import { Link, useLocation } from "react-router-dom"

interface askerInfo {
    name : String, 
    email: String, 
    phone : String
};

export default function AskerInfo() {

    
    const location = useLocation();
    const asker = location.state.asker

    return (
        <div>
            <div className="w-100 text-center mt-3">
                <Link to="/"><h2>Cancel</h2></Link>
            </div>
            <h2> Name : {asker.name} </h2>
            <h2> Email : {asker.email} </h2>
            <h2> Phone no. : {asker.phone} </h2>
        </div>
    );
};
