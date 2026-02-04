import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Settings, FileText, Plus } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  const linkClass =
    "flex items-center gap-2 px-4 py-2 hover:bg-blue-100 rounded";

  return (
    <div className="w-64 bg-slate-50 border-r p-4 space-y-2">
      <NavLink to="/dashboard" className={linkClass}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink to="/leads" className={linkClass}>
        <FileText size={18} /> Leads
      </NavLink>

      <NavLink to="/add-lead" className={linkClass}>
        <Plus size={18} /> Add Lead
      </NavLink>

      <NavLink to="/reports" className={linkClass}>
        <FileText size={18} /> Reports
      </NavLink>

      {user?.role === "admin" && (
        <>
          <NavLink to="/users" className={linkClass}>
            <Users size={18} /> Users
          </NavLink>

          <NavLink to="/settings" className={linkClass}>
            <Settings size={18} /> Settings
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
