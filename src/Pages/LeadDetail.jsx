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

  const lead = useSelector(state =>
    state.leads.find(l => l.id === id)
  );

  const [isEditing, setIsEditing] = useState(false);
  const [followUp, setFollowUp] = useState(lead?.followUp || "");
  const [details, setDetails] = useState(lead?.details || "");

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <h2 className="text-2xl font-bold">Lead not found</h2>
        <button
          onClick={() => navigate("/leads")}
          className="mt-4 text-blue-600 font-bold"
        >
          Return to directory
        </button>
      </div>
    );
  }

  const labelStyle =
    "text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1";

  const infoBoxStyle =
    "bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-start gap-3";

  const inputStyle =
    "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLeadProgress({
      id: lead.id,
      followUp,
      details
    }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 bg-white border rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-extrabold">{lead.company}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase">
                  {lead.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Hash className="w-3 h-3" /> ID: {lead.id.slice(0, 8)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* CONTACT */}
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Contact Personnel
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className={infoBoxStyle}>
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className={labelStyle}>Primary Contact</label>
                    <p className="font-bold">{lead.contact || "N/A"}</p>
                  </div>
                </div>

                <div className={infoBoxStyle}>
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className={labelStyle}>Phone</label>
                    <p className="font-bold">{lead.phone || "N/A"}</p>
                  </div>
                </div>

                <div className={`${infoBoxStyle} md:col-span-2`}>
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <label className={labelStyle}>Email</label>
                    <p className="font-bold">{lead.email || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                Executive Summary
              </h3>
              <p className="italic text-gray-700">
                {lead.details || "No additional notes provided."}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* CURRENT PROGRESS */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <label className={labelStyle}>Current Progress</label>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                )}
              </div>

              {!isEditing ? (
                <>
                  <div className="py-3 rounded-2xl font-black text-center uppercase text-sm bg-blue-50 text-blue-600">
                    {lead.status}
                  </div>

                  <div className="mt-6 space-y-3 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Created
                      </span>
                      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Follow-up
                      </span>
                      <span className="text-blue-600">
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

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <Save className="w-4 h-4" /> Update
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-100 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl">
              <h4 className="font-bold mb-4">Quick Actions</h4>
              <button className="w-full bg-blue-600 py-3 rounded-xl text-xs font-bold flex justify-center gap-2">
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
