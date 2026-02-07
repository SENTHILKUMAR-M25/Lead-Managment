// import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

// const userSlice = createSlice({
//   name: "users",
//   initialState: [
//     {
//       id: uuidv4(),
//       name: "Admin",
//       email: "admin@crm.com",
//       role: "admin",
//       active: true,
//       createdAt: new Date().toISOString(),
//       updatedAt: null
//     }
//   ],
//   reducers: {
//     addUser: (state, action) => {
//       const exists = state.find(
//         u => u.email === action.payload.email
//       );

//       if (!exists) {
//         state.push({
//           id: uuidv4(),
//           name: action.payload.name,
//           email: action.payload.email,
//           role: action.payload.role || "agent",
//           active: true,
//           createdAt: new Date().toISOString(),
//           updatedAt: null
//         });
//       }
//     },

//     updateUser: (state, action) => {
//       const { id, data } = action.payload;
//       const user = state.find(u => u.id === id);

//       if (user) {
//         Object.assign(user, data);
//         user.updatedAt = new Date().toISOString();
//       }
//     },

//     toggleUserStatus: (state, action) => {
//       const user = state.find(u => u.id === action.payload);
//       if (user) {
//         user.active = !user.active;
//         user.updatedAt = new Date().toISOString();
//       }
//     }
//   }
// });

// export const {
//   addUser,
//   updateUser,
//   toggleUserStatus
// } = userSlice.actions;

// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {

    // ✅ SET USERS FROM BACKEND
    setUsers: (state, action) => {
      return action.payload;
    },

    // ✅ ADD USER (AFTER BACKEND CONFIRMATION)
    addUser: (state, action) => {
      state.push(action.payload);
    },

    // ✅ UPDATE USER (ROLE / NAME / STATUS)
    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const index = state.findIndex(u => u.id === id);

      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },

    // ✅ TOGGLE ACTIVE STATUS
    toggleUserStatus: (state, action) => {
      const user = state.find(u => u.id === action.payload);
      if (user) {
        user.active = !user.active;
      }
    },

    // ✅ REMOVE USER
    deleteUser: (state, action) => {
      return state.filter(u => u.id !== action.payload);
    }
  }
});

export const {
  setUsers,
  addUser,
  updateUser,
  toggleUserStatus,
  deleteUser
} = userSlice.actions;

export default userSlice.reducer;
