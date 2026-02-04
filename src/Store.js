import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import userReducer from "./Slice/userSlice";
import leadReducer from "./Slice/leadSlice";
import settingsReducer from "./Slice/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    leads: leadReducer,
    settings: settingsReducer
  }
});
