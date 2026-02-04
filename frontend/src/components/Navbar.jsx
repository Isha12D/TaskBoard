import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { FiUser } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import ProfileModal from "./ProfileModal"

export default function Navbar({ onLogin }) {
  const { user, logout } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="bg-black bg-opacity-80 px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-white">TaskBoard</h2>

      <div className="flex items-center gap-6">
        <a href="/" className="hover:text-purple-400 text-white">Home</a>
        <a href="/dashboard" className="hover:text-purple-400 text-white">Dashboard</a>

        {!user ? (
          <button
            onClick={onLogin}
            className="bg-purple-600 px-4 py-1 rounded text-white hover:bg-purple-700 transition"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 bg-purple-600 rounded-full flex justify-center items-center cursor-pointer text-white text-lg"
              title={user.name || "User"}
            >
              <FiUser size={20} />
            </div>

            {open && (
              <div className="absolute right-0 mt-2 bg-black bg-opacity-90 text-white rounded shadow w-36 z-50">
                <button
                  onClick={() => { setProfileOpen(true); setOpen(false) }}
                  className="w-full text-left px-4 py-2 hover:bg-purple-700 transition"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {profileOpen && <ProfileModal close={() => setProfileOpen(false)} />}
    </div>
  )
}
