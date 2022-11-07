import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '~/components/commomComponents/Button'
import "./EmptyCart.scss"
import {CaretRightOutlined} from "@ant-design/icons"
const EmptyCart = () => {
  return (
    <div className='PageContainer EmptyCart'>
      <h1 >TÚI CỦA BẠN TRỐNG</h1>
      <p>Thêm một món hàng vào giỏ hàng. Nó sẽ xuất hiện tại đây.</p>
      <Link to="/">
      <MyButton Icon={<CaretRightOutlined />}>
      MUA SẮM NGAY
        </MyButton>
       </Link>
   
    </div>
  )
}

export default EmptyCart