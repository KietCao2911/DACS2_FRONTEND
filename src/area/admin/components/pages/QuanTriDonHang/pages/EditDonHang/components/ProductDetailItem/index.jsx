import { Form, Input, Select } from 'antd'
import React from 'react'
import MyButton from '~/components/commomComponents/Button'
import "./ProductDetail.scss"
import * as SanPhamAPI from '~/redux/slices/SanPham'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { useForm } from 'antd/lib/form/Form'
import { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { fetchGetQTY } from '~/redux/slices/ChiTietSoLuong/CtslAPI'
import { useParams } from 'react-router-dom'
import * as HoaDonAPI from '~/redux/slices/HoaDon/HoaDonSlice'
const ProductDetailItem = (props) => {
    const {hoadon,item} = props;
    const {product} = useSelector(state=>state.SanPham)
    const dispatch =useDispatch();
    const [form] = useForm();
    const [data,setData] = useState({})
    const [size,setSize] = useState(item.size.id);
    const [color,setColor] = useState(item.color.color.maMau);
    const [qty,setQty] = useState([]);
    const [qtySelected,setQtySelected] = useState(item.qty);
    const {id} = useParams();
    useEffect(()=>
    {
        const fetch=async()=>
        {
            const res = await dispatch(SanPhamAPI.fetchGetProduct({slug:item.slug}))
            const temp = [];
            form.setFieldsValue({
                color:item.color.color.maMau,
                size:item.size.id,
                qty:item.qty
            })           

            for(let i = 1;i<=item.qty;i++)
            {
                temp.push(i)
                
            }
            setQty(temp)
            const colorSelected = res.payload.chiTietSoLuong.filter(x=>x.idmau.trim() == item.color.color.maMau)
            setData({...product,chiTietSoLuong:colorSelected})
        }
        fetch()
    },[])
    const changeColor = (colorID)=>
    {
        const colorSelected = product.chiTietSoLuong.filter(x=>x.idmau.trim() == colorID)
        setData({...product,chiTietSoLuong:colorSelected})
        setColor(colorID)
    }
    const changeSize = async(sizeID)=>
    {
        setSize(sizeID)
        try {
            const res = await fetchGetQTY(item.maSanPham.trim(),color,sizeID)
            const temp = [];
            for(let i = 0;i<res;i++)
            {
                temp.push(i);
            }
            setQty(temp);
        } catch (error) {
            throw error
        }
        
    }
    const changeQty = (e)=>
    {
        setQtySelected(e)
    }
    const handleSave=()=>
    {
        console.log({color,size,qtySelected,maSP:item.maSanPham})
        dispatch(HoaDonAPI.fetchPutCTHD({body:{giaBan:item.giaBan,IdHoaDon:id,maSanPham:item.maSanPham.trim(),Color:color,Size:size,Qty:qtySelected}}));
    }
  return (
    <Form form={form} className='ProductDetailItem' layout='vertical'>
        <span className='label'>{item.maSanPham||"SP01"}</span>
        <CloseOutlined className='IconClose'></CloseOutlined>
        <Form.Item label="Màu sắc" name="color">
               <Select onChange={(e)=>changeColor(e)}>
                    {product.chiTietSoLuong&&product.chiTietSoLuong.map(item=>
                        <Select.Option value={item.idmau.trim()} key={v4()}>{item.colorLabel}</Select.Option>
                        )}
               </Select>
        </Form.Item>
        <Form.Item label="Kích thước" name="size">
        <Select onChange={(e)=>changeSize(e)}>
                    {data?.chiTietSoLuong&&data?.chiTietSoLuong[0].sizeDetails?.map(item=>
                    {
                        return <Select.Option value={item.idSize} key={v4()}>{item.sizeLabel}</Select.Option>
                    }
                        
                        )}
               </Select>
        </Form.Item>
        <Form.Item name="qty" label="Số lượng">
            <Select onChange={(e)=>changeQty(e)}>
                {qty.map(item=><Select.Option value={item}>{item}</Select.Option>)}
            </Select>
        </Form.Item>
        <MyButton onClick={handleSave}>Lưu</MyButton>
    </Form>
  )
}

export default ProductDetailItem