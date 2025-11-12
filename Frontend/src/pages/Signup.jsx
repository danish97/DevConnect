
import {useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import api from '../lib/axios'
import toast from "react-hot-toast";
import AnimatedBackground from '../components/AnimatedBackground';
import { EyeOff, Eye, UserPlus, MoveLeftIcon  } from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/register", form);
      toast.success(res.data?.message || "Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className='absolute inset-0 z-0'>
            <AnimatedBackground/>
        </div>
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary">
            Create an Account ✨
          </h2>
          <p className="text-center text-base-content/70 mb-4">
            Join <span className="font-semibold">DevConnect</span> and grow with fellow developers.
          </p>

          <form onSubmit={handleSignup}>
            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="e.g. dev_danish"
                className="input input-bordered w-full"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control mt-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password with show/hide */}
            <div className="form-control mt-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-10"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-2/4 -translate-y-2/4 p-1 rounded hover:bg-base-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt">Minimum 6 characters</span>
              </label>
            </div>
            

            {/* Sign Up Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full`}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
                {!loading && <UserPlus size={18} className="ml-2" />}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 text-sm text-base-content/70">
            Already have an account?{" "}
            <a href="/login" className="link link-primary">
              Login here
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

export default Signup;
