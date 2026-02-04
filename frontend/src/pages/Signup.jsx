import React, {useState} from "react"
import axios from "axios"

export default function Signup(){

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")
  const [success,setSuccess]=useState("")
  const [loading,setLoading]=useState(false)

  const validate = ()=>{
    if(!name || !email || !password) return "All fields required"

    if(password.length < 6) return "Password min 6 chars"

    return null
  }

  const handleSignup = async ()=>{
    const msg = validate()
    if(msg) return setError(msg)

    try{
      setLoading(true)
      setError("")

      await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        {name,email,password}
      )

      setSuccess("Account created! Login now.")
      setName(""); setEmail(""); setPassword("")

    }catch(err){
      setError(err.response?.data?.message || "Signup failed")
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <input
          className="border w-full p-2 mb-3"
          placeholder="Name"
          onChange={e=>setName(e.target.value)}
        />

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
          onClick={handleSignup}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="mt-3 text-sm">
          Already have account? <a href="/" className="text-blue-600">Login</a>
        </p>

      </div>
    </div>
  )
}
