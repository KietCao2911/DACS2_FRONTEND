import React, { useEffect } from 'react'
import ProductInfoItem from './components/ProductInfoItem'
import "./CartPage.scss"
import MyButton from '~/components/commomComponents/Button'
import {CreditCardOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import OrderDsc from '~/components/commomComponents/OrderDsc/OrderDsc'
import { useDispatch,useSelector } from 'react-redux'
import GioHangSlice,{ViewCart} from '~/redux/slices/GioHang/GioHangSlice'
import { H1 } from 'glamorous'
import EmptyCart from './components/EmtyCart'
function CartPage() {
    const {cartItems} = useSelector(state=>state.GioHang);
    const dispatch = useDispatch();
    useEffect(()=>
    {
      dispatch(ViewCart())
    },[])
  return (
    <>
      {cartItems.length>0?<div className="CartPage PageContainer" style={{display:"flex",flexWrap:"wrap"}}>
        <div className="ProductsInfo" >
          {cartItems.map(item=>{
    return            <ProductInfoItem {...item}/>
          })}
        </div>
        <div className="CartPayment">

        <OrderDsc/>
        </div>
    </div>:<EmptyCart/>}
    </>
    
  )
}

export default CartPage