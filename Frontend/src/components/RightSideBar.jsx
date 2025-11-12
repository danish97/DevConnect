import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";

const RightSideBar = () => {
  const [users, setUsers] = useState([]);
  const { token, user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const currentUser = user;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allUsers = res.data;
        setUsers(
          allUsers.map((u) => ({
            ...u,
            isFollowing: user.following.includes(u._id),
          }))
        );
      } catch (err) {
        toast.error("Error Fetching users");
      } finally {
        setLoading(false);
      }
    };

    if (token && user) fetchUsers();
  }, [token, user]);

  // Handle Follow
  const handleFollow = async (targetUser) => {
    const isCurrentlyFollowing = currentUser?.following?.includes(
      targetUser._id
    );
    const endpoint = isCurrentlyFollowing
      ? `/unfollow/${targetUser._id}`
      : `/follow/${targetUser._id}`;
    try {
      await api.post(
        endpoint,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === targetUser._id
            ? { ...u, isFollowing: !isCurrentlyFollowing }
            : u
        )
      );
      const updatedFollowing = isCurrentlyFollowing
        ? user.following.filter((id) => id !== targetUser._id)
        : [...user.following, targetUser._id];

      const updatedUser = { ...user, following: updatedFollowing };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success(
        isCurrentlyFollowing
          ? `Unfollowed ${targetUser.username}`
          : `You are now following ${targetUser.username}`
      );
    } catch (err) {
      console.error("Error following user", err);
      toast.error(`Error following ${targetUser.username}`);
    }
  };

  if (loading) return null;

  return (
    <aside className="hidden md:block w-72 right-3 p-4 top-0 sticky self-center overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-base-content">
        Suggested Users
      </h2>
      <ul className="space-y-4">
        {users.length > 0 ? (
          users.map((u) => (
            <li
              key={u._id}
              className="flex items-center justify-between p-3 rounded-lg bg-base-200 hover:bg-base-300 transition"
            >
              <div>
                <p className="font-medium text-primary">{u.username}</p>
                <p className="text-sm text-base-content/70">
                  {u.bio || "No bio yet"}
                </p>
              </div>
              <button
                className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                onClick={() => handleFollow(u)}
              >
                <UserPlus size={16} />
                {currentUser?.following?.includes(u._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </li>
          ))
        ) : (
          <p className="text-sm text-base-content/70">No users found</p>
        )}
      </ul>
    </aside>
  );
};

export default RightSideBar;
