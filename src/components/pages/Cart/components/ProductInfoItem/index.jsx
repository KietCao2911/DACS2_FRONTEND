import React from 'react'
import "./ProductInfoItem.scss"
import {CloseOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GioHangSlice,{RemoveItem} from '~/redux/slices/GioHang/GioHangSlice'
import *as APIKichCo from '~/redux/slices/KichCoSlice'
import convertVND from '~/components/utils/ConvertVND'
import { useEffect,useState } from 'react'
import { SelectInput } from '~/components/commomComponents/SelectInput'
import { Form, Select } from 'antd'
import { v4 } from 'uuid'
import { fetchGetQTY } from "~/redux/slices/ChiTietSoLuong/CtslAPI";
import { UpdateQtyItem } from '~/redux/slices/GioHang/GioHangSlice'
const MyOptions =({number,qty,onChange,data})=>
{
    const {color,masanpham,size} = data;
    const [numberTemp,setNumberTemp] = useState(number||0);
    
    let count = numberTemp;
    let arr = []
    const dispatch = useDispatch();
    for(var i = 1 ;i<=count;i++)
    {
        arr.push(<Select.Option key={v4()} value={i}>{i}</Select.Option>)     
    }
    const handleClickGetQty =async() =>
    {
        const res= await fetchGetQTY(masanpham,color.colorId,size.idSize);
        setNumberTemp(res);
    }
    const handleChangeQty = (e)=>
    {
        dispatch(UpdateQtyItem({maSP:masanpham,colorId:color,sizeId:size,qty:e}))
    }
    return (
        <Select defaultValue={qty} onChange={(e)=>handleChangeQty(e)} onClick={handleClickGetQty}>
            <Select.Option value={null}>Chọn số lượng</Select.Option>
            {arr}
        </Select>
    );
}
function ProductInfoItem(props) {
    
    const {giaBan,qty,size,img,masanpham,tensanpham,color,removeItemFnc} = props;
    const {Qty} = useSelector(state=>state.KichCo)
const dispatch =useDispatch();
    useEffect(()=>
    {
        dispatch(APIKichCo.fetchGetQty({masanpham,maMau:color.colorId,idSize:size.idSize}))
    },[])
    const handleRemoveItem =()=>
    {
       if(removeItemFnc)removeItemFnc();
       
    }
    const handleUpdateQty=(e)=>
    {
       console.log(e)
    }
    console.log({props})
  return (
    <Link to={"#"} className='PrductInfoItem' {...props}>
    <CloseOutlined  style={{display:`${!removeItemFnc&&"none"}`}} className="closeIcon" onClick={handleRemoveItem}/>
    <div className="Container">
        <div className="img">
            <img src={img||"https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
        </div>
        <div className="content">
            <div className="name">
            <h4>{tensanpham||"CAMPUS 80S SOUTH PARK TOWELIE"}</h4>
            </div>
            <p>{convertVND(giaBan)||"---"}</p>
            <Form initialValues={{qty:qty}}>
                <Form.Item label="Kích cỡ">
                    <span>{size.sizeLabel}</span>
                </Form.Item>
                <Form.Item label="Màu sắc">
                <span>{color.colorlabel}</span>
                </Form.Item>
                <Form.Item label="Số lượng" name={"qty"}>
                    <MyOptions number={9} qty={qty} onChange={handleUpdateQty} data={props} ></MyOptions>
                </Form.Item>
            </Form>
        </div>
    </div>
    </Link>
  )
}

export default ProductInfoItem