import React, {useState} from "react"
import axios from "axios"

export default function Signup(){
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [msg,setMsg]=useState("")

  const signup=async()=>{
    await axios.post(
      "http://localhost:5000/api/v1/auth/signup",
      {name,email,password}
    )
    setMsg("Account created! Please login.")
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Signup
        </h2>

        {msg && <p className="text-green-600 mb-3">{msg}</p>}

        <input className="input" placeholder="Name"
          onChange={e=>setName(e.target.value)} />

        <input className="input" placeholder="Email"
          onChange={e=>setEmail(e.target.value)} />

        <input className="input" type="password" placeholder="Password"
          onChange={e=>setPassword(e.target.value)} />

        <button
          onClick={signup}
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Create Account
        </button>

      </div>
    </div>
  )
}
