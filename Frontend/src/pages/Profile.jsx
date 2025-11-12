import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import CreatePost from "../components/CreatePost";
import FeedNavbar from "../components/FeedNavbar";
import Post from "../components/Post";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, token, setUser } = useAuth();
  const [isloading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState(user?.skills || '')

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await api.get("/post", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserPosts();
  }, [token, user]);
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };
  const handleUpdate = async (id, updatedContent) => {
    try {
      const res = await api.put(
        `/post/${id}`,
        { content: updatedContent },
        { headers: { Authorization: `${token}` } }
      );
      toast.success("Post updated!");
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === id ? res.data.post : p))
      );
    } catch (err) {
      toast.error("Failed to update post");
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load posts");
    }
  };
  const handleBioUpdate = async () => {
    document.getElementById("bio_modal").close()
    try {
        await api.put('/me', {bio, skills}, {headers: {Authorization: `Bearer ${token}`}});
        toast.success('Bio Updated Succesfully');
        const updatedUser = {...user, bio, skills}
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser)
        
    } catch (err) {
        console.error(err)
        toast.error("Failed to update bio")
    }
  };
  return (
    <div>
      <FeedNavbar />
      {/* main wrapper */}
      <div className="flex justify-center">
        <div className="w-[90%] md:w-md">
          <div className="bg-base-200 rounded-lg mb-4 p-4 space-y-2">
            <p className="font-bold text-primary">{user?.username}</p>
            <p className="text-base-content/70 text-sm">Bio</p>
            <p className="text-base-content text-sm">
              {user?.bio || "No Bio Yet"}
            </p>
            <p className="text-base-content/70 text-sm">Skills</p>
            <p className="text-base-content text-sm">
              {user?.skills}
            </p>
            
            <button
              className="btn btn-primary btn-md"
              onClick={() => document.getElementById("bio_modal").showModal()}
            >
              Edit Profile
            </button>
          </div>
          <CreatePost onPostCreated={handlePostCreated} />
          {isloading ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-ring loading-md"></span>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-base-content/70 mt-6">
              No Posts On Your Feed ☹️
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <h2 className="font-bold text-lg text-center md:text-2xl">My Posts</h2>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  onDelete={handleDeletePost}
                  onEdit={handleUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <dialog id="bio_modal" className="modal">
        <div className="modal_box bg-base-200 px-6 rounded-lg w-sm justify-center space-y-4">     
          <div className="modal-action flex flex-col py-6">
            <h3 className="font-bold text-lg md:text-2xl">Bio</h3>
              <textarea
                className="textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            <h3 className="font-bold text-lg md:text-2xl">Skills</h3>
              <textarea
                className="textarea"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <button onClick={handleBioUpdate} className="btn btn-primary w-full mt-4">
                Update Profile
              </button>
              <button 
              className="btn btn-outline w-full mt-2"
              onClick={() => document.getElementById("bio_modal").close()}
              >
                Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
