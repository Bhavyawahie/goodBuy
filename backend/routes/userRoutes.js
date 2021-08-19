const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

router.route("/").post(registerUser)
router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);


module.exports = router;