import { useSelector } from "react-redux";

const Leads = () => {
  const leads = useSelector((state) => state.leads);
  const user = useSelector((state) => state.auth.user);

  const visibleLeads =
    user.role === "admin"
      ? leads
      : leads.filter(l => l.createdBy === user.id);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leads</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Company</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Follow Up</th>
          </tr>
        </thead>
        <tbody>
          {visibleLeads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="p-2">{lead.company}</td>
              <td className="p-2">{lead.type}</td>
              <td className="p-2">{lead.status}</td>
              <td className="p-2">{lead.followUp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leads;
