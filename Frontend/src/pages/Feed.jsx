import  { useEffect, useState } from "react";
import FeedNavbar from "../components/FeedNavbar";
import CreatePost from "../components/CreatePost";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import Post from "../components/Post";
import toast from "react-hot-toast";
import RightSideBar from "../components/RightSideBar";
import ProfileCard from "../components/ProfileCard";

const Feed = () => {
  const { token} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/feed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        toast.error(err.response?.data?.message || "Failed to load posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

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
  return (
    <div>
  <FeedNavbar />

  {/* Main wrapper */}
  <div className="flex justify-center gap-6 mt-6 px-4">
    
    {/* Left Sidebar */}
    <div className="hidden lg:block w-64">
      <ProfileCard/>
    </div>

    {/* Center Feed */}
    <div className="w-full md:w-[600px]">
      <CreatePost onPostCreated={handlePostCreated} />

      <main className="mt-6">
        <h2 className="text-base-content text-xl text-center font-bold">Latest Posts</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-ring loading-md"></span>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-base-content/70 mt-6">
            No Posts On Your Feed ☹️
          </p>
        ) : (
          <div className="mt-4 space-y-4 ">
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
      </main>
    </div>

    {/* Right Sidebar */}
    <div className="hidden lg:block w-72 sticky top-20 self-start ">
      <RightSideBar />
    </div>
  </div>
</div>
  );
};

export default Feed;
