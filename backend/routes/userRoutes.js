const express = require('express');
const router = express.Router();
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('../controllers/userController')
const { protect, admin } = require('../middlewares/authMiddleware')

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.post("/login", authUser)
router                                        // User specific indivisual
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile); 
router                                      // Admin-Only Private Routes
    .route("/:id")
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

module.exports = router;