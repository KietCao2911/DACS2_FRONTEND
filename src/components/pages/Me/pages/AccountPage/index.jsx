import React,{useState} from 'react'
import { Outlet,Link,Routes,Route,useParams } from 'react-router-dom'
import MyButton from '~/components/commomComponents/Button'
import "./AccountPage.scss"
import {RightOutlined} from "@ant-design/icons"
import InfoPage from './pages/InfoPage/InfoPage'
import HaveUserAddressComponent from '~/components/commomComponents/HaveUserAddressComponent'
export const Page1 = () => {
  return (
    <div>Page1</div>
  )
}


const AccountPage = () => {
  const itemNav=[{
    href:"",
    label:"Thông tin cá nhân",
  },{
    href:"dia-chi",
    label:"Sổ địa chỉ",
  },{
    href:"dang-xuat",
    label:"Đăng xuất",
  }]
  const params = useParams();
  const key = params['*']
  return (
    <div className='AccountPage'>
      <div className="AccountNav">
        {itemNav.map((item,index)=>
        {
          return  <Link   to={item.href}><MyButton className={`MyButton ${key==item.href?"active":""}`} Icon={<RightOutlined/>}>{item.label}</MyButton></Link>

        })}
      </div>
      <div className="ContentAccountPage">
        <Outlet/>
      </div>
      <Routes>
      <Route path="" element={<InfoPage/>}></Route>
      <Route path="dia-chi" element={<HaveUserAddressComponent/>}></Route>
    </Routes>
    </div>
  )
}

export default AccountPage