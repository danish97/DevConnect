import express from "express"
import { registerUser, 
    loginUser, 
    getAllUsers, 
    followUser, 
    unfollowUser, 
    getFollowers,
    getFollowing,
    getUserProfile, 
    updateProfile
} 
    from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";

const loginLimiter = createRateLimiter(5, 60);
const registerLimiter = createRateLimiter(3, 60);
const router = express.Router();

router.post("/register",registerLimiter, registerUser);
router.post("/login",loginLimiter, loginUser);
router.get("/users", auth, getAllUsers );

// Follow a user
router.post("/follow/:id", auth, followUser);
// Unfollow a user
router.post("/unfollow/:id", auth, unfollowUser);
router.get("/:id/followers", auth, getFollowers);
router.get("/:id/following", auth, getFollowing);

//Get Profile
router.get("/user/:id", auth, getUserProfile);
router.put("/me", auth, updateProfile);


export default router;