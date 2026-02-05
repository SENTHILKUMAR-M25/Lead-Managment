import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Slice/userSlice";
import { 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  User as UserIcon, 
  MoreVertical, 
  Search,
  X,
  Plus
} from "lucide-react";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "agent"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ id: Date.now(), ...form }));
    setForm({ name: "", email: "", role: "agent" });
    setShowForm(false);
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-purple-50 text-purple-700 border-purple-100",
      manager: "bg-blue-50 text-blue-700 border-blue-100",
      agent: "bg-emerald-50 text-emerald-700 border-emerald-100"
    };
    return styles[role] || styles.agent;
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Team Members</h2>
          <p className="text-gray-500 text-sm font-medium">Manage permissions and workspace access.</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text"
          placeholder="Search team..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* USER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((u) => (
          <div key={u.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-gray-200/60 transition-all group relative">
            <button className="absolute top-6 right-6 text-gray-300 hover:text-gray-600">
              <MoreVertical className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center text-blue-600 font-black text-xl shadow-inner">
                {u.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">{u.name}</h3>
                <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getRoleBadge(u.role)}`}>
                  {u.role}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <div className="p-1.5 bg-gray-50 rounded-lg"><Mail className="w-3.5 h-3.5" /></div>
                <span className="truncate font-medium">{u.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <div className="p-1.5 bg-gray-50 rounded-lg"><ShieldCheck className="w-3.5 h-3.5" /></div>
                <span className="font-medium truncate">Full Access Granted</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 flex gap-2">
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2.5 rounded-xl text-xs font-bold transition-colors">
                View Activity
              </button>
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 rounded-xl text-xs font-bold transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SLIDE-OVER / MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          
          <form
            onSubmit={handleSubmit}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 animate-in fade-in zoom-in duration-200"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900">Add Team Member</h3>
                <p className="text-gray-500 text-sm font-medium">Invitation will be sent via email.</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    type="email"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Role & Permissions</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-700"
                >
                  <option value="admin">Admin (Full Control)</option>
                  <option value="manager">Manager (Pipeline Control)</option>
                  <option value="agent">Agent (Lead Access Only)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-4"
              >
                Confirm Invitation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;