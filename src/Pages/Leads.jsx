import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLeadStatus } from "../Slice/leadSlice";
import {
  Search,
  Filter,
  Plus,
  ShieldCheck,
  User as UserIcon,
  Layers,
  Calendar,
  Eye // Added Eye Icon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const leads = useSelector(state => state.leads);
  const user = useSelector(state => state.auth.user);
  const leadStatuses = useSelector(state => state.settings.leadStatuses);

  // RBAC Filter
  const accessibleLeads = useMemo(() => {
    return user.role === "admin"
      ? leads
      : leads.filter(l => l.createdBy === user.id);
  }, [leads, user]);

  // Search & Status Filter
  const visibleLeads = useMemo(() => {
    return accessibleLeads.filter(lead => {
      const matchesSearch = lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "All" || lead.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [accessibleLeads, searchTerm, filterStatus]);

  const handleStatusChange = (id, status) => {
    dispatch(updateLeadStatus({
      id,
      status,
      updatedBy: user.name,
      updatedAt: new Date().toISOString()
    }));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Rejected": return "bg-rose-50 text-rose-700 border-rose-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Lead Directory</h2>
            {user.role === "admin" ? (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" /> Admin View
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-wider">
                <UserIcon className="w-3 h-3" /> My Leads
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm font-medium">Manage, track, and update your sales pipeline.</p>
        </div>

        <button
          onClick={() => navigate("/add-lead")}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create New Lead
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by company or contact..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {leadStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Prospect</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Type</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Status Update</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Follow Up</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visibleLeads.length > 0 ? (
              visibleLeads.map(lead => (
                <tr key={lead.id} className="group hover:bg-blue-50/20 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {lead.company.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-gray-800">{lead.company}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                      {lead.type}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <select
                        value={lead.status}
                        onChange={e => handleStatusChange(lead.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer outline-none ${getStatusStyle(lead.status)}`}
                      >
                        {leadStatuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500 font-mono text-xs">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {lead.followUp || "Not set"}
                    </div>
                  </td>

                  {/* ACTION COLUMN ADDED HERE */}
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-200 border border-gray-100 shadow-sm"
                      title="View Lead Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-20 text-center">
                  <Layers className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">No leads found matching your filters.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;

