

// import { useDispatch, useSelector } from "react-redux";
// import { updateLeadStatus } from "../Slice/leadSlice";
// import { Link } from "react-router-dom";
// import { Eye } from "lucide-react";

// const Reports = () => {
//   const dispatch = useDispatch();
//   const leads = useSelector(state => state.leads);

//   // Count completed leads
//   const completedCount = leads.filter(
//     l => l.status === "Completed"
//   ).length;

//   // Handle lead status update
//   const handleUpdate = (id, status) => {
//     dispatch(
//       updateLeadStatus({
//         id,
//         status,
//         updatedBy: "Admin", // Pass the name of the updater
//         updatedAt: new Date().toISOString() // store as ISO string
//       })
//     );
//   };

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div>
//         <h2 className="text-2xl font-bold">Reports</h2>
//         <p className="text-gray-500">
//           Total Completed Leads: <b>{completedCount}</b>
//         </p>
//       </div>

//       {/* REPORT TABLE */}
//       <div className="bg-white rounded shadow overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Company</th>
//               <th className="p-3 text-center">Status</th>
//               <th className="p-3 text-center">Updated By</th>
//               <th className="p-3 text-center">Updated At</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {leads.map(lead => (
//               <tr key={lead.id} className="border-t">
//                 <td className="p-3">{lead.company}</td>

//                 <td className="p-3 text-center">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-semibold
//                       ${lead.status === "Completed" ? "bg-green-100 text-green-700" : ""}
//                       ${lead.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
//                       ${lead.status === "Rejected" ? "bg-red-100 text-red-700" : ""}
//                     `}
//                   >
//                     {lead.status || "N/A"}
//                   </span>
//                 </td>

//                 <td className="p-3 text-center">
//                   {lead.updatedBy || "-"}
//                 </td>

//                 <td className="p-3 text-center text-xs">
//                   {lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : "-"}
//                 </td>

//                 <td className="p-3 text-center space-x-2">
//                   <Link to={`/leadhistory/${lead.id}`} className="text-blue-600 hover:underline">
//                     <Eye className="w-4 h-4" />
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reports;



import { useDispatch, useSelector } from "react-redux";
import { updateLeadStatus } from "../Slice/leadSlice";
import { Link } from "react-router-dom";
import { Eye, CheckCircle, Clock, XCircle, Search, Filter } from "lucide-react";

const Reports = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads);

  // Stats calculation
  const stats = {
    total: leads.length,
    completed: leads.filter((l) => l.status === "Completed").length,
    pending: leads.filter((l) => l.status === "Pending").length,
    rejected: leads.filter((l) => l.status === "Rejected").length,
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* HEADER & STATS CARDS */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Reports</h2>
          <p className="text-gray-500 mt-1">Real-time overview of lead progression and team activity.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value={stats.total} icon={<Search className="text-blue-600" />} color="blue" />
        <StatCard title="Completed" value={stats.completed} icon={<CheckCircle className="text-green-600" />} color="green" />
        <StatCard title="Pending" value={stats.pending} icon={<Clock className="text-yellow-600" />} color="yellow" />
        <StatCard title="Rejected" value={stats.rejected} icon={<XCircle className="text-red-600" />} color="red" />
      </div>

      {/* REPORT TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated By</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">{lead.company}</div>
                    <div className="text-[10px] text-gray-400 font-mono">#{lead.id}</div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ring-1 ring-inset
                        ${lead.status === "Completed" ? "bg-green-50 text-green-700 ring-green-600/20" : ""}
                        ${lead.status === "Pending" ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20" : ""}
                        ${lead.status === "Rejected" ? "bg-red-50 text-red-700 ring-red-600/20" : ""}
                      `}
                    >
                      {lead.status || "N/A"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 uppercase text-[11px] font-bold text-gray-600">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">
                        {lead.updatedBy?.charAt(0) || "A"}
                      </div>
                      {lead.updatedBy || "System"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {lead.updatedAt ? new Date(lead.updatedAt).toLocaleDateString() : "-"}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {lead.updatedAt ? new Date(lead.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/leadhistory/${lead.id}`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* EMPTY STATE */}
        {leads.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-400 italic">No reports available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-component for the stats cards
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-lg bg-${color}-50`}>
      {icon}
    </div>
  </div>
);

export default Reports;