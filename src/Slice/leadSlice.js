import { createSlice } from "@reduxjs/toolkit";

const leadSlice = createSlice({
  name: "leads",
  initialState: [],
  reducers: {
    addLead: (state, action) => {
      state.push(action.payload);
    },

    updateLead: (state, action) => {
      const index = state.findIndex(l => l.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    updateLeadStatus: (state, action) => {
      const lead = state.find(l => l.id === action.payload.id);
      if (lead) {
        lead.status = action.payload.status;
        lead.updatedBy = action.payload.updatedBy;
        lead.updatedAt = action.payload.updatedAt;
      }
    },

    /* ✅ FOLLOW-UP UPDATE */
    updateLeadProgress: (state, action) => {
      const { id, followUp, details } = action.payload;
      const lead = state.find(l => l.id === id);
      if (lead) {
        lead.followUp = followUp;
        lead.details = details;
        lead.updatedAt = new Date().toISOString();
      }
    }
  }
});

export const {
  addLead,
  updateLeadStatus,
  updateLead,
  updateLeadProgress
} = leadSlice.actions;

export default leadSlice.reducer;
