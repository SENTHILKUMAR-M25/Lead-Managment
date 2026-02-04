import { createSlice } from "@reduxjs/toolkit";

const leadSlice = createSlice({
  name: "leads",
  initialState: [],
  reducers: {
    addLead: (state, action) => {
      state.push(action.payload);
    },
    updateLeadStatus: (state, action) => {
      const { id, status } = action.payload;
      const lead = state.find(l => l.id === id);
      if (lead) lead.status = status;
    }
  }
});

export const { addLead, updateLeadStatus } = leadSlice.actions;
export default leadSlice.reducer;
