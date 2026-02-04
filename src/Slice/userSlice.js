import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const userSlice = createSlice({
  name: "users",
  initialState: [
    {
      id: uuidv4(),
      name: "Admin",
      role: "admin",
      active: true
    }
  ],
  reducers: {
    addUser: (state, action) => {
      state.push({
        id: uuidv4(),
        ...action.payload,
        active: true
      });
    },
    toggleUserStatus: (state, action) => {
      const user = state.find(u => u.id === action.payload);
      if (user) user.active = !user.active;
    }
  }
});

export const { addUser, toggleUserStatus } = userSlice.actions;
export default userSlice.reducer;
