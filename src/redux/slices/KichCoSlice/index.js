import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getALLSize } from "./KichCoApi";
const initialState = {
  sizes: [],
  loading: false,
  sizeChecked: null,
};

export const fetchALLSize = createAsyncThunk("fetchALLSize", async () => {
  const res = await getALLSize();
  return res;
});

const KichCoSlice = createSlice({
  name: "KichCo",
  initialState,
  reducers: {
    checkedSize: (state, action) => {
      let temp = [...state.sizes];
      state.sizeChecked = action.payload;
    },
    fillSizes: (state, action) => {
      state.sizes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchALLSize.fulfilled, (state, action) => {
      state.sizes = action.payload;
    });
  },
});
export const { checkedSize, fillSizes } = KichCoSlice.actions;
export default KichCoSlice;
