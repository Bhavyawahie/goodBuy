const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers } = require('../controllers/userController')
const { protect, admin } = require('../middlewares/authMiddleware')

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);


module.exports = router;