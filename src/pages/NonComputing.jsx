import React, { useRef } from 'react';
import { db } from "../firebase";
import {getDocs, addDoc, collection} from "@firebase/firestore";


export default function NonComputing() {
    
    const titleRef = useRef();
    const descriptionRef = useRef();
    const threadsCollectionRef = collection(db, "Threads");
    const handleSave = async (e) => {
        e.preventDefault();
    
        let data = {
            title : titleRef.current.value ,
            description : descriptionRef.current.value
        }
        try {
            addDoc (threadsCollectionRef,data);
        } catch (e) {
            console.log (e);
        }
    }

    return (

        <div>
            <button type="logout"> Logout </button>
    
            <form onSubmit={handleSave}>
                <label>Enter Message</label>
                <input type="title" ref={titleRef}/>
                <input type="description" ref = {descriptionRef}/>
                <button type="submit"> Post a question </button>
            </form>
        </div>
    );
}