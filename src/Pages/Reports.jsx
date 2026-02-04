import { useSelector } from "react-redux";

const Reports = () => {
  const leads = useSelector(state => state.leads);
  const completed = leads.filter(l => l.status === "Completed").length;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Reports</h2>
      <p className="mt-4">Total Completed Leads: <b>{completed}</b></p>
    </div>
  );
};

export default Reports;
