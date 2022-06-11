import React, { useEffect, useState } from 'react';
import axios from "axios";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'




export class Computing extends React.Component {

    constructor() {
        super();
        this.state = {
            threads: []
        }
    }

    async componentDidMount() {        
        const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
        console.log(domain)
        const host = `${domain}/api/threads`;
        const updatedThread = await axios.get(host);
        this.setState({threads : updatedThread.data});
    }

    render(){
        return(
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
                            {this.state.threads.map((thread) =>{
                                return (
                                    <div key={thread._id}> 
                                        <h2> {thread.title} </h2> 
                                        <div> {thread.content} </div>
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
        )
    }
}
