import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const leads = useSelector((state) => state.leads);

  // STATS CARDS
  const stats = useMemo(() => {
    return {
      total: leads.length,
      pending: leads.filter((l) => l.status === "Pending").length,
      completed: leads.filter((l) => l.status === "Completed").length,
      rejected: leads.filter((l) => l.status === "Rejected").length,
    };
  }, [leads]);

  // FOLLOW-UPS: next 6 upcoming
  const followUps = useMemo(() => {
    return leads
      .filter((l) => l.followUp)
      .sort((a, b) => new Date(a.followUp) - new Date(b.followUp))
      .slice(0, 6);
  }, [leads]);

  // CHART DATA: last 7 days
  const chartData = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(d);
    }

    return days.map((d) => {
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
      const total = leads.filter(
        (lead) => lead.createdAt?.split("T")[0] === dateStr
      ).length;
      const completed = leads.filter(
        (lead) =>
          lead.createdAt?.split("T")[0] === dateStr && lead.status === "Completed"
      ).length;
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      return { name: dayName, total, completed };
    });
  }, [leads]);

  // CARD COMPONENT
  const Card = ({ title, value, Icon, colorClass, bgColor }) => (
    <div className="transition-all duration-200 hover:shadow-lg bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Overview</h1>
          <p className="text-gray-500">Welcome back! Here is what's happening today.</p>
        </div>
      </div>

      {/* TOP – STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Leads" value={stats.total} Icon={Users} colorClass="text-blue-600" bgColor="bg-blue-50" />
        <Card title="Pending" value={stats.pending} Icon={Clock} colorClass="text-amber-600" bgColor="bg-amber-50" />
        <Card title="Completed" value={stats.completed} Icon={CheckCircle} colorClass="text-emerald-600" bgColor="bg-emerald-50" />
        <Card title="Rejected" value={stats.rejected} Icon={XCircle} colorClass="text-rose-600" bgColor="bg-rose-50" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEAD TREND GRAPH */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Lead Acquisition Trend
            </h3>
            <select className="text-xs border-none bg-gray-100 rounded-md p-1 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last Month</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QUICK ACTIONS / EFFICIENCY */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-widest">Efficiency</h3>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-200">
              <p className="text-xs opacity-80 uppercase font-bold mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold">
                {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
              </p>
              <div className="w-full bg-white/20 h-2 mt-4 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <Link
            to="/add-lead"
            className="w-full flex items-center justify-between py-4 px-6 
             bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 
             text-gray-700 rounded-xl font-bold transition-all shadow-sm group"
          >
            Create New Lead
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* FOLLOW UPS TABLE */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Upcoming Follow-Ups
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Follow-Up Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {followUps.length > 0 ? (
                  followUps.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 font-bold">{lead.company}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 uppercase">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400 font-medium">
                        {new Date(lead.followUp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-gray-400 italic font-medium">
                      No upcoming follow-ups scheduled
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
