import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const userSlice = createSlice({
  name: "users",
  initialState: [
    {
      id: uuidv4(),
      name: "Admin",
      email: "admin@crm.com",
      role: "admin",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: null
    }
  ],
  reducers: {
    addUser: (state, action) => {
      const exists = state.find(
        u => u.email === action.payload.email
      );

      if (!exists) {
        state.push({
          id: uuidv4(),
          name: action.payload.name,
          email: action.payload.email,
          role: action.payload.role || "agent",
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: null
        });
      }
    },

    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const user = state.find(u => u.id === id);

      if (user) {
        Object.assign(user, data);
        user.updatedAt = new Date().toISOString();
      }
    },

    toggleUserStatus: (state, action) => {
      const user = state.find(u => u.id === action.payload);
      if (user) {
        user.active = !user.active;
        user.updatedAt = new Date().toISOString();
      }
    }
  }
});

export const {
  addUser,
  updateUser,
  toggleUserStatus
} = userSlice.actions;

export default userSlice.reducer;
