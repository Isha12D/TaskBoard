import React, { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AuthModal from "./AuthModal"

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext)

  if (!token) {
    // show login modal instead of dashboard
    return <AuthModal mode="login" close={() => {}} />
  }

  return children
}
