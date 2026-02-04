import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Users</h2>

      <ul className="bg-white shadow rounded">
        {users.map(u => (
          <li key={u.id} className="p-3 border-b">
            {u.name} — <span className="text-sm">{u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
