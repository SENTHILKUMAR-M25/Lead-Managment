import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Users, Clock, CheckCircle, XCircle, Calendar, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const leads = useSelector((state) => state.leads);

  // Memoize calculations for performance
  const stats = useMemo(() => {
    return {
      total: leads.length,
      pending: leads.filter((l) => l.status === "Pending").length,
      completed: leads.filter((l) => l.status === "Completed").length,
      rejected: leads.filter((l) => l.status === "Rejected").length,
    };
  }, [leads]);

  const followUps = useMemo(() => {
    return leads
      .filter((l) => l.followUp)
      .sort((a, b) => new Date(a.followUp) - new Date(b.followUp))
      .slice(0, 6);
  }, [leads]);

  const Card = ({ title, value, Icon, colorClass, bgColor }) => (
    <div className={`transition-all duration-200 hover:shadow-lg bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4`}>
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8 w-full">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sales Overview</h1>
        <p className="text-gray-500">Welcome back! Here is what's happening today.</p>
      </div>
      
      {/* TOP – STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Leads" value={stats.total} Icon={Users} colorClass="text-blue-600" bgColor="bg-blue-50" />
        <Card title="Pending" value={stats.pending} Icon={Clock} colorClass="text-amber-600" bgColor="bg-amber-50" />
        <Card title="Completed" value={stats.completed} Icon={CheckCircle} colorClass="text-emerald-600" bgColor="bg-emerald-50" />
        <Card title="Rejected" value={stats.rejected} Icon={XCircle} colorClass="text-rose-600" bgColor="bg-rose-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FOLLOW UPS TABLE (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Upcoming Follow-Ups
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Follow-Up Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {followUps.length > 0 ? (
                  followUps.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-700">{lead.company}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500 font-mono">
                        {new Date(lead.followUp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-gray-400 italic">
                      No upcoming follow-ups scheduled
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDE BAR / QUICK ACTIONS (Balances the UI) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Quick Insights</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Conversion Rate</p>
              <p className="text-xl font-bold text-gray-800">
                {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
              </p>
              <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full" 
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                />
              </div>
            </div>
            {/* Add more insights or a "New Lead" button here */}
            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
              Create New Lead <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;