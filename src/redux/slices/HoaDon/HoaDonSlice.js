import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as HoaDonApi from "./HoaDonApi"

const initialState={
    hoadons:[]
}

export const fetchGetAllOrder =createAsyncThunk("HoaDon/fetchGetAllOrder",async()=>
{
    const res= await HoaDonApi.fetchGetAllHoaDon()
    return res;
})

const HoaDonSlice =createSlice({
    initialState,
    name:"HoaDon",
    extraReducers:builder=>
    {
        builder.addCase(fetchGetAllOrder.fulfilled,(state,action)=>
        {
            state.hoadons = action.payload
        })
    }
})

// export const {} = HoaDonSlice.actions

export default HoaDonSlice