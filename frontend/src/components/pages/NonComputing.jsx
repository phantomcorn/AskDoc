import React, { useRef } from 'react';
import map from "../../assets/map.png"
import axios from "axios";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from 'react-bootstrap'

export default function NonComputing() {

    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
    const {currentUser} = useAuth();
    const titleRef = useRef();
    const contentRef = useRef();
    const navi = useNavigate()
    
    const handleSave = async (e) => {
        e.preventDefault();

        let summary= titleRef.current.value;
        let detail = contentRef.current.value;
        
        if (detail === "" || summary=== "") {
            alert("You are forgot to fill in a field");
            return
        }

        const newThread = {
            title: summary,
            content : detail,
            owner: currentUser.email,
            answer : ""
        }

        await axios.post(`${domain}/api/threads`, newThread).then(function(res) {
            if (res.data.message) {
                alert(res.data.message);
            } else {
              navi('/wait-for-help');
            }
        });
    }

    function Map() {
        return(
            <>
                <h4> Pin your location</h4>
                <img src={map} alt="Map" className='map'></img>
            </>
        );
    }

    return (
        <>
        <Card>
            <Form onSubmit={handleSave}>
                <Form.Group id="title">
                    <Form.Label>Enter Message Title</Form.Label>
                    <Form.Control type="title" ref={titleRef} required placeholder="Title/Summary"/>
                </Form.Group>
                <Form.Group id="desc">
                    <Form.Label>Enter Problem</Form.Label>
                    <Form.Control type="description" ref={contentRef} required placeholder="Details/Description" as="textarea"/>
                </Form.Group>
                <Button className="w-100 mt-3" type="submit">
                    Post a question
                </Button>
            </Form>
        </Card>
        <div className="w-100  text-center mt-3">
            <Link to="/"><h2>Cancel</h2></Link>
        </div>
        </>
    );
}