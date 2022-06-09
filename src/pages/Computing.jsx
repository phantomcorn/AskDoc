import React, { useEffect, useState } from 'react';
import db, { readThreadsDB } from "../firebase";
import {getDocs, collection} from "@firebase/firestore";
import {ref, onValue} from "firebase/database"


export class Computing extends React.Component {

    constructor() {
        super();
        this.state = {
            threads: []
        }
    }

    componentDidMount() {
        const dbRef = ref(db, 'Threads');
        onValue(dbRef, (snapshot) => {
            let res = readThreadsDB();
            this.setState({threads : res});
        })
        

    }

    render(){
        return(
            <div>
                <div>
                    AskDoC
                </div>
                    {this.state.threads.map((thread, index) =>{
                        return (
                            <div> 
                                <h2> {index} {thread.key} </h2> 
                                <div> {thread.data.description} </div>
                                <button>Answer this question</button>
                            </div>
                        )
                    })}
            </div>
        )
    }
}
/*
export default function Computing() {
    
    const [threads, setThreads] = useState([]);

    useEffect(() => {

        const getThreads = async () => {
            let newThreads = readThreadsDB();
            setThreads(readThreadsDB());
            console.log(threads);
        } 
        
        getThreads()
        
    }, []);


    
            
    
    return (
        <div>
            <div>
                AskDoC
            </div>
            <div> Questions : </div>
            {threads.map((thread, index) => {
                return (
                    <div> 
                        <h2> {index} {thread.key} </h2> 
                        <div> {thread.data.description} </div>
                        <button>Answer this question</button>
                    
                    </div>
                );
            })}
            
        </div>
    );

}
*/