import React, { useEffect, useState } from "react"
import axios from "axios"
import Button from "@mui/material/Button"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Dashboard() {

  const token = localStorage.getItem("token")

  const api = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  })

  const [profile, setProfile] = useState({})
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [title, setTitle] = useState("")

  const loadData = async () => {
    try {
      const p = await api.get("http://localhost:5000/api/v1/me")
      const t = await api.get("http://localhost:5000/api/v1/tasks")
      const c = await api.get("http://localhost:5000/api/v1/tasks/completed/all")

      setProfile(p.data)
      setTasks(t.data.filter(x => !x.completed))
      setCompletedTasks(c.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const addTask = async () => {
    await api.post("http://localhost:5000/api/v1/tasks", { title })
    setTitle("")
    loadData()
  }

  const removeTask = async (id) => {
    await api.delete(`http://localhost:5000/api/v1/tasks/${id}`)
    loadData()
  }

  const completeTask = async (id) => {
    await api.patch(`http://localhost:5000/api/v1/tasks/${id}/complete`)
    loadData()
  }

  return (
    <>
      <Navbar profile={profile} /> {/* Avatar + dropdown handles logout */}

      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-8 text-white">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Welcome {profile.name}
          </h2>
        </div>

        {/* ADD TASK */}
        <div className="bg-white/10 p-4 rounded shadow mb-8 flex gap-2 backdrop-blur-md">
          <input
            className="border border-white/30 p-2 flex-1 rounded bg-black/30 text-white placeholder-gray-300"
            placeholder="New Task..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={addTask}>
            Add
          </Button>
        </div>

        {/* PENDING TASKS */}
        <h3 className="font-bold mb-2 text-lg">Pending Tasks</h3>

        <div className="space-y-2 mb-8">
          {tasks.map(t => (
            <div key={t._id}
              className="bg-white/10 p-3 rounded shadow flex justify-between items-center backdrop-blur-md"
            >
              <span>{t.title}</span>

              <div className="flex gap-2">
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={() => completeTask(t._id)}
                >
                  Complete
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => removeTask(t._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* COMPLETED TASKS */}
        <h3 className="font-bold mb-2 text-lg">Completed Tasks</h3>

        <div className="space-y-2">
          {completedTasks.map(t => (
            <div key={t._id}
              className="bg-green-800/40 p-3 rounded shadow backdrop-blur-md"
            >
              ✅ {t.title}
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </>
  )
}
