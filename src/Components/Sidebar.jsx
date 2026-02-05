import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, Users, Settings, 
  FileText, Plus, PieChart, BarChart3 
} from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  // Dynamic class helper for NavLink
  const getLinkClass = ({ isActive }) => `
    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
    ${isActive 
      ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
  `;

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-4 sticky top-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <PieChart size={20} className="text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-800">LeadFlow</span>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Main Menu
        </p>
        
        <NavLink to="/dashboard" className={getLinkClass}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink to="/leads" className={getLinkClass}>
          <FileText size={20} />
          <span className="font-medium">Leads</span>
        </NavLink>

        <NavLink to="/add-lead" className={getLinkClass}>
          <Plus size={20} />
          <span className="font-medium">Add Lead</span>
        </NavLink>

        <NavLink to="/reports" className={getLinkClass}>
          <BarChart3 size={20} />
          <span className="font-medium">Reports</span>
        </NavLink>

        {/* Admin Section */}
        {user?.role === "admin" && (
          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Administration
            </p>
            <NavLink to="/users" className={getLinkClass}>
              <Users size={20} />
              <span className="font-medium">User Management</span>
            </NavLink>

            <NavLink to="/settings" className={getLinkClass}>
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* User Profile Summary */}
      <div className="mt-auto p-2 bg-slate-50 rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || "User"}</p>
          <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;