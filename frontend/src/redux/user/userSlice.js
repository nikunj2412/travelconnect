import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: null,
  error: null,
  loading: false,
  refreshToken: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loggedUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    storeRefreshToken: (state,action) => {
      state.refreshToken = action.payload;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loggedUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePassStart: (state) => {
      state.loading = true;
    },
    updatePassSuccess: (state) => {
      state.loading = false;
    },
    updatePassFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOutStart: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state) => {
      state.loggedUser = null;
      state.loading = false;
      state.error = null;
    },
    logOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserAccountStart: (state) => {
      state.loading = true;
    },
    deleteUserAccountSuccess: (state) => {
      state.loggedUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  storeRefreshToken,
  loginFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updatePassStart,
  updatePassSuccess,
  updatePassFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
  deleteUserAccountStart,
  deleteUserAccountSuccess,
  deleteUserAccountFailure,
} = userSlice.actions;

export default userSlice.reducer;
