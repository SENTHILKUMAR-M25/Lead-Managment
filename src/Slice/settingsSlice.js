import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    leadTypes: ["FB", "Website", "Insta", "Other"],
    leadStatuses: ["New", "Pending", "Follow-up", "Completed", "Rejected"]
  },
  reducers: {
    addLeadType: (state, action) => {
      state.leadTypes.push(action.payload);
    },
    addLeadStatus: (state, action) => {
      state.leadStatuses.push(action.payload);
    }
  }
});

export const { addLeadType, addLeadStatus } = settingsSlice.actions;
export default settingsSlice.reducer;
