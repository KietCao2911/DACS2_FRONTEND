import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as ThanhToanApi from "./ThanhToanApi"
const initialState={
    TaiKhoan:{},
    DiaChi:{
        Name:"",
        Phone:"",
        ProvinceName:"",
        DistrictName:"",
        WardName:"",
        ProvinceID:null,
        DistrictID:null,
        WardId:null,
        AddressDsc:"",
    },
    hoaDonDetails:[],
    totalPrice:0,
    totalQty:0,
    phiShip:0,
    giamGia:0,
}
export const fetchPostWithGuess =createAsyncThunk("ThanhToanSlice/fetchPostWithGuess",async(body)=>
{
    const res = await ThanhToanApi.fetchPostWithGuess(body);
    return res;
})
const ThanhToanSlice =createSlice({
    initialState,
    name:"ThanhToan",
    reducers:{
        AddressInfo:(state,action)=>
        {
            console.log({payload:action.payload})
            state.DiaChi = action.payload;
        },
        ChangeValueField:(state,action)=>
        {
            state[action.payload.key] = action.payload.value;
        }
    },
    extraReducers:(builder)=>
    {
        builder.addCase(fetchPostWithGuess.fulfilled,(state)=>
        {
            notification.open({
                message:"Đặt hàng thành công.",
                type:"success",
            })
            
            // window.location.replace("/")
        })
        builder.addCase(fetchPostWithGuess.rejected,()=>
        {
            notification.open({
                message:"Đặt hàng thất bại.",
                type:"error",
            })
        })
    }
})
export  const {AddressInfo,ChangeValueField} = ThanhToanSlice.actions
export default ThanhToanSlice