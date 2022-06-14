import React, { useRef } from 'react';
import map from "../../assets/map.png"
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

export default function NonComputing() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
    const {currentUser} = useAuth();
    const titleRef = useRef();
    const contentRef = useRef();
    const navi = useNavigate()
    
    const handleSave = async (e) => {
        e.preventDefault();

        let summary= titleRef.current.value;
        let detail = contentRef.current.value;
        
        if (detail === "" || summary=== "") {
            alert("You are forgot to fill in a field");
            return
        }

        const newThread = {
            title: summary,
            content : detail,
            owner: currentUser.email,
            answer : ""
        }

        await axios.post(`${domain}/api/threads`, newThread).then(function(res) {
            if (res.data.message) {
                alert(res.data.message);
            } else {
              navi('/wait-for-help');
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="title" placeholder="Title/Summary" ref={titleRef}/>
                <textarea type="description" placeholder="Details/Description" ref={contentRef}>
                </textarea>
                <h4> Pin your location</h4>
                <img src={map} alt="Map" className='map'></img>
                <button type="submit"> Post a question </button>
            </form>
        </div>
    );
}