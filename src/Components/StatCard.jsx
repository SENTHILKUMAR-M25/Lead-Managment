const StatCard = ({ title, value, Icon }) => {
  return (
    <div className="bg-white p-4 rounded shadow flex items-center gap-4">
      <div className="p-2 bg-blue-100 rounded">
        <Icon className="text-blue-600" size={20} />
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
