import React, {useState,useContext} from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

export default function Login(){

  const { login } = useContext(AuthContext)

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)

  const validate = ()=>{
    if(!email || !password) return "All fields required"

    const emailRegex = /\S+@\S+\.\S+/
    if(!emailRegex.test(email)) return "Invalid email"

    if(password.length < 6) return "Password must be 6+ chars"

    return null
  }

  const handleLogin = async ()=>{
    const msg = validate()
    if(msg) return setError(msg)

    try{
      setLoading(true)
      setError("")

      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {email,password}
      )

      login(res.data.token)
      window.location="/dashboard"

    }catch(err){
      setError(err.response?.data?.message || "Login failed")
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-4"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-sm">
          No account? <a href="/signup" className="text-blue-600">Signup</a>
        </p>
      </div>

    </div>
  )
}
