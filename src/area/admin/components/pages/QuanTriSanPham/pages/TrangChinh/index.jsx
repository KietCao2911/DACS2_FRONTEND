import { Link } from 'react-router-dom'
import React from 'react'
import { Input, Select, Space, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import * as SanPhamAPI from '~/redux/slices/SanPham'
import { useEffect } from 'react'
import MyButton from '~/components/commomComponents/Button'
import { FileAddFilled } from '@ant-design/icons'

const expandedRowRender=(props)=>
{
    const {data} = props;
    const columns=[
        {
            title:"Màu",
            render:(record)=>
            {
                console.log({record});
                return <p>{record.color}</p>
            },
         
        },
       { title:"Số lượng",
       render:(_,record)=>
       {
          return <p>{record.soLuong}</p>
       },}
    ]
    const res = data.map(detail=>
        {
           const temp = detail.sizeDetails.reduce((prev,next)=>{
           return prev = {...next,color:detail.idmau}
           },{})
              console.log({temp});
         return temp
        })
        console.log({res});
  return <Table pagination={{hideOnSinglePage:true}} columns={columns} dataSource={res}></Table>
}
const columns=()=>
{
    return [
        {
            title:"Tên sản phẩm",
            render:(_,record)=>
            {
               return <p>{record.tenSanPham}</p>
            },
        }
    ]
}
const TrangChinh = () => {
    const dispatch = useDispatch();
    const {products} = useSelector(state=>state.SanPham)
    useEffect(()=>
    {
        dispatch(SanPhamAPI.fetchGetAllProducts({id:"undefined"}))
       
        
    },[])
  return (
    <div>
        <div className="filesActions">
            <div className="printDocs"></div>
            <div className="create">
                    <Link to="tao-moi"><MyButton style={{width:"30rem"}} icon={<FileAddFilled/>}>Tạo sản phẩm mới</MyButton></Link>
            </div>
        </div>
        <div className="productsTable">
            <div className="filterActions">
            
            </div>
            <div className="table">
                <Table dataSource={products||[]} expandable={{expandedRowRender:(record)=>expandedRowRender({data:record.chiTietSoLuong})}} columns={columns()}></Table>
            </div>
        </div>
    </div>
  )
}

export default TrangChinh