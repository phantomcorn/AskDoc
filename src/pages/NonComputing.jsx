import React, { useRef } from 'react';
import db, { writeDB } from "../firebase";
import {getDocs, addDoc, collection} from "@firebase/firestore";
import map from "../assets/map.png"

export default function NonComputing() {
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const handleSave = async (e) => {
        e.preventDefault();
        console.log("hello")
        
        let title = titleRef.current.value;
        let detail = descriptionRef.current.value;
        
        if (detail === "" || title === "") {
            alert("You are forgot to fill in a field");
            return
        }

        writeDB(title, detail);

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