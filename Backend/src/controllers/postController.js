import Post from "../models/Post.js";
import User from "../models/Users.js";

// create post
export async function createPost(req,res){
    try {
        const {content,image} = req.body;
        const post = new Post({
            user: req.user.userId,
            content,
            image
        });
        await post.save();

        const finalPost = await post.populate('user', 'username email');

        res.status(201).json({message: "Post created succesfully", post: finalPost});
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
};
// get feed posts
export const getFeedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const following = user.following;

    const posts = await Post.find({
      user: { $in: [...following, req.user.userId] },
    })
      // ✅ Populate both post creator and commenters
      .populate("user", "username email")
      .populate("comments.user", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Feed fetch error:", error);
    res.status(500).json({ error: "Server error while fetching feed" });
  }
};

// get User Posts

export const getUserPosts = async(req,res) =>{
  try {
    const posts = await Post.find({user:req.user.userId})
      .populate('user', 'username email')
      .sort({createdAt: -1});
      
    if(!posts){
      return res.stats(404).json({message: "no posts found"})
    }
    res.status(200).json(posts)
  } catch (error) {
    console.error("Error getting Posts", error);
    res.status(500).json({message: "Internal Server Error"})
  }
}

// Like or Unlike a post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user.userId;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ message: alreadyLiked ? "Post unliked" : "Post liked" });
  } catch (error) {
    res.status(500).json({ error: "Server error while toggling like" });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = {
      user: req.user.userId,
      text: req.body.text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('user', 'username email')
      .populate('comments.user', 'username email');

    res.json({ message: "Comment added", post });
  } catch (error) {
    res.status(500).json({ error: "Server error while adding comment" });
  }
};

export const editPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure only the post owner can edit
    if (post.user.toString() !== req.user.userId)
      return res.status(403).json({ message: "Not authorized" });

    post.content = content || post.content;
    await post.save();

    // repopulate user so frontend can display username without refresh
    const updatedPost = await Post.findById(post._id).populate("user", "username email");

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Check ownership
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting post" });
  }
};

