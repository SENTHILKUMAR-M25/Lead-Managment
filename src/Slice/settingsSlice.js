import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    leadTypes: ["FB", "Website", "Insta", "Other"],
    leadStatuses: ["New", "Pending", "Follow-up", "Completed", "Rejected"]
  },
  reducers: {
    // ADD REDUCERS
    addLeadType: (state, action) => {
      if (!state.leadTypes.includes(action.payload)) {
        state.leadTypes.push(action.payload);
      }
    },
    addLeadStatus: (state, action) => {
      if (!state.leadStatuses.includes(action.payload)) {
        state.leadStatuses.push(action.payload);
      }
    },

    // DELETE REDUCERS
    removeLeadType: (state, action) => {
      // action.payload is the string name of the type
      state.leadTypes = state.leadTypes.filter(type => type !== action.payload);
    },
    removeLeadStatus: (state, action) => {
      // action.payload is the string name of the status
      state.leadStatuses = state.leadStatuses.filter(status => status !== action.payload);
    }
  }
});

export const { 
  addLeadType, 
  addLeadStatus, 
  removeLeadType, 
  removeLeadStatus 
} = settingsSlice.actions;

export default settingsSlice.reducer;