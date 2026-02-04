import { useDispatch } from "react-redux";
import { logout } from "../Slice/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-bold text-lg text-blue-600">
        Lead Management System
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
