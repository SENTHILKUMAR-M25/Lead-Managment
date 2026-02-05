
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// Optional: install lucide-react for icons
import { Lock, User, LogIn, ShieldCheck } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ADMIN_EMAIL = "gvs02@gmail.com";
  const ADMIN_USERID = "gvs02";
  const ADMIN_PASSWORD = "Gvs$02";


  const handleLogin = (e) => {
    e.preventDefault();

    const isAdmin =
      (username === ADMIN_EMAIL || username === ADMIN_USERID) &&
      password === ADMIN_PASSWORD;

    if (isAdmin) {
      dispatch(
        login({
          id: uuidv4(),
          name: username,
          role: "admin",
        })
      );
      navigate("/dashboard");
      return;
    }

    // Default user login
    dispatch(
      login({
        id: uuidv4(),
        name: username,
        role: "user",
      })
    );
    navigate("/dashboard");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

          {/* Header Section */}
          <div className="bg-blue-600 p-8 text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-blue-100 mt-1 text-sm">Please enter your details to sign in</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                User ID / Email Address
              </label>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>

                <input
                  type="text"   // changed from "email"
                  placeholder="userid or name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>


            <div>
              <div className="flex justify-between mb-1.5 ml-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all mt-2"
            >
              <LogIn size={20} />
              Sign In
            </button>
          </form>


        </div>

        {/* Decorative background element */}
        <p className="text-center text-slate-400 text-xs mt-8">
          © 2026 Your Brand Inc. Secure Login.
        </p>
      </div>
    </div>
  );
};

export default Login;