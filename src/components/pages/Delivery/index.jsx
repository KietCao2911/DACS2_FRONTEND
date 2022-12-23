import React, { memo } from 'react'
import "./DeliveryPage.scss"
import LoginComponent from './components/LoginComponent'
import OrderDsc from '~/components/commomComponents/OrderDsc/OrderDsc'
import { useState } from 'react'
import GioHangSlice, * as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ProductInfoItem from '../Cart/components/ProductInfoItem'
import NoneUserInfo from './components/NoneUserComponent'
import HaveUserComponent from '../../commomComponents/HaveUserAddressComponent'
import MyButton from '~/components/commomComponents/Button'
import ThanhToanSlice, * as ThanhToanApi from '~/redux/slices/ThanhToanSlice'
import { notification, Radio } from 'antd'
import ModalCustom from '~/components/commomComponents/ModalCustom'
import CustomSpin from '~/components/CustomSpin'
import { CarOutlined } from '@ant-design/icons'
import OrderForm from '~/components/Forms/Order'
const DeliveryPage = () => {
  const dispatch = useDispatch();
  const { ghnAPI, cartItems, totalPrice, totalQty, phiShip, finalPrice } = useSelector(state => state.GioHang);
  const { user } = useSelector(state => state.XacThuc)
  const { DiaChi, loading } = useSelector(state => state.ThanhToan)
  const { Provinces, Districts, Wards, FeeInfo, DistrictID, Loading } = ghnAPI;
  const [error,setWrong] = useState(false);
  const [GuessInfo, setGuessInfo] = useState({
    Name: "",
    Phone: "",
    ProvinceName: "",
    DistrictName: "",
    WardName: "",
    ProvinceID: null,
    DistrictID: null,
    WardId: null,
    AddressDsc: "",
    Email: "",
    PaymendMethod: "COD"
  })
  console.log({error})
  useEffect(() => {
    if (user.info && user.info.length > 0) {
      const address = user.info.find(item => item.id == user.addressDefault)
      if (address) {
        dispatch(GiaoHangNhanhApi.fetchPostCalFee({
          "from_district_id": 1572,
          "service_type_id": 2,
          "to_district_id": address.districtID,
          "to_ward_code": address.wardID,
          "height": 50,
          "length": 20,
          "weight": 200,
          "width": 20,
          "insurance_value": totalPrice,
          "coupon": null
        }))
      }
    }

  }, [user])
  const handleOrder = (paymentMethod) => {
    if (Object.keys(user).length !== 0) {
      if (user.info && user.info.length > 0) {
        const address = user.info.find(item => item.id == user.addressDefault)
        const params = {
          Id:address.id,
          Name: address.name,
          Phone: address.phone,
          ProvinceName: address.provinceName,
          DistrictName: address.districtName,
          WardName: address.wardName,
          ProvinceID: address.provinceID,
          DistrictID: address.districtID,
          WardId: address.wardID,
          AddressDsc: address.addressDsc,
          Email: address.email,
          PaymendMethod: paymentMethod
        }
        if(!error)
        {
          dispatch(ThanhToanApi.fetchPostWithGuess({
            DiaChi: params, hoaDonDetails: cartItems,
            HoaDon: { Thanhtien: parseInt(finalPrice*1.1) , totalQty: totalQty, PhuongThucThanhToan: paymentMethod, Phiship: phiShip, idTaiKhoan: user.userName.trim(),idDiaChi:address.id }
          }))
         
        }
        else
        {
          notification.open({
            message:"Vui lòng nhập đầy đủ thông tin",
            type:"error"
          })
        }
      
      }
    }
    else {
      if(!error)
      {
        dispatch(ThanhToanApi.fetchPostWithGuess({
          DiaChi: GuessInfo, hoaDonDetails: cartItems,
          HoaDon: { Thanhtien: finalPrice, totalQty: totalQty, PhuongThucThanhToan: paymentMethod, Phiship: phiShip }
        }))
       
      }
      else
      {
        notification.open({
          message:"Vui lòng nhập đầy đủ thông tin",
          type:"error"
        })
      }
  
    }

  }
  const data = () => {
    const gg = cartItems.map(item => {
      console.log({item})
      return {
        giaban: item.giaBan
        , qty: item.qty,
        size: {sizeLabel:item.sizeSelected.sizeLabel}
        , img: item.hinhAnhDisplay[0].hinhAnhInfo[0].url
        , masanpham: item.maSanPham
        , tensanpham: item.tenSanPham
        , color: {
          colorlabel: item.sizeDisplay[0].colorLabel,
          colorId: item.sizeDisplay[0].idmau,
        },
      }
    })
    return gg;
  }
  return (
    <div className='DeliveryPage PageContainer'>
      <div className="InfoDelivery" >
        {user?.info ? <HaveUserComponent /> :<OrderForm/>}
        
        {/* <NoneUserInfo></NoneUserInfo> */}

      </div>
      <div className="InfoOrder">
        <div className="Login">
          {/* <LoginComponent></LoginComponent> */}
        </div>
        <div className="OrderDsc">
          <OrderDsc ship={FeeInfo?.data?.total} disableBtnPayment={true}></OrderDsc>
        </div>
        <div className="OrderDetails">
          <h1>CHI TIẾT ĐƠN HÀNG</h1>
          {cartItems && data().map(item => {
            return <ProductInfoItem style={{ border: "unset" }} {...item} />
          })}
          {/* <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem> */}
        </div>
          {Object.keys(user).length>0&& <><MyButton onClick={()=>handleOrder("VNPAY")}>
          Thanh toán với VNPAY
        </MyButton>
        <MyButton onClick={()=>handleOrder("COD")}>Thanh toán khi nhận hàng</MyButton></>}
      </div>
    </div>
  )
}

export default DeliveryPage