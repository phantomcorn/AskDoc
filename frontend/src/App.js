import React from 'react';
import Computing from "./pages/Computing";
import NonComputing from "./pages/NonComputing";
import './App.css';
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import PrivateRoute from './Components/PrivateRoute'
import UpdateProfile from "./Components/UpdateProfile"
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import {Container} from 'react-bootstrap'
import {AuthProvider} from "./contexts/AuthContext"

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
              style={{minHeight: "100vh"}}>
      <div className="w-100" style={{ maxWidth: '400px'}}>
        <h2>
            AskDoC
        </h2>
        <Router>
            <AuthProvider>
              <Routes>
                <Route exact path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/update-profile" element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                } />
                <Route path="/signup" element={ 
                  <SignUp />
                } />
                <Route path="/login" element={
                  <Login />
                } />
                <Route path="/forgot-password" element={
                  <ForgotPassword />
                } />
              </Routes>
            </AuthProvider>
            <Routes>
                <Route path="/computing" element={<Computing />} />
                <Route path="/non_computing" element={<NonComputing />} />
            </Routes>
        </Router>
      </div>
    </Container>
  );
}



export default App;
