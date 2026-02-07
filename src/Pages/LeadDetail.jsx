
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  User, Phone, Mail, Calendar,
  ArrowLeft, Edit3, FileText,
  Clock, Hash, CheckCircle2,
  Save, X
} from "lucide-react";
import { updateLeadProgress } from "../Slice/leadSlice";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔑 Get the lead from Redux
  const lead = useSelector(state =>
    state.leads.find(l => l.id === id)
  );

  // 🔑 Get logged-in user info
  const { user, isLoggedIn } = useSelector(state => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [followUp, setFollowUp] = useState(lead?.followUp || "");
  const [details, setDetails] = useState(lead?.details || "");

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Lead not found</h2>
        <button
          onClick={() => navigate("/leads")}
          className="mt-4 text-blue-600 font-bold hover:underline transition-all"
        >
          Return to directory
        </button>
      </div>
    );
  }

  const labelStyle = "text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1";
  const infoBoxStyle = "bg-gray-50 p-3 sm:p-4 rounded-2xl border border-gray-100 flex items-start gap-3 w-full";
  const inputStyle = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  // 🔑 Update: pass updatedBy from logged-in user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user?.name) return;

    dispatch(updateLeadProgress({
      id: lead.id,
      followUp,
      details,
      updatedBy: user.name // ✅ Save updater name
    }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">

        {/* TOP BAR - Responsive alignment */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>

            <div className="overflow-hidden">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 truncate">{lead.company}</h2>
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-[9px] sm:text-[10px] font-black uppercase whitespace-nowrap">
                  {lead.type}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                <Hash className="w-3 h-3" /> ID: <span className="font-mono">{lead.id.slice(0, 8)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* LEFT COLUMN: CONTACT & NOTES */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">

            {/* CONTACT CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
                <User className="w-5 h-5 text-blue-600" />
                Contact Personnel
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className={infoBoxStyle}>
                  <User className="w-5 h-5 text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <label className={labelStyle}>Primary Contact</label>
                    <p className="font-bold text-slate-800 truncate">{lead.contact || "N/A"}</p>
                  </div>
                </div>

                <div className={infoBoxStyle}>
                  <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <label className={labelStyle}>Phone</label>
                    <p className="font-bold text-slate-800 truncate">{lead.phone || "N/A"}</p>
                  </div>
                </div>

                <div className={`${infoBoxStyle} md:col-span-2`}>
                  <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                  <div className="min-w-0">
                    <label className={labelStyle}>Email</label>
                    <p className="font-bold text-slate-800 break-all">{lead.email || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTES CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
                <FileText className="w-5 h-5 text-emerald-500" />
                Executive Summary
              </h3>
              <p className="italic text-gray-700 leading-relaxed">
                {lead.details || "No additional notes provided."}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: PROGRESS & ACTIONS */}
          <div className="space-y-6 order-1 lg:order-2">

            {/* STATUS & PROGRESS CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <label className={labelStyle}>Current Progress</label>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:text-blue-800 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {!isEditing ? (
                <>
                  <div className="py-3 rounded-2xl font-black text-center uppercase text-sm bg-blue-50 text-blue-600 border border-blue-100">
                    {lead.status}
                  </div>

                  <div className="mt-6 space-y-4 text-xs font-bold">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Created
                      </span>
                      <span className="text-slate-700">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Follow-up
                      </span>
                      <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {lead.followUp || "TBD"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={labelStyle}>Follow-up Date</label>
                    <input
                      type="date"
                      value={followUp}
                      onChange={(e) => setFollowUp(e.target.value)}
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Notes</label>
                    <textarea
                      rows={3}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className={`${inputStyle} resize-none`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 hover:bg-blue-700 shadow-md shadow-blue-100"
                    >
                      <Save className="w-4 h-4" /> Update
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 hover:bg-gray-200"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* QUICK ACTIONS CARD */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-200">
              <h4 className="font-bold mb-4 text-sm sm:text-base">Quick Actions</h4>
              <button
                onClick={() => {
                  if (!isLoggedIn || !user?.name) return;
                  dispatch(updateLeadProgress({
                    id: lead.id,
                    followUp: lead.followUp,
                    details: lead.details,
                    updatedBy: user.name
                  }));
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-all active:scale-[0.98]"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark as Won
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
