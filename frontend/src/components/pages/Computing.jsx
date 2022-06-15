import React, { useEffect, useState } from 'react';
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom";

import io from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';

var socket;


export default function Computing() {
    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const host = `${domain}/api/threads`;
    const [threads, setThreads] = useState([]);
    const {currentUser} = useAuth();

    const getThreads = async () => {
      const updatedThreads = await axios.get(host)
      setThreads(updatedThreads.data)
    }

    useEffect(() => {
        {/* Connect this user to the socket */}
        socket = io(domain);
        {/* Send signal to the socket that this user is observing threads db */}
        socket.emit("observe threads db", currentUser);
        
        getThreads();
    },[])

    useEffect(() => {
      {/* Controller listening for the event "new thread" */}
      socket.on("new thread", (newThread) => setThreads([...threads, newThread]));
      {/* Controller listening for the event "thread picked" */}
      socket.on("thread picked", (id) => setThreads((prevThreads) => prevThreads.filter(thread => thread._id != id)));
    })


    function handleSubmit(e) {
        e.preventDefault()
        const id = e.target.value
        const threadToUpdate = {
            _id : id,
            answer : currentUser.email
        }

        axios.put(`${host}/${id}`, threadToUpdate)
        socket.emit("picks a question", {email: currentUser.email, id: id});
    }

    return(
        <>
        <div>
            <Container>
                <Row>
                    <Col>
                        <h4>
                            Questions:
                        </h4>
                        {threads.map((thread) =>{
                            return (
                                <div key={thread._id}> 
                                    <h4> #{thread.tag1} #{thread.tag2} </h4> 
                                    <h2> {thread.title} </h2> 
                                    <div> {thread.content} </div>
                                    <button value={thread._id} onClick={handleSubmit} type="submit">Answer this question</button>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
        <div className="w-100  text-center mt-3">
            <Link to="/"><h2>Cancel</h2></Link>
        </div>
        </>
    )
}
/*
export default class Computing extends React.Component {

    constructor() {
        super();
        this.state = {
            threads: []
        }
    }

    async componentDidMount() {        
        const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
        const host = `${domain}/api/threads`;
        const updatedThread = await axios.get(host);
        this.setState({threads : updatedThread.data});
    }

    handleAnswer(id) {
        console.log(id)
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h4>
                                Questions:
                            </h4>
                            {this.state.threads.map((thread) =>{
                                return (
                                    <div key={thread._id}> 
                                        <h2> {thread.title} </h2> 
                                        <div> {thread.content} </div>
                                        <button type="submit" onClick={this.handleAnswer(thread._id)}>Answer this question</button>
                                    </div>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
                    
            </div>
        )
    }
}
*/