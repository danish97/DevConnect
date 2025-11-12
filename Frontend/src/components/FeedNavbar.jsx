import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, User } from "lucide-react";

const FeedNavbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav("/");
  };
  return (
    <header className="bg-base-300 w-[80%] rounded-full overflow-hidden border-b shadow-md mt-2 border-base-200 px-6 py-3 mb-4 mx-auto sticky top-0 z-50 ">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <Link className="btn btn-primary gap-3 rounded-2xl" to={"/profile"}>
            {user?.username}
          </Link>
        </div>
        <div className="flex items-center ">
          <button
            onClick={() => nav("/feed")}
            className="btn btn-ghost flex items-center "
          >
            <Home className='h-6 w-6 md:h-4 md:w-4' />
            <span className='hidden md:flex'>{'<Home/>'}</span>
          </button>
          <button
            onClick={() => nav("/profile")}
            className="btn btn-ghost flex items-center "
          >
            <User className='h-6 w-6 md:h-4 md:w-4' />
            <span className='hidden md:flex'>{'<Profile/>'}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="btn btn-ghost items-center text-error"
          >
            <LogOut className='h-6 w-6 md:h-4 md:w-4' />
            <span className='hidden md:flex'>Logout</span>
          </button>
          
        </div>
      </nav>
      
    </header>
  );
};

export default FeedNavbar;
