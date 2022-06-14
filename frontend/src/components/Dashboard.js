import React, { useState } from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Computing from "./pages/Computing";
import NonComputing from "./pages/NonComputing";

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navi = useNavigate

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navi('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return ( currentUser.computing?
      <>
        <Card>
          <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <strong> User: </strong> {currentUser.computing ? "computing" : "non-computing"}
              <Link to="/answer" className="btn btn-primary w-100 mt-3">
                  Answer a question
              </Link>
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                  Update Profile
              </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
        </div>
      </>
      :
      <>

        <Card>
          <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <strong> User: </strong> {currentUser.computing? "computing" : "non-computing"}
              <Link to="/ask" className="btn btn-primary w-100 mt-3">
                  Ask a question
              </Link>
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                  Update Profile
              </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
        </div>
        <></>
      </>
  )
}
