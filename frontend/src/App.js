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
                <Route path="/wait-for-help" element={
                  <PrivateRoute>
                    <WaitForHelp />
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
    </Container>
  );
}



export default App;
