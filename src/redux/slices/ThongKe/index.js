import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as ThongKeAPI from "./ThongKeAPI"
const  initialState={
labels:[],
values:[],
}
export const fetchGetDoanhThu = createAsyncThunk("fetchGetDoanhThu",async(params)=>
{
    const {id,body} = params;
    const res=  await ThongKeAPI.fetchDoanhSo(id,body);
    return res;
})
const ThongKeSlice =createSlice({
    name:"ThongKeSlice",
    initialState,
    extraReducers:(builder)=>
    {
        builder.addCase(fetchGetDoanhThu.fulfilled,(state,action)=>
        {
            console.log(action.payload)
                state.labels = [...action.payload.labels];
                state.values = [...action.payload.values];
        })
    }
})

export default ThongKeSlice