import { Link, useParams } from 'react-router-dom'
import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import ProductInfoItem from '~/components/pages/Cart/components/ProductInfoItem'
import ProductDetailItem from './components/ProductDetailItem'
import *as HoaDonAPI from '~/redux/slices/HoaDon/HoaDonSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useForm } from 'antd/lib/form/Form'
const Edit = () => {
    const dispatch =useDispatch();
    const {hoadon} = useSelector(state=>state.HoaDon)
    const {product} = useSelector(state=>state.SanPham)
    const {id} = useParams()
    const [form] = useForm();
    useEffect(()=>
    {
        const fetch=async()=>
        {

            const res= await dispatch(HoaDonAPI.fetchGetOrderDetails({id}))
            const value = res.payload.hoadon;
            form.setFieldsValue({
                ID:value?.id,
                thanhTien:value?.thanhtien,
                phiship:value?.phiship
            })
        }
        fetch()
    },[hoadon.thanhtien])
  return (
   <div>
     <Form form={form} layout='inline'>
        <Form.Item label={"ID hóa đơn"} name="ID" >
            <Input placeholder='Id' readOnly/>
        </Form.Item>
        <Form.Item label={"Thành tiền"} name="thanhTien">
            <Input placeholder='Thành tiền'/>
        </Form.Item>
        <Form.Item label={"Phí giao hàng"} name="phiship">
            <Input placeholder='Phí giao hàng'/>
        </Form.Item>
        <Form.Item label="Khách hàng">
            <Link to={"/admin/trang-quan-tri-khach-hang/chinh-sua/"+hoadon?.hoadon?.diaChiNavigation?.id||''}>{hoadon?.hoadon?.diaChiNavigation?.name||''}</Link>
        </Form.Item>
    </Form>
        <Row gutter={10}>
            {hoadon.details&&hoadon.details.map(item=>  <Col >
        <ProductDetailItem item={item} hoadon={hoadon}/>
            </Col>)}
          
        </Row>
   </div>
  )
}

export default Edit