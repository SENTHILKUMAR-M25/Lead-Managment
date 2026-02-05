import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slice/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { 
  LogOut, 
  LayoutDashboard, 
  Users, 
  Bell, 
  Settings, 
  Search 
} from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Assuming your authSlice has user data
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group ${
          isActive 
            ? "bg-blue-50 text-blue-600" 
            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
        }`}
      >
        <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`} />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-100 sticky top-0 z-50 flex items-center justify-between px-8 shadow-sm">
      
      {/* LEFT: LOGO & MAIN NAV */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Users className="text-white w-5 h-5" />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-gray-800">
            Lead<span className="text-blue-600">Flow</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/leads" icon={Users} label="Leads" />
        </div>
      </div>

      {/* RIGHT: SEARCH & USER PROFILE */}
      <div className="flex items-center gap-6">
        

        {/* Notifications */}
        <button className="relative text-gray-400 hover:text-blue-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
        </button>

        {/* User Actions */}
        <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-800">{user?.name || "John Doe"}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Admin</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors group"
          >
            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;