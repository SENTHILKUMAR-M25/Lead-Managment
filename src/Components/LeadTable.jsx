import React from "react";
import { Calendar, Building2, MoreHorizontal, ExternalLink } from "lucide-react";

const statusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "Rejected":
      return "bg-rose-50 text-rose-700 border-rose-100";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100";
  }
};

const LeadTable = ({ leads }) => {
  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">No leads found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Company & Contact</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Industry Type</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Current Status</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Follow Up</th>
            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {leads.map((lead) => (
            <tr 
              key={lead.id} 
              className="group hover:bg-blue-50/30 transition-all duration-200 cursor-default"
            >
              {/* COMPANY INFO */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-100">
                    {lead.company.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {lead.company}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {lead.contact || "No contact listed"}
                    </p>
                  </div>
                </div>
              </td>

              {/* LEAD TYPE */}
              <td className="px-6 py-4">
                <div className="flex justify-center">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-tighter">
                    {lead.type}
                  </span>
                </div>
              </td>

              {/* STATUS PILL */}
              <td className="px-6 py-4">
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusColor(
                      lead.status
                    )}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      lead.status === "Completed" ? "bg-emerald-500" : 
                      lead.status === "Pending" ? "bg-amber-500" : "bg-rose-500"
                    }`} />
                    {lead.status}
                  </span>
                </div>
              </td>

              {/* FOLLOW UP DATE */}
              <td className="px-6 py-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-gray-600 shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs font-mono font-bold tracking-tighter">
                    {lead.followUp || "TBD"}
                  </span>
                </div>
              </td>

              {/* ACTIONS */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-white hover:text-blue-600 text-gray-400 rounded-lg transition-all border border-transparent hover:border-gray-200">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white hover:text-gray-600 text-gray-400 rounded-lg transition-all border border-transparent hover:border-gray-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;