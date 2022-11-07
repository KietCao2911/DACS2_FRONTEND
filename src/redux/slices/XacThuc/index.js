import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as Api from "./XacThucApi";

const initialState = {
  user: {},
  token: "",
};

export const fetchGetCurrentUser = createAsyncThunk(
  "fetchGetCurrentUser",
  async () => {
    const res = await Api.GetCurrentUser();
    return res;
  }
);

export const fetchPostSignUser = createAsyncThunk(
  "fetchPostSignUser",
  async (params) => {
    const res = await Api.UserSignIn(params);
    return res;
  }
);
export const fetchGetRefreshToken = createAsyncThunk(
  "fetchGetRefreshToken",
  async () => {
    const res = await Api.GetRefreshToken();
    return res;
  }
);
const XacThucSlice = createSlice({
  name: "XacThuc",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(fetchPostSignUser.fulfilled, (state, action) => {
      state.user = action.payload.info;
      state.token = action.payload.token;
      window.location.replace("/");
      localStorage.setItem("access__token", action.payload.token);
      localStorage.setItem("refresh__token", action.payload.refreshToken);
    });
  },
});

export default XacThucSlice;
