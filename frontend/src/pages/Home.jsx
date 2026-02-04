import React, {useState} from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import AuthModal from "../components/AuthModal"

export default function Home(){

  const [open,setOpen]=useState(false)
  const [mode,setMode]=useState("login")

  return(
    <div className="min-h-screen flex flex-col 
      bg-gradient-to-br from-black via-purple-900 to-black text-white">

      <Navbar onLogin={()=>{setMode("login");setOpen(true)}} />

      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-5xl font-bold mb-4">
          Manage Your Tasks Smarter
        </h1>

        <p className="text-gray-300 mb-8">
          Simple. Fast. Secure task dashboard.
        </p>

        <button
          onClick={()=>{setMode("signup");setOpen(true)}}
          className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Get Started
        </button>
      </div>

      <Footer/>

      {open && (
        <AuthModal mode={mode} close={()=>setOpen(false)} />
      )}
    </div>
  )
}
