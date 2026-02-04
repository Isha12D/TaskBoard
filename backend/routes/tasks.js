const router = require("express").Router()
const Task = require("../models/Task")
const auth = require("../middleware/auth")

// GET ALL TASKS
router.get("/", auth, async (req,res)=>{
  const tasks = await Task.find({ user:req.user.id })
  res.json(tasks)
})

// GET COMPLETED TASKS
router.get("/completed/all", auth, async (req,res)=>{
  const tasks = await Task.find({
    user:req.user.id,
    completed:true
  })
  res.json(tasks)
})

// CREATE TASK
router.post("/", auth, async (req,res)=>{
  const task = await Task.create({
    title:req.body.title,
    user:req.user.id,
    completed:false
  })
  res.json(task)
})

// MARK COMPLETE
router.patch("/:id/complete", auth, async (req,res)=>{
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {completed:true},
    {new:true}
  )
  res.json(task)
})

// DELETE
router.delete("/:id", auth, async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id)
  res.json({message:"Deleted"})
})

module.exports = router
