import { createSlice,createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import {DeleteOutlined} from "@ant-design/icons"
import * as GiaoHangNhanhApi from "~/redux/slices/GHNAPI/GhnApi"
const cart = JSON.parse(localStorage.getItem("cart"));
console.log({ cart });
const initialState = {
  item: {},
  cartItems: cart?.cartItems || [],
  totalPrice: cart?.totalPrice || 0,
  totalQty: cart?.totalQty || 0,
  finalPrice:cart?.finalPrice||0,
  code: cart?.code || null,
  phiShip:null,
  infoGuess:{},
  ghnAPI :{
    Provinces:{},
    Districts:{},
    Wards:{},
    FeeInfo:{},
    DistrictID:"",
    Loading:{
      Provinces:false,
      Districts:false,
      Wards:false,
  },
  }
};
export const fetchGetProvinces =createAsyncThunk(
  "GiaoHangNhanh/fetchGetProvinces",async()=>
  {
      const res = await GiaoHangNhanhApi.fetchGetProvince();
      return res;
  }
)
export const fetchGetDistrict =createAsyncThunk(
  "GiaoHangNhanh/fetchGetDistrict",async(id)=>
  {
      const res = await GiaoHangNhanhApi.fetchGetDistrict(id);
      return res;
  }
)
export const fetchGetWard =createAsyncThunk(
  "GiaoHangNhanh/fetchGetWard",async(id)=>
  {
      const res = await GiaoHangNhanhApi.fetchGetWard(id);
      return res;
  }
)
export const fetchPostCalFee = createAsyncThunk("GiaoHangNhanh/fetchPostCalFee",async(body)=>
{
  const res = await GiaoHangNhanhApi.getFeeGHN(body);
  return res;
})
const GioHangSlice = createSlice({
  initialState,
  name: "GioHang",
  reducers: {
    ViewCart(state, action) {
      var cart = localStorage.getItem("cart");
      var cartObj = JSON.parse(cart);
      if (cartObj) {
        state = cartObj
      } else {
        state.cartItems=[]
        state.item={}
        state.code=null
        state.totalPrice=0
        state.totalQty=0
      }
    },
    AddToCart(state, action) {
      const cart = localStorage.getItem("cart");
      const cartObj = JSON.parse(cart);
      const itemAdd = action.payload;
      console.log({payload:action.payload.size})
      if (cartObj) {
        const cartItem = state.cartItems.find(
          (x) =>
            x.maSanPham == action.payload.maSanPham &&
            x.sizeSelected.idSize == action.payload.size &&
            x.colorSelected == action.payload.color
        );
        if (cartItem) {
          var index = state.cartItems.indexOf(cartItem);
          state.cartItems[index].qty++;
          state.totalPrice += action.payload.giaBan;
          state.finalPrice = state.totalPrice;
          // state.totalQty+=1;
          state.cartItems[index].giaBanTong +=state.cartItems[index].giaBan;
          state.phiShip = 0;
          localStorage.setItem("cart", JSON.stringify(state));
          notification.open({
            type:"success",
            message:"Đã thêm sản phẩm vào giỏ hàng"
          })
        } else {
          itemAdd.giaBanTong = itemAdd.giaBan;
          state.cartItems.push(itemAdd);
          state.totalQty++;
          state.totalPrice += action.payload.giaBan;
          state.finalPrice = state.totalPrice;
          state.phiShip = 0;
          localStorage.setItem("cart", JSON.stringify(state));
          notification.open({
            type:"success",
            message:"Đã thêm sản phẩm vào giỏ hàng"
          })
        }
      } else {
        state.cartItems=[]
        state.item={}
        state.code=null
        state.totalPrice=0
        state.totalQty=0
        state.cartItems.push(action.payload);
        state.code = 0;
        state.totalPrice = action.payload.giaBan;
        state.totalQty += 1;
        localStorage.setItem("cart", JSON.stringify(state));
        notification.open({
          type:"success",
          message:"Đã thêm sản phẩm đầu tiên vào giỏ hàng"
        })
      }
    },
    RemoveItem:(state,action)=>
    {
      console.log(action.payload)
      const cartItem = state.cartItems.find(
        (x) =>
          x.maSanPham == action.payload.maSanPham &&
          x.sizeSelected.idSize == action.payload.size &&
          x.colorSelected == action.payload.color
      );
      if(cartItem)
      {
        const index = state.cartItems.indexOf(cartItem);
        if(index>-1)
        {
          state.totalQty-=1;
          state.totalPrice-=(cartItem.giaBan*cartItem.qty);
          state.cartItems.splice(index,1);
          if(state.cartItems.length<=0)
          {
            localStorage.removeItem("cart")
          }
          localStorage.setItem("cart", JSON.stringify(state));
          notification.open({
            type:"success",
            message:"Đã xóa sản phẩm khỏi giỏ hàng",
            icon:<DeleteOutlined/>,
          })
        }
      }
      else{
        console.log("loi trong khi xoa khoi gio hang")
      }
    },
    UpdateQtyItem:(state,action)=>
    {
      const {maSP,colorId,sizeId,qty} = action.payload;
      let items = [...state.cartItems];
      const obj =items.find(x=>x.maSanPham==maSP && x.color == colorId.colorId.trim() && x.size ==sizeId.idSize);
      const index = items.indexOf(obj)
      console.log(action.payload)
      if(index>-1)
      {
        state.cartItems[index].qty =qty; 
        state.totalPrice = ((state.cartItems[index].giaBan * qty) );
        state.finalPrice = state.totalPrice;
        localStorage.setItem("cart", JSON.stringify(state));
        notification.open({
          message:"Cập nhật thành công",
          type:"success"
        })
      }
    }
  },
  extraReducers:(builder)=>
    {
        builder.addCase(fetchGetProvinces.pending,(state)=>
        {
          state.ghnAPI.Loading.Provinces=true;
        })
        builder.addCase(fetchGetProvinces.fulfilled,(state,action)=>
        {
            state.ghnAPI.Provinces = action.payload
            state.ghnAPI.Districts ={}
            state.ghnAPI.Wards={}
            state.finalPrice = state.totalPrice;
            state.ghnAPI.Loading.Provinces=false;
        })
        builder.addCase(fetchGetDistrict.pending,(state,action)=>
        {
            state.ghnAPI.Wards ={};
            state.ghnAPI.FeeInfo={}
            state.ghnAPI.Districts ={}
            state.finalPrice = state.totalPrice;
            state.ghnAPI.Loading.Districts=true;
        })
        builder.addCase(fetchGetDistrict.fulfilled,(state,action)=>
        {
            state.ghnAPI.Districts = action.payload;
            state.ghnAPI.Wards={}
            state.ghnAPI.Loading.Districts=false;
        })
        builder.addCase(fetchGetWard.pending,(state,action)=>
        {
                state.ghnAPI.Wards={}
                state.ghnAPI.FeeInfo={}
                state.ghnAPI.Loading.Wards=true;
                state.finalPrice = state.totalPrice;
        })
        builder.addCase(fetchGetWard.fulfilled,(state,action)=>
        {
            state.ghnAPI.DistrictID = action.payload.data.DistrictID
            state.ghnAPI.Wards = action.payload;
            state.ghnAPI.Loading.Wards=false;
        })
        builder.addCase(fetchPostCalFee.fulfilled,(state,action)=>
        {
            const phiShip =action.payload.data.total;
            state.ghnAPI.FeeInfo = action.payload;
            state.phiShip =phiShip;
            let totalPrice = 0;
            let cartItems = current(state.cartItems)
             cartItems.forEach((item)=>
            {
              totalPrice +=item.giaBan * item.qty; 
            })
            console.log({cartItems})
            state.finalPrice = totalPrice+phiShip;
            localStorage.setItem("cart", JSON.stringify(state));
        })
        builder.addCase(fetchPostCalFee.rejected,(state,action)=>{
          alert("LOI")
        })
    }
});

export const { ViewCart, AddToCart ,RemoveItem,UpdateQtyItem} = GioHangSlice.actions;

export default GioHangSlice;
