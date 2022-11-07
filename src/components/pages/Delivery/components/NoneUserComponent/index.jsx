import React from 'react'
import { InputText } from '~/components/commomComponents/InputText'
import { SelectInput } from '~/components/commomComponents/SelectInput'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import GioHangSlice,* as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import "./NoneUserComponent.scss"
const NoneUserInfo = () => {
    const {ghnAPI,totalPrice} = useSelector(state=>state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const dispatch = useDispatch();
    useEffect(()=>
    {
      dispatch(GiaoHangNhanhApi.fetchGetProvinces())
    },[])
    const getDistricts =(e)=>
    {
        console.log({event:e.target.value})
        if(e.target.value == null)
        {
          return;
        }
        else
        {
          dispatch(GiaoHangNhanhApi.fetchGetDistrict(e.target.value))
        }
    }
    const CalFee =(e)=>
    {
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
  return (
   <div class="NoneUserInfo">
        <h1>THÔNG TIN GIAO HÀNG</h1>
        <div className="InfoGuessName" >
        <InputText label="Họ"></InputText>
        <InputText label="Tên"></InputText>
        </div>
        <div  style={{margin:"0 -1rem"}}>
        <InputText label="Chi tiết địa chỉ (Số nhà, tên đường,...)"></InputText>
        </div>
        <div  className="InfoAddress" >
        <SelectInput  loading={Loading.Provinces} name="province" defaultLabel="Tỉnh/Thành phố" onChange={e=>getDistricts(e)}>
        <option value={""}>Vui lòng chọn Tỉnh/Thành phố</option>
          {Provinces.data&&Provinces.data.map(item=>{
            return <option  key ={item.ProvinceID}value={item.ProvinceID}>{item.ProvinceName}</option>
          })}
        </SelectInput>
        <SelectInput loading={Loading.Districts} name="district" defaultLabel="Quận/Huyện" onChange={e=>dispatch(GiaoHangNhanhApi.fetchGetWard(e.target.value))}>
        <option value={""}>Vui lòng chọn Quận/Huyện</option>
          {Districts.data&& Districts?.data?.map(item=>{
            return <option key ={item.DistrictId} value={item.DistrictID}>{item.DistrictName}</option>
          })}
        </SelectInput>
        <SelectInput  loading={Loading.Wards} onChange={(e)=>CalFee(e)} defaultLabel="Xã/Phường" name="ward">
        <option value={""}>Vui lòng chọn Xã/Phường</option>
        {Wards.data&& Wards?.data?.map(item=>{
            return <option value={item.WardCode}>{item.WardName}</option>
          })}
        </SelectInput>
        {/* <InputText></InputText> */}
        </div>
   </div>
  )
}

export default NoneUserInfo