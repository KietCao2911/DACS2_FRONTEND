import React from 'react'
import { Link } from 'react-router-dom'
import "./HaveUserComponent.scss"
import {CheckCircleFilled,PlusCircleFilled} from "@ant-design/icons"
import { Col, Row } from 'antd'
const Item=()=>
{
    return(
        <div className='AddressSelectedItem'>
            <CheckCircleFilled className='iconChecked'/>
               <div className="name">Kiệt Cao</div>
               <div className="addressDsc">Minh Hải 1</div>
               <div className="ward">An Bình</div>
               <div className="addressDetail">Ninh Kieu District, Cần Thơ, 900000, VN
0325560344</div>
               <div className="action">
                <Link to="/">Edit</Link>
                <Link to="/">Remove</Link>
               </div>
        </div>  
    )
}
const AddItem=()=>
{
    return(
        <div className='AddItem'>
            <span>Thêm địa chỉ</span>
            <PlusCircleFilled className='iconPlus'/>
        </div>
    )
}
const HaveUserComponent = () => {
  return (
    <div className='HaveUserComponent'>
        <div className="WelcomeBack"></div>
        <div className="AddressSelected">
            <Row gutter={16}  >
                <Col md={{span:12}} xs={{span:24}}>
                <Item/>
                </Col>
                <Col md={{span:12}} xs={{span:24}}>
                <AddItem/>
                </Col>
            </Row>
            
            
        </div>
    </div>
  )
}

export default HaveUserComponent