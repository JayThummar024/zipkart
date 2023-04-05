const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

//routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all", getUsers); //all users
router.get("/:id", authMiddleware, isAdmin, getUser); // single user
router.delete("/:id", authMiddleware, deleteUser); // single user
router.put("/:id", authMiddleware, updateUser); // Update user

module.exports = router;
