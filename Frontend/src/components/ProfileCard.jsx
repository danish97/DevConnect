import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

const ProfileCard = () => {
  const { user, token } = useAuth();
  if (!token) return;
  
  return (
    <div className="hidden md:block w-64 sticky self-start top-30 ">
      <div className="flex items-center align-middle gap-2 mb-2">
        <h2 className="font-bold text-lg text-base-content ">Profile</h2>
        <User size={18} />
      </div>
      <div className="bg-base-200 rounded-lg border-r border-base-300 left-3 p-6 hover:bg-base-300 transition-all duration-300 shadow-md space-y-3 ">
        <p className="font-bold text-primary">{user?.username}</p>
        <p className="text-base-content/70 text-sm">Bio</p>
        <p className="text-base-content text-sm">{user?.bio || "No Bio Yet"}</p>
        <p className="text-base-content/70 text-sm">Skills</p>
        <p className="text-base-content text-sm">{user?.skills || "No Bio Yet"}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
