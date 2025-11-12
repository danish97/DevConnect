import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import api from "../lib/axios"
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (auth?.login) {
        auth.login( token, user );
      } 
      
      navigate("/feed");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className='absolute inset-0 z-0'>
        <AnimatedBackground />
      </div>
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary">Welcome Back 👋</h2>
          <p className="text-center text-base-content/70 mb-4">
            Log in to continue to <span className="font-semibold">DevConnect</span>
          </p>

          {error && (
            <div className="alert alert-error mb-3 text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            
            <div className="form-control mt-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-base-content/70 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          
          <p className="text-center mt-4 text-sm text-base-content/70">
            Don't have an account?{" "}
            <a href="/register" className="link link-primary">
              Sign up
            </a>
          </p>
          <p className="text-center mt-4 text-sm text-base-content/70">
            Go Back To 
            <a href="/" className="link link-primary"> Dashboard</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;