import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

var socket;


export default function Computing() {
    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const tag1Ref = useRef();
    const tag2Ref = useRef();
    const threadHost = `${domain}/api/threads`;
    const accountHost = `${domain}/api/accounts`;
    const [threads, setThreads] = useState([]);
    const {currentUser} = useAuth();
    const navi = useNavigate()

    const getThreads = async () => {
      const updatedThreads = await axios.get(threadHost)
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


    async function handleSubmit(e) {
        e.preventDefault()
        const id = e.target.value
        const threadToUpdate = {
            id : id,
            answer : currentUser.email
        }

        const updatedThread = await axios.put(`${threadHost}/${id}`, threadToUpdate)
        socket.emit("picks a question", {email: currentUser.email, id: id});
        const asker = await axios.get(`${accountHost}/answer`, {params : {email : updatedThread.data.owner}})
        navi("/asker-info", {
            state : {
                asker : asker.data,
                thread : updatedThread.data
            }
        })
    }

    function tag1filter(thread) {
        //console.log(tag1Ref.current.value)
        return tag1Ref.current.value === thread.tag1 || tag1Ref.current.value === "Any"
    }

    function tag2filter(thread) {
        //console.log(tag1Ref.current.value)
        return tag2Ref.current.value === thread.tag2 || tag2Ref.current.value === "Any"
    }

    const handleChange = e => {
        getThreads()
    }

    return(
        <>
        <Container>
            <Row>
                <Col>
                    <h4>
                        Questions:
                    </h4>
                    <h5>Filter by:</h5>
                    <Form.Label> Language <label>&nbsp;&nbsp;</label> </Form.Label>
                    <select ref={tag1Ref} onChange={handleChange}> 
                        <option value="Any">Any</option>
                        <option value="General">General</option>
                        <option value="Python">Python</option>
                        <option value="C language">C language</option>
                        <option value="C++ language">C++ language</option>
                        <option value="Java">Java</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="Scala">Scala</option>
                        <option value="R">R</option>
                    </select>
                    <br></br>
                    <Form.Label> Category <label>&nbsp;&nbsp;</label> </Form.Label>
                    <select ref={tag2Ref} onChange={handleChange}>
                        <option value="Any">Any</option> 
                        <option value="General">General</option>
                        <option value="Syntax">Syntax</option>
                        <option value="Data Structure">Data Structure</option>
                        <option value="Algorithm">Algorithm</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Setup">Setup</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Bugs">Bugs</option>
                    </select>
                    <div className='QuestionsList'>
                    {threads.filter(tag1filter).filter(tag2filter).map((thread) =>{
                        return (
                            <div key={thread._id} className="mb-3"> 
                                <h4> #{thread.tag1} #{thread.tag2} </h4> 
                                <h2> {thread.title} </h2> 
                                <div> {thread.content} </div>
                                <Button value={thread._id} onClick={handleSubmit} type="submit">Answer this question</Button>
                            </div>
                        )
                    })}
                    </div>
                </Col>
            </Row>
            </Container>
            <div className="w-100 text-center mt-3">
                <Link to="/"><h2>Cancel</h2></Link>
            </div>
        </>
    )
}
