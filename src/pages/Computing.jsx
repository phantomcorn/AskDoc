import React, { useRef, useEffect, useState } from 'react';
import { db } from "../firebase";
import {getDocs, collection} from "@firebase/firestore";

export default function Computing() {
    const [threads, setThreads] = useState([]);
    const threadsCollectionRef = collection(db, "Threads");

    useEffect(() => {

        const getThreads = async () => {
            const threads = await getDocs(threadsCollectionRef);
            console.log(threads);
            setThreads(threads.docs.map((thread) => ({...thread.data(), id: thread.id})));
        } 

        getThreads();
        
    }, []);


    
    return (
        <div>
            <div>
                AskDoC
            </div>
            <h1> Questions :</h1>
            {threads.map((thread) => {
                return (
                    <div> 
                        {" "}
                        <h2> {thread.title} </h2> 
                        <div> {thread.description} </div>
                        <button>Answer this question</button>
                    </div>);
            })}
        </div>
    );
}