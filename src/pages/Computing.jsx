import React, { useEffect, useState } from 'react';
import db, { readThreadsDB } from "../firebase";
import {ref, onValue} from "firebase/database"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Computing() {
    
    const [threads, setThreads] = useState([]);

    useEffect(() => {

        const getThreads = async () => {
            let newThreads = readThreadsDB();
            setThreads(newThreads);
            console.log(threads);
        } 
        
        getThreads()
        
    });


    return (
        <div>
            <h2>
                AskDoC
            </h2>
            <Container>
                <Row>
                    <Col>
                        <h4>
                            Questions:
                        </h4>
                        {threads.map((thread, index) =>{
                            return (
                                <div> 
                                    <h2> q{index+1} {thread.key} </h2> 
                                    <div> {thread.data.description} </div>
                                    <button>Answer this question</button>
                                </div>
                            )
                        })}
                    </Col>
                    <Col>
                        <h4>Profile (Asker)</h4>
                        <div> Name : Papa mama</div>
                        <div> Email : pa@ic.ac.uk </div>
                        <div> Phone no. : 07552377182 </div>
                    </Col>
                </Row>
            </Container>            
        </div>
    );

}
