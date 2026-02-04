import React, { useState } from "react"
import axios from "axios"

export default function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")

  const login = async () => {
    try{
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {email,password}
      )
      localStorage.setItem("token",res.data.token)
      window.location="/dashboard"
    }catch(err){
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 mb-3 text-sm">
            {error}
          </p>
        )}

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          No account? 
          <a href="/signup" className="text-blue-600 ml-1">Signup</a>
        </p>
      </div>
    </div>
  )
}
