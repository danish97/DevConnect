import express from "express";
import { createPost, getFeedPosts, toggleLike, addComment, editPost, deletePost, getUserPosts } from "../controllers/postController.js";
import { auth } from "../middleware/auth.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();
const postLimter = createRateLimiter(3, 60);
const likeLimiter  = createRateLimiter(10, 60);
const commentLimiter = createRateLimiter(5, 60);

//create Post
router.post("/post", auth, postLimter, createPost);
// get User Posts
router.get('/post', auth, getUserPosts )
//Get Feed Posts
router.get("/feed", auth, getFeedPosts);
//Like/unlike
router.put("/post/:id/like", auth, likeLimiter, toggleLike);
//Add Comment
router.post("/post/:id/comment", auth, commentLimiter, addComment);

router.put("/post/:id", auth, editPost);
router.delete("/post/:id", auth, deletePost);


export default router;