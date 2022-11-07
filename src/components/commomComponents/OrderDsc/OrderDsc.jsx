import React from 'react'
import MyButton from '~/components/commomComponents/Button'
import {CreditCardOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import "./OrderDsc.scss"
import { useSelector,useDispatch } from 'react-redux'
import convertVND from '~/components/utils/ConvertVND'
const OrderDsc = (props) => {
    const {ship} = props;
    const {totalPrice,totalQty,finalPrice,ghnAPI} = useSelector(state=>state.GioHang);
    const {FeeInfo} = useSelector(state=>state.GiaoHangNhanh);
  return (
    <div className="PaymentInfo" >
    <div className="content">
    <h1>TÓM TẮT ĐƠN HÀNG</h1>
     <div className="QtyTotal">
         <p>{totalQty} Sản phẩm</p>
     <div className="price">{convertVND(totalPrice)||convertVND("500000")}
     </div>
  
     </div>
     {ship&&<div className="ShipPrice" style={{display:"flex",justifyContent:"space-between"}}>
        <p>Phí giao hàng</p>
        <p>{convertVND(ship)}</p>
     </div>}
     <div className="TotalPrice">
         <h3>TỔNG</h3>
         <div className="price"><b>{ convertVND(finalPrice)||convertVND("500000")}</b></div>
     </div>
    </div>
    <Link to="/giao-hang"> <MyButton Icon={<CreditCardOutlined />} style={{borderRadius:"unset"}}>THANH TOÁN</MyButton></Link>
   
 </div>
  )
}

export default OrderDsc