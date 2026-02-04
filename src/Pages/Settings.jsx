import { useDispatch, useSelector } from "react-redux";
import { addLeadType, addLeadStatus } from "../Slice/settingsSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const { leadTypes, leadStatuses } = useSelector(state => state.settings);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-bold">Lead Types</h3>
        {leadTypes.map(t => <p key={t}>{t}</p>)}
        <button
          onClick={() => dispatch(addLeadType("New Source"))}
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add Type
        </button>
      </div>

      <div>
        <h3 className="font-bold">Lead Status</h3>
        {leadStatuses.map(s => <p key={s}>{s}</p>)}
        <button
          onClick={() => dispatch(addLeadStatus("In Progress"))}
          className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
        >
          Add Status
        </button>
      </div>
    </div>
  );
};

export default Settings;
