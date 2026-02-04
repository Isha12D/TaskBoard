import React from 'react'
export default function Footer(){
  return(
    <div className="bg-black bg-opacity-80 px-10 py-12 text-gray-400">

      <div className="grid md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-white font-bold mb-2">TaskBoard</h3>
          <p>Manage tasks efficiently.</p>
        </div>

        <div>
          <p>Features</p>
          <p>Secure Auth</p>
          <p>Task Tracking</p>
        </div>

        <div>
          <p>Contact</p>
          <p>support@taskboard.com</p>
        </div>

      </div>

      <p className="text-center mt-8 text-sm">
        © 2026 TaskBoard
      </p>
    </div>
  )
}
