const statusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const LeadTable = ({ leads }) => {
  return (
    <table className="w-full border rounded overflow-hidden">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2 text-left">Company</th>
          <th className="p-2">Type</th>
          <th className="p-2">Status</th>
          <th className="p-2">Follow Up</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id} className="border-t">
            <td className="p-2">{lead.company}</td>
            <td className="p-2 text-center">{lead.type}</td>
            <td className="p-2 text-center">
              <span
                className={`px-2 py-1 rounded text-sm ${statusColor(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </td>
            <td className="p-2 text-center">{lead.followUp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadTable;
