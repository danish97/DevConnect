import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext.jsx";
import Signup from "./pages/Signup.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Feed from "./pages/Feed.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated || false;
  return (
    <div>
      
      <Routes>
        <Route path="/" element={isAuthenticated ?<Feed/> :<Home/> }/>
        <Route path="/login" element={isAuthenticated ?<Feed/> :<Login/> }/>
        <Route path="/register" element={isAuthenticated ?<Feed/> :<Signup/> }/>
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-center" />
      <div className="bottom-0 w-full">
          <Footer />
      </div>
      
    </div>
  );
}

export default App;
