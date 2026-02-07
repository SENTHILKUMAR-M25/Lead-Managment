import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, Users, Settings, 
  FileText, Plus, PieChart, BarChart3, 
  Menu, X 
} from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const getLinkClass = ({ isActive }) => `
    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
    ${isActive 
      ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
  `;

  // Helper to close sidebar on mobile after clicking a link
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* --- MOBILE TOP BAR --- */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 relative top-1 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- OVERLAY (Mobile only) --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col p-4 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
       

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
          
          <NavLink to="/dashboard" className={getLinkClass} onClick={closeSidebar}>
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink to="/leads" className={getLinkClass} onClick={closeSidebar}>
            <FileText size={20} />
            <span className="font-medium">Leads</span>
          </NavLink>

          <NavLink to="/add-lead" className={getLinkClass} onClick={closeSidebar}>
            <Plus size={20} />
            <span className="font-medium">Add Lead</span>
          </NavLink>

          <NavLink to="/reports" className={getLinkClass} onClick={closeSidebar}>
            <BarChart3 size={20} />
            <span className="font-medium">Reports</span>
          </NavLink>

          {user?.role === "admin" && (
            <div className="pt-6 mt-6 border-t border-slate-100">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Administration
              </p>
              <NavLink to="/users" className={getLinkClass} onClick={closeSidebar}>
                <Users size={20} />
                <span className="font-medium">User Management</span>
              </NavLink>

              <NavLink to="/settings" className={getLinkClass} onClick={closeSidebar}>
                <Settings size={20} />
                <span className="font-medium">Settings</span>
              </NavLink>
            </div>
          )}
        </nav>

        {/* User Profile */}
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
    </>
  );
};

export default Sidebar;
