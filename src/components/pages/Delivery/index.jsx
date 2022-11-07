import React from 'react'
import "./DeliveryPage.scss"
import LoginComponent from './components/LoginComponent'
import OrderDsc from '~/components/commomComponents/OrderDsc/OrderDsc'
import { useState } from 'react'
import GioHangSlice,* as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import ProductInfoItem from '../Cart/components/ProductInfoItem'
import NoneUserInfo from './components/NoneUserComponent'
import HaveUserComponent from './components/HaveUserComponent'
const DeliveryPage = () => {
  const dispatch = useDispatch();
  const {ghnAPI} = useSelector(state=>state.GioHang);
  const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
  console.log({ghnAPI})

  return (
    <div className='DeliveryPage PageContainer'>
        <div className="InfoDelivery" >
          {/* <NoneUserInfo></NoneUserInfo> */}
          <HaveUserComponent/>
        </div>
        <div className="InfoOrder">
          <div className="Login">

          {/* <LoginComponent></LoginComponent> */}
          </div>
          <div className="OrderDsc">
          <OrderDsc ship={FeeInfo?.data?.total}></OrderDsc>
        </div>
        <div className="OrderDetails">
          <h1>CHI TIẾT ĐƠN HÀNG</h1>
          {/* <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem> */}
        </div>
        </div>
    </div>
  )
}

export default DeliveryPage