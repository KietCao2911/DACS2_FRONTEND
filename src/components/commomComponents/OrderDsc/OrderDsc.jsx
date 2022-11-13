import React from 'react'
import MyButton from '~/components/commomComponents/Button'
import {CreditCardOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import "./OrderDsc.scss"
import { useSelector,useDispatch } from 'react-redux'
import convertVND from '~/components/utils/ConvertVND'
import { useEffect } from 'react'
import GioHangSlice,{ViewCart} from '~/redux/slices/GioHang/GioHangSlice'
const OrderDsc = (props) => {
    const {disableBtnPayment} = props;
    const {totalPrice,totalQty,finalPrice,ghnAPI,phiShip} = useSelector(state=>state.GioHang);
    const {FeeInfo} = useSelector(state=>state.GiaoHangNhanh);
    const dispatch = useDispatch()
    useEffect(()=>
    {
      dispatch(ViewCart())
    },[])
  return (
    <div className="PaymentInfo" >
    <div className="content">
    <h1>TÓM TẮT ĐƠN HÀNG</h1>
     <div className="QtyTotal">
         <p>{totalQty} Sản phẩm</p>
     <div className="price">{convertVND(totalPrice)||convertVND("500000")}
     </div>
  
     </div>
     {phiShip!=0&&<div className="ShipPrice" style={{display:"flex",justifyContent:"space-between"}}>
        <p>Phí giao hàng</p>
        <p>{convertVND(phiShip)}</p>
     </div>}
     <div className="TotalPrice">
         <h3>TỔNG</h3>
         <div className="price"><b>{ convertVND(finalPrice)||convertVND("0")}</b></div>
     </div>
    </div>
    {!disableBtnPayment&&  <Link to="/giao-hang">  <MyButton Icon={<CreditCardOutlined />} style={{borderRadius:"unset"}}>THANH TOÁN</MyButton></Link> }
  
   
 </div>
  )
}

export default OrderDsc