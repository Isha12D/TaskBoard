import React, { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

export default function AuthModal({ mode: initialMode = "login", close }) {
  const { login } = useContext(AuthContext)

  const [mode, setMode] = useState(initialMode)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")

  // Client-side validation
  const validate = () => {
    if (mode === "signup" && !name.trim()) return "Name is required"
    if (!email.trim()) return "Email is required"
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) return "Invalid email format"
    if (!password) return "Password is required"
    if (password.length < 6) return "Password must be at least 6 characters"
    return null
  }

  const submit = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      if (mode === "signup") {
        await axios.post("http://localhost:5000/api/v1/auth/signup", {
          name,
          email,
          password,
        })
        setSuccess("Account created successfully! Logging in...")
      }

      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      })

      login(res.data.token, res.data.user)
      window.location = "/dashboard"
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-xl w-96 text-white border border-white/20">
        <h2 className="text-2xl mb-4 capitalize">{mode}</h2>

        {/* Error Message */}
        {error && <p className="text-red-400 mb-2">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-400 mb-2">{success}</p>}

        {/* Name field for signup */}
        {mode === "signup" && (
          <input
            className="w-full mb-3 p-2 rounded bg-black/40"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* Email */}
        <input
          className="w-full mb-3 p-2 rounded bg-black/40"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-black/40"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="bg-purple-600 w-full py-2 rounded mb-2 hover:bg-purple-700 transition"
        >
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Signup"}
        </button>

        {/* Toggle Login / Signup */}
        <div className="text-center text-sm text-gray-300 mb-3">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setMode("signup")
                  setError("")
                  setSuccess("")
                }}
                className="text-purple-400 cursor-pointer hover:underline"
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setMode("login")
                  setError("")
                  setSuccess("")
                }}
                className="text-purple-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </div>

        {/* Close Button */}
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
