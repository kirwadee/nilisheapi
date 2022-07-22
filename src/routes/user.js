const express = require('express');
const { register, deleteUser, fetchUsers, getUserProfile, loginHandler, updateUser } = require('../controllers/user');
const authMiddleware = require('../middlewares/authMiddleware');

const usersRoute = express.Router();

usersRoute.post("/register", register);
usersRoute.post("/login", loginHandler);
usersRoute.get("/:id", authMiddleware, getUserProfile)
// usersRoute.put("/:id",authMiddleware, updateUserProfile)
usersRoute.put("/:id",authMiddleware, updateUser)
usersRoute.delete("/:id", authMiddleware, deleteUser)
usersRoute.get("/",authMiddleware, fetchUsers)



module.exports = usersRoute;