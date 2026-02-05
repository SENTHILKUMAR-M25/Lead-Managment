import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLead } from "../Slice/leadSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { 
  Building2, User, Phone, Mail, Calendar, 
  ArrowLeft, Save, Briefcase, FileText, Info, X 
} from "lucide-react";

const AddLead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const leadTypes = useSelector((state) => state.settings?.leadTypes || []);
  const leadStatuses = useSelector((state) => state.settings?.leadStatuses || []);
  const user = useSelector((state) => state.auth?.user);

  const [form, setForm] = useState({
    type: "", company: "", contact: "",
    phone: "", email: "", followUp: "",
    status: "", details: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company || !form.type || !form.status) return;

    dispatch(addLead({
      id: uuidv4(),
      ...form,
      createdBy: user?.id || "admin",
      createdAt: new Date().toISOString(),
    }));
    navigate("/leads");
  };

  const inputStyle = "w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm shadow-sm hover:border-gray-300";
  const labelStyle = "block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1";
  const iconStyle = "absolute left-3.5 top-[35px] text-gray-400 w-4 h-4";

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP NAVIGATION BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate(-1)}
              className="group p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">New Lead Entry</h2>
              <p className="text-gray-500 text-sm font-medium">Drafting lead for {user?.name || "Global Workspace"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Discard
            </button>
            <button
              form="lead-form"
              type="submit"
              disabled={!form.company || !form.type}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              Publish Lead
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: MAIN FORM */}
          <form id="lead-form" onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            
            {/* CARD 1: CORE IDENTITY */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 bg-blue-600 rounded-full" />
                <h3 className="text-lg font-bold text-gray-800">Identity Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="relative group">
                  <label className={labelStyle}>Organization Name <span className="text-red-400">*</span></label>
                  <Building2 className={iconStyle} />
                  <input
                    required
                    placeholder="Enter company name..."
                    className={inputStyle}
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <label className={labelStyle}>Lead Classification <span className="text-red-400">*</span></label>
                  <Briefcase className={iconStyle} />
                  <select
                    required
                    className={inputStyle}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {leadTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="relative">
                  <label className={labelStyle}>Primary Contact</label>
                  <User className={iconStyle} />
                  <input
                    placeholder="Full name of contact"
                    className={inputStyle}
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <label className={labelStyle}>Initial Status <span className="text-red-400">*</span></label>
                  <div className="absolute left-3.5 top-[38px] w-3 h-3 rounded-full bg-blue-500 animate-pulse border-2 border-white shadow-sm z-10" />
                  <select
                    required
                    className={`${inputStyle} pl-10`}
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="">Define Status</option>
                    {leadStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* CARD 2: REACH & NOTES */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 bg-emerald-500 rounded-full" />
                <h3 className="text-lg font-bold text-gray-800">Engagement Logic</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="relative">
                  <label className={labelStyle}>Phone Number</label>
                  <Phone className={iconStyle} />
                  <input
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    className={inputStyle}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <label className={labelStyle}>Email Address</label>
                  <Mail className={iconStyle} />
                  <input
                    type="email"
                    placeholder="contact@company.com"
                    className={inputStyle}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="relative md:col-span-2">
                  <label className={labelStyle}>Contextual Notes & Details</label>
                  <FileText className="absolute left-3.5 top-[35px] text-gray-400 w-4 h-4" />
                  <textarea
                    rows={4}
                    placeholder="Any specific pain points or project details..."
                    className={`${inputStyle} resize-none min-h-[120px] pt-3`}
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </form>

        

        </div>
      </div>
    </div>
  );
};

export default AddLead;