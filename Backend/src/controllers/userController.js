import User from "../models/Users.js";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config();


export async function registerUser(req, res) {
    try {
        const { email, password, username } = req.body;
        const existingUser = await User.findOne({ email });
        if(!email || !password || !username){
           return res.status(500).json({message:"Email and password both required"});
        }
        if (existingUser) {
            return res.status(400).json({ error: "Email Already in Use" });
        }
        //Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            email,
            password: hashedPassword,
            username
        });

        await user.save();
        res.status(201).json({ message: "User Registered Succesfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Server error" });

    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");;
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,);
        const userObj = user.toObject();
        delete userObj.password;
        res.json({ token, user: userObj })

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const getAllUsers = async (req, res) => {
  try {
    // Exclude the currently logged-in user
    const users = await User.find({ _id: { $ne: req.user.userId } })
      .select("username bio _id");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};
//-------------------Follow User--------------
export const followUser = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { id: targetId } = req.params; 

    if (userId === targetId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found." });
    }
    
    if (user.following.includes(targetId)) {
      return res.status(400).json({ message: "You are already following this user." });
    }

    user.following.push(targetId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User followed successfully." });
  } catch (error) {
    console.error("Follow user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ UNFOLLOW USER ------------------
export const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id: targetId } = req.params;

    if (userId === targetId) {
      return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.following.includes(targetId)) {
      return res.status(400).json({ message: "You are not following this user." });
    }

    user.following = user.following.filter(id => id.toString() !== targetId);
    targetUser.followers = targetUser.followers.filter(id => id.toString() !== userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    console.error("Unfollow user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ------------------ GET FOLLOWERS ------------------
export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate(
      "followers",
      "username avatar bio"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      count: user.followers.length,
      followers: user.followers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ GET FOLLOWING ------------------
export const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate(
      "following",
      "username avatar bio"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      count: user.following.length,
      following: user.following,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// ------------------ GET PUBLIC PROFILE ------------------
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("-password")
      .populate("followers", "username avatar")
      .populate("following", "username avatar");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ------------------ UPDATE PROFILE ------------------
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // same as token payload field

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};




