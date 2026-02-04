import React, { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(() => {
    if (token) {
      // optionally fetch user from API
      setUser({ initials: "U" }) // dummy for now
    }
  }, [token])

  const login = (t, u = null) => {
    localStorage.setItem("token", t)
    setToken(t)
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
