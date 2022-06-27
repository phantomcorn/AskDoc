import React from 'react';
import Computing from "./components/pages/Computing"
import NonComputing from "./components/pages/NonComputing";
import './App.css';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from './components/PrivateRoute'
import UpdateProfile from "./components/UpdateProfile"
import WaitForHelp from './components/WaitForHelp';
import AskerInfo from './components/pages/AskerInfo';
import HelperInfo from './components/pages/HelperInfo';
import PinLocation from './components/PinLocation';
import WaitForLocation from './components/WaitForLocation';
import { BrowserRouter as Router,Route,Routes,Link } from "react-router-dom";
import DocSoc from "./assets/docsoc.png"
import {AuthProvider} from "./contexts/AuthContext"

function App() {
  return (
    <div className="background">
      <div className="topnav">
        <h2 className="logo">AskDoC</h2>
        <img src={DocSoc}></img>
      </div>  
      <div className="main-body">
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
                <Route path="/wait-for-help" element={
                  <PrivateRoute>
                    <WaitForHelp />
                  </PrivateRoute>
                } />
                <Route path="/wait-for-location" element={
                  <PrivateRoute>
                    <WaitForLocation />
                  </PrivateRoute>
                } />
                <Route path="/ask" element={
                  <PrivateRoute>
                    <NonComputing />
                  </PrivateRoute>
                } />
                <Route path="/answer" element={
                  <PrivateRoute>
                    <Computing />
                  </PrivateRoute>
                } />
                <Route path="/asker-info" element={
                  <PrivateRoute>
                    <AskerInfo />
                  </PrivateRoute>
                } />
                <Route path="/helper-info" element={
                  <PrivateRoute>
                    <HelperInfo />
                  </PrivateRoute>
                } />
                <Route path="/pin-location" element={
                  <PrivateRoute>
                    <PinLocation />
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
        </Router>
      </div>
    </div>
  );
}



export default App;
