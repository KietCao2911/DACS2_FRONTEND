import React, { useEffect } from 'react'
import ProductInfoItem from './components/ProductInfoItem'
import "./CartPage.scss"
import MyButton from '~/components/commomComponents/Button'
import {CreditCardOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import OrderDsc from '~/components/commomComponents/OrderDsc/OrderDsc'
import { useDispatch,useSelector } from 'react-redux'
import GioHangSlice,{ViewCart,RemoveItem} from '~/redux/slices/GioHang/GioHangSlice'
import { H1 } from 'glamorous'
import EmptyCart from './components/EmtyCart'
function CartPage() {
    const props= useSelector(state=>state.GioHang);
    const {cartItems,sizeSelected,colorSelected,maSanPham} = props;
    const dispatch = useDispatch();
    console.log({gg:props})
    const handleRemoveItemCart=(props)=>
    {
      const {} = props;
      console.log({props})
       dispatch(RemoveItem({size:props.size,color:props.color,maSanPham:props.maSanPham}))
    }
    const data= ()=>
  {
    const gg =  cartItems.map(item=>
      {
        return {
          giaBan:item.giaBan
          ,qty:item.qty,
          size:item.sizeSelected
          ,img:item.hinhAnhDisplay[0].hinhAnhInfo[0].url
          ,masanpham:item.maSanPham
          ,tensanpham:item.tenSanPham
          ,color:{
            colorlabel:item.sizeDisplay[0].colorLabel,
            colorId : item.sizeDisplay[0].idmau,
          },
          removeItemFnc:()=>handleRemoveItemCart({size:item.size,color:item.colorSelected,maSanPham:item.maSanPham}),
        }
      })
      return gg;
  }
    useEffect(()=>
    {
      dispatch(ViewCart())
    },[])
    
  return (
    <>
      {cartItems.length>0?<div className="CartPage PageContainer" style={{display:"flex",flexWrap:"wrap"}}>
        <div className="ProductsInfo" >
          {cartItems&&data().map(item=>{
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