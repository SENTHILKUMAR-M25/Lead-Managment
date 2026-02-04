import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLead } from "../Slice/leadSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AddLead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leadTypes, leadStatuses } = useSelector(
    (state) => state.settings
  );
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    type: "",
    company: "",
    contact: "",
    phone: "",
    email: "",
    followUp: "",
    status: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addLead({
        id: uuidv4(),
        ...form,
        createdBy: user.id
      })
    );

    navigate("/leads");
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add Lead</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select className="w-full border p-2" onChange={(e)=>setForm({...form,type:e.target.value})}>
          <option>Select Lead Type</option>
          {leadTypes.map(t => <option key={t}>{t}</option>)}
        </select>

        <input className="w-full border p-2" placeholder="Company Name"
          onChange={(e)=>setForm({...form,company:e.target.value})} />

        <input className="w-full border p-2" placeholder="Contact Person"
          onChange={(e)=>setForm({...form,contact:e.target.value})} />

        <input className="w-full border p-2" placeholder="Phone"
          onChange={(e)=>setForm({...form,phone:e.target.value})} />

        <input className="w-full border p-2" placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input type="date" className="w-full border p-2"
          onChange={(e)=>setForm({...form,followUp:e.target.value})} />

        <select className="w-full border p-2"
          onChange={(e)=>setForm({...form,status:e.target.value})}>
          <option>Select Status</option>
          {leadStatuses.map(s => <option key={s}>{s}</option>)}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Lead
        </button>
      </form>
    </div>
  );
};

export default AddLead;
