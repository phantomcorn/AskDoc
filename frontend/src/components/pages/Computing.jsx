import React, { useEffect, useState } from 'react';
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Computing() {
    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const host = `${domain}/api/threads`;
    const [threads, setThreads] = useState([]);

    useEffect(() => {

        const getThreads = (async () => {
            const updatedThreads = await axios.get(host)
            setThreads(updatedThreads.data)
        })


        getThreads()
    },[])


    function handleSubmit(e) {
        e.preventDefault()
        const id = e.target.value
        console.log(e.target.value)
    }

    return(
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