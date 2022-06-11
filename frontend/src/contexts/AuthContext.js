import React, {useContext, useState, useEffect} from 'react'
// import {auth} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return true //auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return true //auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return true //auth.signOut()
  }

  function resetPassword(email) {
    return true //auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return true //currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return true //currentUser.updatePassword(password)
  }

  useEffect(() => {
    setLoading(false)
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   setCurrentUser(user)
    //   setLoading(false)
    // })

    // return unsubscribe
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
