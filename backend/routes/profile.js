const express = require("express")
const auth = require("../middleware/auth")
const User = require("../models/User")

const router = express.Router()

router.get("/me", auth, async (req,res)=>{
  const user = await User.findById(req.user.id).select("-password")
  res.json(user)
})

router.put("/me", auth, async (req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    {new:true}
  )
  res.json(user)
})

// GET current user profile
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password")
  res.json(user)
})

// UPDATE profile
router.patch("/me/update", auth, async (req, res) => {
  const { name, email } = req.body
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true }
  ).select("-password")
  res.json(user)
})

// DELETE account
router.delete("/me/delete", auth, async (req, res) => {
  await User.findByIdAndDelete(req.user.id)
  res.json({ message: "Account deleted successfully" })
})



module.exports = router
