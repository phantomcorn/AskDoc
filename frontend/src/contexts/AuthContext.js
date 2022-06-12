import React, {useContext, useState, useEffect} from 'react'
import axios from "axios";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const domain = process.env.NODE_ENV === "production" ? "https://drp-askdoc.herokuapp.com" : `http://localhost:5000`
  const hostSignup = `${domain}/api/accounts/signup`;
  const hostLogin = `${domain}/api/accounts/login`;
  const hostLogout = `${domain}/api/accounts/logout`;
  const hostResetPassword = `${domain}/api/accounts/reset-password`;
  const hostUpdateEmail = `${domain}/api/accounts/update-email`;
  const hostUpdatePassword = `${domain}/api/accounts/update-password`;

  function signup(em, pw) {
    const newAccount = {
      email: em,
      password: pw
    };
    
    return axios.post(hostSignup, newAccount).then(function(res) {
      setCurrentUser(res.data)
      return true
    }).catch((err) => {
      throw new Error(err.response.data.message)
    })
  }

  function login(em, pw) {
    const targetAccount = {
      email: em,
      password: pw
    };

    return axios.post(hostLogin, targetAccount).then(function(res) {
      setCurrentUser(res.data)
      return true
    }).catch((err) => {
      throw new Error(err.response.data.message)
    })
  }

  function logout() {
    return setCurrentUser(null)
  }

  function resetPassword(email) {
    return true//axios.post(hostResetPassword, {Email: email})
  }

  function updateEmail(em) {
    const updAccount = {
      email: currentUser.email,
      password: currentUser.password,
      newemail: em
    };
    return axios.post(hostUpdateEmail, updAccount).then(function(res) {
      setCurrentUser(res.data)
      console.log(res.data)
      return true
    }).catch((err) => {
      throw new Error(err.response.data.message)
    })
  }

  function updatePassword(pw) {
    const updAccount = {
      email: currentUser.email,
      password: currentUser.password,
      newpassword: pw
    };
    return axios.post(hostUpdatePassword, updAccount).then(function(res) {
      setCurrentUser(res.data)
      return true
    }).catch((err) => {
      throw new Error(err.response.data.message)
    })
  }

  useEffect(() => {
    setLoading(false)
  }, [])
  
  const value = {
      currentUser,
      login,
      signup,
      logout,
      resetPassword,
      updateEmail,
      updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
