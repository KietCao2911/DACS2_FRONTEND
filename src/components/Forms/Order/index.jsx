import { useFormik } from 'formik'
import React,{useEffect, useRef} from 'react'
import * as  Yup from "yup"
import InputText from '~/components/commomComponents/InputText'
import { SelectInput } from '~/components/commomComponents/SelectInput'
import  *as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import { useDispatch,useSelector } from 'react-redux'
import MyButton from '~/components/commomComponents/Button'
import { Link } from 'react-router-dom'
import { CarOutlined } from '@ant-design/icons'
import ThanhToanSlice,{AddressInfo} from '~/redux/slices/ThanhToanSlice'
import "./OrderForm.scss"
import { Alert, notification } from 'antd'
import { v4 } from 'uuid'
import  * as ThanhToanApi from '~/redux/slices/ThanhToanSlice'
import CustomSpin from '~/components/CustomSpin'

const OrderForm = (props) => {
    const { user } = useSelector(state => state.XacThuc)
    const {setGuessInfo} = props;
    const { ghnAPI, cartItems, totalPrice, totalQty, phiShip, finalPrice } = useSelector(state => state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const { DiaChi, loading } = useSelector(state => state.ThanhToan)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const formRef = useRef();
  const dispatch = useDispatch();
        useEffect(()=>
        {
            dispatch(GiaoHangNhanhApi.fetchGetProvinces())
        },[])
    const orderForm = useFormik({
        initialValues:{
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
            PaymendMethod: "COD",
          },
          validationSchema:Yup.object({
            
            Name:Yup.string().required("Phải nhập trường này"),
            Phone:Yup.string().required("Phải nhập trường này").matches(phoneRegExp, 'Định dạng số điện thoại không đúng').min(10,"Số điện thoại phải hơn 10 chữ số").max(10,"Số điện thoại không quá 10 chữ số"),
            Email:Yup.string().required("Phải nhập trường này").matches(emailRegex,'Định dạng email không đúng'),
            ProvinceID:Yup.number().nullable(true).required("Phải chọn trường này"),
            DistrictID:Yup.number().nullable(true).required("Phải chọn trường này"),
            WardId:Yup.number().nullable(true).required("Phải chọn trường này"),
            PaymendMethod:Yup.string().required("Phải chọn trường này"),
            AddressDsc:Yup.string().required("Phải nhập trường này"),
          }),
          onSubmit:(values)=>
          {
            console.log({values});
          },
    })
    const handleChangeProvince =(e)=>
    {
        orderForm.setFieldValue("ProvinceName",e.target.options[e.target.selectedIndex].text)
        orderForm.setFieldValue("ProvinceID",e.target.value)
        dispatch(GiaoHangNhanhApi.fetchGetDistrict(e.target.value))
    }
    const handleChangeDistrict=(e)=>
    {
        orderForm.setFieldValue("DistrictName",e.target.options[e.target.selectedIndex].text)
        orderForm.setFieldValue("DistrictID",e.target.value)
        dispatch(GiaoHangNhanhApi.fetchGetWard(e.target.value))
    }
    const CalFee =(e)=>
    {
      if(e.target.value == null)
      {
       
        return ;
      }
      else
      {
        orderForm.setFieldValue("WardName",e.target.options[e.target.selectedIndex].text)
        orderForm.setFieldValue("WardId",e.target.value)
        dispatch(GiaoHangNhanhApi.fetchPostCalFee({
          "from_district_id":1572,
          "service_type_id":2,
          "to_district_id":Wards.data[0].DistrictID,
          "to_ward_code":e.target.value,
          "height":50,
          "length":20,
          "weight":200,
          "width":20,
          "insurance_value":totalPrice,
          "coupon": null
        }))
        
      }
        
      
      
    }
    const handleOrder=()=>
    {
     
    }
    const handleChangePaymentMethod=(e)=>
    {
        
        orderForm.setFieldValue("PaymendMethod",e.target.value)
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
              PaymendMethod: e.target.value
            }
            if( Object.keys(orderForm.errors).length>0&&!phiShip)
            {
              notification.open({
                type:"error",
                message:"Xem lại thông tin vừa nhập"
              })
            }
            else{
              dispatch(ThanhToanApi.fetchPostWithGuess({
                DiaChi: params, hoaDonDetails: cartItems,
                HoaDon: { Thanhtien: parseInt(finalPrice*1.1) , totalQty: totalQty, PhuongThucThanhToan: e.target.value, Phiship: phiShip, idTaiKhoan: user.userName.trim(),idDiaChi:address.id }
              }))
            }
          
          }
        }
        else {
          if((Object.keys(orderForm.errors).length<=0)&&phiShip)
          {
            dispatch(ThanhToanApi.fetchPostWithGuess({
              DiaChi: orderForm.getFieldProps().value, hoaDonDetails: cartItems,
              HoaDon: { Thanhtien: finalPrice, totalQty: totalQty, PhuongThucThanhToan: e.target.value, Phiship: phiShip }
            }))
          }else{
           notification.open({
              type:"error",
              message:"Xem lại thông tin vừa nhập"
            })
          }
         
        }
    }
  return (
    <form onSubmit={orderForm.handleSubmit} className="OrderForm" ref={formRef}>
        <InputText name={"Name"} label="Tên" value={orderForm.values.Name} onChange={orderForm.handleChange}/>
        {orderForm.touched.Name&&orderForm.errors.Name&&<span className='error'>{orderForm.errors.Name}</span>}
        <InputText name={"Phone"} label="Số điện thoại" value={orderForm.values.Phone} onChange={orderForm.handleChange}/>
        {orderForm.errors.Phone&&<span className='error'>{orderForm.errors.Phone}</span>}
        <InputText name={"Email"} label="Email" value={orderForm.values.Email} onChange={orderForm.handleChange}/>
        {orderForm.errors.Email&&<span className='error'>{orderForm.errors.Email}</span>}
        <InputText name={"AddressDsc"} label="Chi tiết địa chỉ" value={orderForm.values.AddressDsc} onChange={orderForm.handleChange}/>
        {orderForm.errors.AddressDsc&&<span className='error'>{orderForm.errors.AddressDsc}</span>}
        <SelectInput onChange={handleChangeProvince} name={"ProvinceID"}>
        <option value={""}>Vui lòng chọn Tỉnh/Thành phố</option>
          {Provinces.data&&Provinces.data.map(item=>{
            return <option  key ={item.ProvinceID}value={item.ProvinceID}>{item.ProvinceName}</option>
          })}
        </SelectInput>
        {orderForm.errors.ProvinceID&&<span className='error'>{orderForm.errors.ProvinceID}</span>}

        <SelectInput onChange={handleChangeDistrict} loading={Loading.Districts} name="DistrictID" defaultLabel="Quận/Huyện" >
        <option value={""}>Vui lòng chọn Quận/Huyện</option>
          {Districts.data&& Districts?.data?.map(item=>{
            return <option key ={item.DistrictID} value={item.DistrictID}>{item.DistrictName}</option>
          })}
        </SelectInput>
        {orderForm.errors.DistrictID&&<span className='error'>{orderForm.errors.DistrictID}</span>}
        <SelectInput onChange={(e)=>CalFee(e)}  loading={Loading.Wards}  defaultLabel="Xã/Phường" name="WardId">
        <option value={""}>Vui lòng chọn Xã/Phường</option>
        {Wards.data&& Wards?.data?.map(item=>{
            return <option value={item.WardCode}>{item.WardName}</option>
          })}
        </SelectInput>
        {orderForm.errors.WardId&&<span className='error'>{orderForm.errors.WardId}</span>}
        <div className="PaymentMethod">
          <div key={v4()} className="PaymentMethodRadio" >
          <input  id='COD' type={"radio"} name='PaymendMethod' value={"COD"} onChange={(e)=>handleChangePaymentMethod(e)}/>
          <label htmlFor="COD"><p>Thanh toán khi nhận hàng </p><CarOutlined/> </label>
          </div>
          {orderForm.errors.PaymendMethod&&<span className='error'>{orderForm.errors.PaymendMethod}</span>}

          <div className="PaymentMethodRadio" key={v4()} >
          <input id='VNPAY'  type={"radio"} name='PaymendMethod' value={"VNPAY"} onChange={(e)=>handleChangePaymentMethod(e)}/>
            <label htmlFor="VNPAY">Thanh toán qua VNPAY</label>
          </div>
          {orderForm.errors.PaymendMethod&&<span className='error'>{orderForm.errors.PaymendMethod}</span>}        
        </div>
        {loading && <CustomSpin></CustomSpin>}

    </form>
  )
}

export default OrderForm