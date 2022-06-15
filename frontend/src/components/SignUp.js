import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const phoneRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [computingAcc, setAcc] = useState(true)
  const navi = useNavigate()
  
  async function handleSubmit(e) {
      e.preventDefault()

      if (passwordRef.current.value !== passwordConfirmRef.current.value ) {
          return setError('Passwords do not match')
      }

      const newAcc = {
        name : nameRef.current.value,
        email : emailRef.current.value,
        password : passwordRef.current.value,
        computing : computingAcc,
        phone : phoneRef.current.value
      }

      try {
          setError("")
          setLoading(true)
          await signup(newAcc)
          navi("/")
      } catch(err) {
          setError('Failed to create an account: ' + err.message)
      }

      setLoading(false)

      
  }

  function handleAccType(e) {
        setAcc(!computingAcc)
  }

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4"> Sign Up </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}> 
                <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" ref={nameRef} required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Form.Group id="phone">
                    <Form.Label>Phone no.</Form.Label>
                    <Form.Control type="phone" ref={phoneRef} required />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="radio" checked={computingAcc} onChange={handleAccType} label="Computing"/>
                    <Form.Check type="radio" checked={!computingAcc} onChange={handleAccType} label="Non-Computing"/>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                    Sign Up
                </Button>
            </Form>
        </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
    </div>
    </>
  )
}
