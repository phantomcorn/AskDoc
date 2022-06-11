import React, { useRef } from 'react';
import map from "../assets/map.png"
import axios from "axios";

export default function NonComputing() {
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const handleSave = async (e) => {
        e.preventDefault();
        console.log("hello")
        
        let summary= titleRef.current.value;
        let detail = descriptionRef.current.value;
        
        if (detail === "" || summary=== "") {
            alert("You are forgot to fill in a field");
            return
        }

        const newThread = {
            title: summary,
            content : detail
        };

        await axios.post("http://localhost:5000/api/threads", newThread).then(res => console.log(res.data));

        console.log("done");
    }

    return (
        <div>
            <button type="logout"> Logout </button>
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="title" placeholder="Title/Summary" ref={titleRef}/>
                <textarea type="description" placeholder="Details/Description" ref={descriptionRef}>
                </textarea>
                <h4> Pin your location</h4>
                <img src={map} alt="Map"></img>
                <button type="submit"> Post a question </button>
            </form>
        </div>
    );
}