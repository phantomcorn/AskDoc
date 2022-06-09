import React, { useRef } from 'react';
import db, { writeDB } from "../firebase";
import {getDocs, addDoc, collection} from "@firebase/firestore";

export default function NonComputing() {
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const handleSave = async (e) => {
        e.preventDefault();
        console.log("hello")
        let data = {
            description : descriptionRef.current.value
        }
        
        writeDB(titleRef.current.value ,descriptionRef.current.value);

        console.log("done");
    }

    return (
        <div>
            <button type="logout"> Logout </button>
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="title" ref={titleRef}/>
                <input type="description" ref={descriptionRef}/>
                <button type="submit"> Post a question </button>
            </form>
        </div>
    );
}