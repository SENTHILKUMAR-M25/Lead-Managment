import { useSelector } from "react-redux";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

const Dashboard = () => {
  const leads = useSelector((state) => state.leads);

  const total = leads.length;
  const pending = leads.filter(l => l.status === "Pending").length;
  const completed = leads.filter(l => l.status === "Completed").length;
  const rejected = leads.filter(l => l.status === "Rejected").length;

  const Card = ({ title, value, Icon }) => (
    <div className="bg-white p-4 rounded shadow flex items-center gap-4">
      <Icon className="text-blue-600" />
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card title="Total Leads" value={total} Icon={Users} />
      <Card title="Pending" value={pending} Icon={Clock} />
      <Card title="Completed" value={completed} Icon={CheckCircle} />
      <Card title="Rejected" value={rejected} Icon={XCircle} />
    </div>
  );
};

export default Dashboard;
