import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

export default function ProfileModal({ close }) {
  const { user, logout, setUser } = useContext(AuthContext)

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const api = axios.create({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })

  // Update profile
  const handleUpdate = async () => {
    if (!name.trim()) return setError("Name is required")
    if (!email.trim()) return setError("Email is required")
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) return setError("Invalid email format")

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const res = await api.patch("http://localhost:5000/api/v1/me/update", {
        name,
        email,
      })

      setUser(res.data) // update context
      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  // Delete account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return
    try {
      setLoading(true)
      await api.delete("http://localhost:5000/api/v1/me/delete")
      logout()
      window.location = "/" // redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-xl w-96 text-white border border-white/20">
        <h2 className="text-2xl mb-4">Profile</h2>

        {error && <p className="text-red-400 mb-2">{error}</p>}
        {success && <p className="text-green-400 mb-2">{success}</p>}

        <input
          className="w-full mb-3 p-2 rounded bg-black/40"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 rounded bg-black/40"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-purple-600 w-full py-2 rounded mb-2 hover:bg-purple-700 transition"
        >
          {loading ? "Please wait..." : "Update Profile"}
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 w-full py-2 rounded mb-2 hover:bg-red-700 transition"
        >
          Delete Account
        </button>

        <button
          onClick={close}
          className="text-sm text-gray-300 w-full mt-1 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  )
}
