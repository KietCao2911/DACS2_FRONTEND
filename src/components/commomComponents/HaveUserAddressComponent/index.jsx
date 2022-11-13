import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./HaveUserComponent.scss"
import {CheckCircleFilled,PlusCircleFilled} from "@ant-design/icons"
import { Col, Row } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import ModalCustom from '../ModalCustom'
import { InputText } from '../InputText'
import { SelectInput } from '../SelectInput'
import GioHangSlice,* as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import { useState } from 'react'
import MyButton from '../Button'
const Item=(props)=>
{
    const {data} = props;
    console.log({data})
    return(
        <div className='AddressSelecteItem' {...props}>
            {/* <CheckCircleFilled className='iconChecked'/> */}
               <div className="name">{data.name}</div>
               <div className="addressDsc">{data.addressDsc}</div>
               <div className="ward">{data.wardName}</div>
               <div className="addressDetail">{`${data.districtName}, ${data.provinceName}, ${data.phone}`}</div>
               <div className="action">
                <Link to="/">Edit</Link>
                <Link to="/">Remove</Link>
               </div>
        </div>  
    )
}
const AddItem=(props)=>
{
    return(
        <div className='AddItem' {...props}>
            <span>Thêm địa chỉ</span>
            <PlusCircleFilled className='iconPlus'/>
        </div>
    )
}
const HaveUserAddressComponent = () => {
    const {user} = useSelector(state=>state.XacThuc)
    const {ghnAPI,totalPrice} = useSelector(state=>state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const [openModal,setOpenModal] = useState(false);
    const dispatch = useDispatch()
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
  return (
    <div className='HaveUserComponent'>
        <div className="WelcomeBack"></div>
        <div className="AddressSelected">
            <Row gutter={16}  >
            {user.info.diaChis&&user.info.diaChis.map(item=>
                
                 <Col md={{span:8}} xs={{span:24}}>
                
                <Item data={item}/>  
             
              
          </Col>
                )}
                
                <Col md={{span:8}} xs={{span:24}}>
                <AddItem onClick={()=>setOpenModal(true)}/>
                </Col>
            </Row>
            
            
        </div>
        <ModalCustom visiable={openModal} onCancel={()=>setOpenModal(false)}>
            <strong>Thêm địa chỉ mới</strong>
                  <InputText label="Tên"/>
                  <InputText label="Chi tiết địa chỉ"/>
                  <div className="SelectAddressGroup">
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
        <SelectInput  loading={Loading.Wards}  defaultLabel="Xã/Phường" name="ward">
        <option value={""}>Vui lòng chọn Xã/Phường</option>
        {Wards.data&& Wards?.data?.map(item=>{
            return <option value={item.WardCode}>{item.WardName}</option>
          })}
        </SelectInput>
                  </div>
        <InputText number={true} label="Số điện thoại"/>
        <div className="Actions">
            <MyButton>LƯU</MyButton>
            <MyButton>Hủy</MyButton>
        </div>
        </ModalCustom>
      
    </div>
  )
}

export default HaveUserAddressComponent