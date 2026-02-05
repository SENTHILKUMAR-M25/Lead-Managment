import { useDispatch, useSelector } from "react-redux";
import { updateLeadStatus } from "../Slice/leadSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const leads = useSelector(state => state.leads);

  const completedCount = leads.filter(
    l => l.status === "Completed"
  ).length;

  const handleUpdate = (id, status) => {
    dispatch(
      updateLeadStatus({
        id,
        status,
        updatedBy: "Admin",
        updatedAt: new Date().toLocaleString()
      })
    );
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">Reports</h2>
        <p className="text-gray-500">
          Total Completed Leads: <b>{completedCount}</b>
        </p>
      </div>

      {/* REPORT TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Updated By</th>
              <th className="p-3 text-center">Updated At</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} className="border-t">
                <td className="p-3">{lead.company}</td>

                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${lead.status === "Completed" && "bg-green-100 text-green-700"}
                      ${lead.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                      ${lead.status === "Rejected" && "bg-red-100 text-red-700"}
                    `}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  {lead.updatedBy || "-"}
                </td>

                <td className="p-3 text-center text-xs">
                  {lead.updatedAt || "-"}
                </td>

                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleUpdate(lead.id, "Completed")}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleUpdate(lead.id, "Rejected")}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

