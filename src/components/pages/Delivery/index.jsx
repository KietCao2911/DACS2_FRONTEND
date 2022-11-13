import React, { memo } from 'react'
import "./DeliveryPage.scss"
import LoginComponent from './components/LoginComponent'
import OrderDsc from '~/components/commomComponents/OrderDsc/OrderDsc'
import { useState } from 'react'
import GioHangSlice,* as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import ProductInfoItem from '../Cart/components/ProductInfoItem'
import NoneUserInfo from './components/NoneUserComponent'
import HaveUserComponent from '../../commomComponents/HaveUserAddressComponent'
import MyButton from '~/components/commomComponents/Button'
import ThanhToanSlice,* as ThanhToanApi from '~/redux/slices/ThanhToanSlice'
const DeliveryPage = () => {
  const dispatch = useDispatch();
  const {ghnAPI,cartItems,totalPrice,totalQty,phiShip,finalPrice} = useSelector(state=>state.GioHang);
  const {user} = useSelector(state=>state.XacThuc)
  const {DiaChi} = useSelector(state=>state.ThanhToan)
  const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
  const [GuessInfo,setGuessInfo] = useState({
    Name:"",
    Phone:"",
    ProvinceName:"",
    DistrictName:"",
    WardName:"",
    ProvinceID:null,
    DistrictID:null,
    WardId:null,
    AddressDsc:"",
})
  const handleOrder=()=>
  {
    dispatch(ThanhToanApi.fetchPostWithGuess({DiaChi:GuessInfo,hoaDonDetails:cartItems,totalPrice:finalPrice,phiShip,totalQty}))
    if(user)
    {
      return ;
    }
    else{
        // dispatch(ThanhToanApi.fetchPostWithGuess(GuessInfo))
    }
  }
  return (
    <div className='DeliveryPage PageContainer'>
        <div className="InfoDelivery" >
          {user?.info?.diaChis?<HaveUserComponent/>:<NoneUserInfo GuessInfo={GuessInfo} setGuessInfo={setGuessInfo}></NoneUserInfo>}
          {/* <NoneUserInfo></NoneUserInfo> */}
        </div>
        <div className="InfoOrder">
          <div className="Login">
      {!user&&<LoginComponent></LoginComponent>}
          {/* <LoginComponent></LoginComponent> */}
          </div>
          <div className="OrderDsc">
          <OrderDsc ship={FeeInfo?.data?.total} disableBtnPayment={true}></OrderDsc>
        </div>
        <div className="OrderDetails">
          <h1>CHI TIẾT ĐƠN HÀNG</h1>
          {cartItems.map(item=>{
    return            <ProductInfoItem style={{border:"unset"}} {...item}/>
          })}
          {/* <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem> */}
        </div>
        <MyButton onClick={handleOrder} style={{borderRadius:"unset"}}>XÁC NHẬN ĐẶT HÀNG</MyButton>
        </div>
       
    </div>
  )
}

export default  DeliveryPage