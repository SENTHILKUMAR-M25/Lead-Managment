
import { createSlice } from "@reduxjs/toolkit";

const leadSlice = createSlice({
  name: "leads",
  initialState: [],
  reducers: {

    /* ADD LEAD */
    addLead: (state, action) => {
      state.push({
        ...action.payload,
        updatedBy: action.payload.updatedBy || null,
        updatedAt: action.payload.updatedAt || null,
        history: [] // initialize empty history array
      });
    },

    /* FULL UPDATE */
    updateLead: (state, action) => {
      const lead = state.find(l => l.id === action.payload.id);
      if (lead) {
        Object.assign(lead, {
          ...action.payload,
          updatedAt: new Date().toISOString(),
          updatedBy: action.payload.updatedBy ?? lead.updatedBy
        });

        // Add to history
        lead.history.push({
          action: "Lead details updated",
          date: new Date().toLocaleString(),
          updatedBy: action.payload.updatedBy ?? lead.updatedBy,
          data: action.payload
        });
      }
    },

    /* STATUS UPDATE */
    updateLeadStatus: (state, action) => {
      const { id, status, updatedBy } = action.payload;
      const lead = state.find(l => l.id === id);
      if (lead) {
        lead.status = status;
        lead.updatedBy = updatedBy ?? lead.updatedBy;
        lead.updatedAt = new Date().toISOString();

        // Add to history
        lead.history.push({
          action: `Status changed to "${status}"`,
          date: new Date().toLocaleString(),
          updatedBy: updatedBy ?? lead.updatedBy,
          data: { status }
        });
      }
    },

    /* FOLLOW-UP / NOTES */
    updateLeadProgress: (state, action) => {
      const { id, followUp, details, updatedBy } = action.payload;
      const lead = state.find(l => l.id === id);
      if (lead) {
        lead.followUp = followUp;
        lead.details = details;
        lead.updatedAt = new Date().toISOString();
        if (updatedBy) lead.updatedBy = updatedBy;

        // Add to history
        lead.history.push({
          action: "Follow-up / Notes updated",
          date: new Date().toLocaleString(),
          updatedBy: updatedBy ?? lead.updatedBy,
          data: { followUp, details }
        });
      }
    }
  }
});

export const {
  addLead,
  updateLead,
  updateLeadStatus,
  updateLeadProgress
} = leadSlice.actions;

export default leadSlice.reducer;
