import { createSlice } from "@reduxjs/toolkit";

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userInfo: userFromLocalStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // add user to state
    setCredential: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      // expiration time for localstorage (30d)
      localStorage.setItem(
        "expirationTime",
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      );
    },
    // logout
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredential, logout } = authSlice.actions;

export default authSlice.reducer;
