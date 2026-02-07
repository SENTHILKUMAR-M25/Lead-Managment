// import { useSelector } from "react-redux";
// import { Calendar, User, Phone, Mail, CheckCircle, Clock } from "lucide-react";

// const LeadHistory = () => {
//   const leads = useSelector(state => state.leads);


//   return (
//     <div className="p-6 md:p-10">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Lead History</h1>
//         <p className="text-gray-500 mt-1">
//           Track all lead activities, updates, and status changes
//         </p>
//       </div>

//       {leads.length === 0 ? (
//         <div className="text-center py-20 text-gray-400">
//           No lead history available
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {leads.map(lead => (
//             <div key={lead.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition">
//               {/* Top Row */}
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//                     <User className="w-5 h-5 text-blue-600" />
//                     {lead.company}
//                   </h2>
//                   <p className="text-gray-500 text-sm">
//                     Lead ID: <span className="font-medium">{lead.id}</span>
//                   </p>
//                 </div>

//                 <span className={`px-4 py-1 rounded-full text-sm font-semibold
//                   ${lead.status === "Completed" ? "bg-green-100 text-green-700" : ""}
//                   ${lead.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
//                   ${lead.status === "Rejected" ? "bg-red-100 text-red-700" : ""}
//                 `}>
//                   {lead.status}
//                 </span>
//               </div>

//               {/* Lead Info */}
//               <div className="grid md:grid-cols-3 gap-4 mt-5 text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-4 h-4 text-gray-400" /> {lead.phone}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-4 h-4 text-gray-400" /> {lead.email}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-gray-400" /> {new Date(lead.createdAt).toLocaleDateString()}
//                 </div>
//               </div>

//               {/* History Section */}
//               <div className="mt-6 border-t pt-4">
//                 <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   Activity History
//                 </h3>

//                 {lead.history?.length > 0 ? (
//                   <ul className="space-y-2 text-sm text-gray-600">
//                     {lead.history.map((item, index) => (
//                       <li key={index} className="flex flex-col md:flex-row md:justify-between gap-1">
//                         <div className="flex items-center gap-2">
//                           <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
//                           <span>{item.action}</span>
//                         </div>
//                         <div className="text-gray-400 text-xs md:text-right">
//                           <div>By: {item.updatedBy || "N/A"}</div>
//                           <div>Date: {item.date}</div>
//                         </div>
//                         <div className="text-gray-500 text-xs mt-1 md:mt-0">
//                           Updated Data: {JSON.stringify(item.data)}
//                         </div>
//                       </li>
//                     ))}
                    
//                   </ul>
//                 ) : (
//                   <p className="text-gray-400 text-sm">No activity recorded</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeadHistory;


import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, Phone, Mail, CheckCircle, Clock, ArrowLeft } from "lucide-react";

const LeadHistory = () => {
  const { id } = useParams(); // Get lead ID from URL
  const leads = useSelector(state => state.leads);

  // Find the specific lead
  const lead = leads.find(l => l.id === id);

  if (!lead) {
    return (
      <div className="p-6 text-center text-gray-400">
        Lead not found
        <div className="mt-4">
          <Link to="/reports" className="text-blue-600 hover:underline flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lead History</h1>
          <p className="text-gray-500 mt-1">
            Track all activities for <b>{lead.company}</b>
          </p>
        </div>
        <Link to="/reports" className="text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>

     

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300">
  {/* Top Row: Header & Status */}
  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
    <div>
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" /> {lead.company}
      </h2>
      <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider font-semibold">
        Lead ID: <span className="text-gray-700">{lead.id}</span>
      </p>
    </div>

    <span
      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
        ${lead.status === "Completed" ? "bg-green-100 text-green-700 border border-green-200" : ""}
        ${lead.status === "Pending" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" : ""}
        ${lead.status === "Rejected" ? "bg-red-100 text-red-700 border border-red-200" : ""}
      `}
    >
      {lead.status}
    </span>
  </div>

  {/* Contact Info Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
    <div className="flex items-center gap-3">
      <Phone className="w-4 h-4 text-blue-500" /> 
      <span className="truncate">{lead.phone}</span>
    </div>
    <div className="flex items-center gap-3">
      <Mail className="w-4 h-4 text-blue-500" /> 
      <span className="truncate">{lead.email}</span>
    </div>
    <div className="flex items-center gap-3">
      <Calendar className="w-4 h-4 text-blue-500" /> 
      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
    </div>
  </div>

  {/* History Section */}
  <div className="mt-8">
    <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
      <Clock className="w-4 h-4 text-gray-400" /> Activity History
    </h3>

    {lead.history?.length > 0 ? (
      <div className="relative pl-6 border-l-2 border-gray-100 space-y-6">
        {lead.history.map((item, index) => (
          <div key={index} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-500" />
            
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.action}</p>
                <p className="text-xs text-gray-400">By {item.updatedBy || "System"}</p>
              </div>
              <time className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                {item.date}
              </time>
            </div>

            {/* Dynamic Metadata Badges */}
            {item.data && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(item.data).map(([key, value]) => (
                  <div key={key} className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">
                    <span className="font-bold">{key}:</span> {value?.toString()}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-4 bg-gray-50 rounded-lg border border-dashed">
        <p className="text-gray-400 text-sm">No activity recorded yet</p>
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default LeadHistory;
