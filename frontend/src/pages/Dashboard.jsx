import React, {useEffect,useState} from "react"
import axios from "axios"

export default function Dashboard(){
  const token = localStorage.getItem("token")

  const api = axios.create({
    headers:{ Authorization:`Bearer ${token}` }
  })

  const [profile,setProfile]=useState({})
  const [tasks,setTasks]=useState([])
  const [title,setTitle]=useState("")

  

  return(
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">
          Welcome {profile.name}
        </h2>

        <button
          onClick={()=>{
            localStorage.clear()
            window.location="/"
          }}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6 flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="New Task..."
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map(t=>(
          <div key={t._id}
            className="bg-white p-3 rounded shadow flex justify-between"
          >
            <span>{t.title}</span>
            <button
              onClick={()=>removeTask(t._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
