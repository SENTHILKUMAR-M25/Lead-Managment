

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLeadType, addLeadStatus } from "../Slice/settingsSlice";
import { Plus, Tag, Activity, Trash2, Settings2 } from "lucide-react";
import { removeLeadType, removeLeadStatus } from "../Slice/settingsSlice";
const Settings = () => {
  const dispatch = useDispatch();
  const { leadTypes, leadStatuses } = useSelector((state) => state.settings);

  const [newType, setNewType] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleAddType = (e) => {
    e.preventDefault(); // Prevent form reload
    if (newType.trim() !== "") {
      dispatch(addLeadType(newType.trim()));
      setNewType("");
    }
  };
const handleDeleteStatus = (typeName) => {
  if (window.confirm(`Delete "${typeName}"?`)) {
    dispatch(removeLeadType(typeName));
  }
}
  const handleAddStatus = (e) => {
    e.preventDefault();
    if (newStatus.trim() !== "") {
      dispatch(addLeadStatus(newStatus.trim()));
      setNewStatus("");
    }
  };

  // Sub-component for a clean section card
  const SettingsCard = ({ title, description, icon: Icon, children }) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 min-h-screen bg-slate-50/30">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <Settings2 className="w-8 h-8 text-slate-400" />
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Configuration</h1>
          <p className="text-sm text-slate-500">Manage your CRM dropdown values and workflow stages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEAD TYPES SECTION */}
        <SettingsCard 
          title="Lead Categories" 
          description="Classify leads by source or business unit."
          icon={Tag}
        >
          <div className="space-y-3 mb-6">
            {leadTypes.map((t) => (
              <div key={t} className="flex justify-between items-center px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl group transition-all hover:border-blue-200">
                <span className="text-sm font-medium text-slate-700">{t}</span>
                <button className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddType} className="flex gap-2">
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="e.g. Real Estate"
              className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors shadow-md shadow-blue-100"
            >
              <Plus size={20} />
            </button>
          </form>
        </SettingsCard>

        {/* LEAD STATUS SECTION */}
        <SettingsCard 
          title="Workflow Status" 
          description="Define the stages of your sales pipeline."
          icon={Activity}
        >
          <div className="space-y-3 mb-6">
            {leadStatuses.map((s) => (
              <div key={s} className="flex justify-between items-center px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl group transition-all hover:border-emerald-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-medium text-slate-700">{s}</span>
                </div>
                <button className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddStatus} className="flex gap-2">
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="e.g. In Negotiation"
              className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
            />
            <button
            onClick={() => handleDeleteStatus(newStatus)}
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-colors shadow-md shadow-emerald-100"
            >
              <Plus size={20} />
            </button>
          </form>
        </SettingsCard>

      </div>

      {/* FOOTER INFO */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-center">
        <div className="text-blue-600">
          <Activity size={20} />
        </div>
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Pro-tip:</strong> Changes made here will instantly reflect in the "Add Lead" and "Edit Lead" dropdown menus across the entire application.
        </p>
      </div>
    </div>
  );
};

export default Settings;