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
import { useState } from 'react'
import { v4 } from 'uuid'
import { Link } from 'react-router-dom'
const Columns =(props)=>
{
  const {setOpenModal} = props
  const dispatch = useDispatch();
  const handleGetProductDetails=(id)=>
  {
    dispatch(HoaDonApi.fetchGetOrderDetails({id}))
    setOpenModal(true);
  }
  const handleCancelOrder=(id)=>
  {
    dispatch(HoaDonApi.fetchCancelOrder({id:id}))
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
       return <p>{record?.diaChiNavigation?.name}</p>
      }
    },  {
      title:'Số điện thoại',
      dataIndex:'diaChiNavigation',
      render:(_,record)=>
      {
      return  <p>{record?.diaChiNavigation?.phone}</p>
      }
    }
    ,  {
      title:'Địa chỉ',
      dataIndex:'diaChiNavigation',
      render:(_,record)=>
      {
      return  <p>{`(${record?.diaChiNavigation?.addressDsc}),${record?.diaChiNavigation?.wardName}, ${record?.diaChiNavigation?.districtName}, ${record?.diaChiNavigation?.provinceName}`}</p>
      }
    }
    ,  {
      title:'Phí giao hàng',
      dataIndex:'phiship',
      render:(_,record)=>
      {
      return  <p>{`${convertVND(record?.phiship)}`}</p>
      }
    }
    ,  {
      title:'Thành tiền',
      dataIndex:'thanhtien',
      render:(_,record)=>
      {
      return  <p>{`${convertVND(record?.thanhtien)}`}</p>
      }
    }    , {
      title:'Xem sản phẩm được đặt',
      render:(_,record)=>
      {
        {console.log({record})}
      return  <>
        <Button onClick={()=>handleGetProductDetails(record?.id)}>Xem</Button>
      </>
      }
    },  {
      title:'Hành động',
      render:(_,record)=>
      {
      return  <>
        <Button onClick={()=>handleCancelOrder(record?.id)}>Hủy đơn</Button>
        <Link to={"chinh-sua/"+record.id}><Button>Chỉnh sửa</Button></Link>
        
      </>
      }
    }, {
      title: 'Tráng thái thanh toán',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record) => (
        <>
          {record?.status==0? <Tag color='yellow'  >Chưa thanh toán</Tag>:record?.status==1?<Tag color='green'  >Đã thanh toán</Tag>:
          <Tag color='red'  >Đã hủy</Tag>
          }
         
        </>
      ),
    },
    {
      title: 'Tráng thái giao hàng',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, record) => (
        <>
          {record?.deliveryStatus==0? <Tag color='yellow'  >Đang chuẩn bị hàng</Tag>:record?.status==1?<Tag color='green'  >Đang giao hàng</Tag>:
          <Tag color='red'  >Đơn hủy</Tag>
          }
         
        </>
      ),
    },
  ];
}
const QuanTriDonHang = () => {
  const dispatch = useDispatch();
  const {hoadons,hoadon} = useSelector(state=>state.HoaDon)
  const [openModal,setOpenModal] = useState(false);
  console.log({hoadon})
  const data= ()=>
  {
    const gg =  hoadon.details&&hoadon.details.map(item=>
      {
        return {
          giaBan:item?.giaBan
          ,qty:item?.qty,
          size:{sizeLabel:item?.size?.sizeLabel}
          ,img:item?.color?.url
          ,maSanPham:item?.maSanPham
          ,tenSanPham:item?.tenSanPham
          ,color:{
            colorlabel:item?.color?.color?.sizeLabel,
            colorId : item?.color?.color?.maMau,
          },
        }
      })
      return gg;
  }
  console.log({hoadon})
  useEffect(()=>
  {
    dispatch(HoaDonApi.fetchGetAllOrder())
  },[])
  return (
    <div>
      <Table rowKey={(recort)=>v4()} scroll={{ x: 400 }} columns={Columns({setOpenModal})} dataSource={hoadons} ></Table>
      <Modal okButtonProps={{style:{display:"none"}}} cancelButtonProps={{style:{display:"none"}}} visible={openModal} onCancel={()=>setOpenModal(false)}>
          {hoadon.details&&data().map(item=>
            {
              return <ProductInfoItem  key={v4()} {...item}/>
            })}
      </Modal>
    </div>
  )
}

export default QuanTriDonHang