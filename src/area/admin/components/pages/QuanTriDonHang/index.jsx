import React from 'react'
import "./QuanTriDonHang.scss"
import { useDispatch,useSelector } from 'react-redux'
import HoaDonSlice,*as HoaDonApi from '~/redux/slices/HoaDon/HoaDonSlice'
import { useEffect } from 'react'
import { Button, Modal, Table, Tag } from 'antd'
import ModalCustom from '~/components/commomComponents/ModalCustom'
import MyButton from '~/components/commomComponents/Button'
import convertVND from '~/components/utils/ConvertVND'
import ProductInfoItem from '~/components/pages/Cart/components/ProductInfoItem'
import {CarOutlined} from "@ant-design/icons"
const Columns =()=>
{
  const handleCancel=(id)=>
  {
    console.log({id})
    console.log("Bạn đã hủy đơn :",id.toString())
  }
  return  [
    {
      title: '#ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title:'Tên khách hàng',
      dataIndex:'diaChiNavigation',
      render:(_,record)=>
      {
       return <p>{record.diaChiNavigation.name}</p>
      }
    },  {
      title:'Số điện thoại',
      dataIndex:'diaChiNavigation',
      render:(_,record)=>
      {
      return  <p>{record.diaChiNavigation.phone}</p>
      }
    }
    ,  {
      title:'Địa chỉ',
      dataIndex:'diaChiNavigation',
      render:(_,record)=>
      {
      return  <p>{`(${record.diaChiNavigation.addressDsc}),${record.diaChiNavigation.wardName}, ${record.diaChiNavigation.districtName}, ${record.diaChiNavigation.provinceName}`}</p>
      }
    }
    ,  {
      title:'Phí giao hàng',
      dataIndex:'phiship',
      render:(_,record)=>
      {
      return  <p>{`${convertVND(record.phiship)}`}</p>
      }
    }
    ,  {
      title:'Thành tiền',
      dataIndex:'thanhtien',
      render:(_,record)=>
      {
      return  <p>{`${convertVND(record.thanhtien)}`}</p>
      }
    }    ,  {
      title:'Hành động',
      render:(_,record)=>
      {
        {console.log({record})}
      return  <>
        <Button onClick={()=>handleCancel(record.id)}>Hủy đơn</Button>
        <Button>Chỉnh sửa</Button>
      </>
      }
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record) => (
        <>
          {record.status==0? <Tag color='green' icon={<CarOutlined/>} >Đang giao</Tag>:record.status==1?<Tag color='green' icon={<CarOutlined/>} >Đã giao</Tag>:
          <Tag color='red' icon={<CarOutlined/>} >Đã hủy</Tag>
          }
         
        </>
      ),
    },
  ];
}
const QuanTriDonHang = () => {
  const dispatch = useDispatch();
  const {hoadons} = useSelector(state=>state.HoaDon)
  useEffect(()=>
  {
    dispatch(HoaDonApi.fetchGetAllOrder())
  },[])
  return (
    <div>
      <Table dataSource={hoadons} columns={Columns()}></Table>
    </div>
  )
}

export default QuanTriDonHang