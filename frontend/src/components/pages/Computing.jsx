import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'
import io from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import "../../css/Computing.css"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

var socket;

const mapContainerStyle = {
  width: "30vw",
  height: "30vh",
};

{/* William Penney Laboratory, South Kensington (Middle of Imperial College London) */}
const center = {
  lat: 51.498929,
  lng: -0.176601,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Computing() {
    const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : "http://localhost:5000"
    const tag1Ref = useRef();
    const tag2Ref = useRef();
    const threadHost = `${domain}/api/threads`;
    const accountHost = `${domain}/api/accounts`;
    const [threads, setThreads] = useState([]);
    const {currentUser} = useAuth();
    const navi = useNavigate();
    

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
      socket.on("new thread", (newThread) => {
        const allThreads = [...threads, newThread];
        setThreads(allThreads);
      });
      {/* Controller listening for the event "thread picked" */}
      socket.on("thread picked", (id) => {
        const allThreads = threads.filter(thread => thread._id != id);
        setThreads(allThreads);
      });
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const id = e.target.value
        const threadToUpdate = {
            id : id,
            answer : currentUser.email
        }

        const updatedThread = await axios.put(`${threadHost}/${id}`, threadToUpdate)
        const helper = await axios.get(`${accountHost}/answer`, {params : {email : currentUser.email}});
        socket.emit("picks a question", {helper: helper.data, id: id, askerEmail: updatedThread.data.owner});
        const asker = await axios.get(`${accountHost}/answer`, {params : {email : updatedThread.data.owner}})
        navi("/pin-location", {
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

    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      // googleMapsApiKey: undefined,
    });

    if (loadError) return "Error loading map";
    if (!isLoaded) return "Loading map...";

    function Map(props) {
      return (
        <>
        <h6>Asker's location</h6>
        <GoogleMap 
          mapContainerStyle={mapContainerStyle} 
          zoom={16}
          center={center}
          options={options}
        >
            <Marker position={{ lat: props.lat, lng: props.lng }}/> 
        </GoogleMap>
        </>
      )
    }

    return(
        <div class="computing">
            <h2>
                Questions:
            </h2>
                <div class="language-filter">
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
                </div>
            <br></br>
                <div class="category-filter">
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
                </div>
            <div className='QuestionsList'>
            {threads.filter(tag1filter).filter(tag2filter).map((thread) =>{
                return (
                    <div key={thread._id} className="mb-3" class="question"> 
                        <h6 class="tags">  #{thread.tag1} #{thread.tag2} </h6> 
                        <h4 class="title">  {thread.title} </h4> 
                        <div class="content">  {thread.content} </div>
                        <Map lat={thread.lat} lng={thread.lng} />
                        <button value={thread._id} onClick={handleSubmit} type="submit" class="answer">Answer this question</button>
                    </div>
                )
            })}
            </div>
            <div className="w-100 text-center mt-3">
                <Link to="/"><h2>Cancel</h2></Link>
            </div>
        </div>
    )
}