import React from "react";
import { useState, useEffect } from "react";
import { Select, Input, InputNumber, Form, Button, notification, Modal } from "antd";
import { Get, Post, Delete, Put } from "~/axiosRequest/request";
import { v4 as uuidv4 } from "uuid";
import { type } from "@testing-library/user-event/dist/type";
import { useSelector,useDispatch } from "react-redux";
import {fetchALLColors} from "~/redux/slices/MauSacSlice"
import {fetchALLSize} from "~/redux/slices/KichCoSlice"
import SanPhamSlice,* as SanPhamAPI from "~/redux/slices/SanPham";
const { Option } = Select;
const {} = Input;

const Item = (props) => {
  const {colorID,value,options,maSP,_id} = props;
  const {colors,sizes} = options;
  const {useForm} = Form;
  const [form] = useForm()
  const dispatch = useDispatch();
   const handleAdd=()=>
   {
      const size = form.getFieldValue("size");
      const color= form.getFieldValue("color")
      const qty= form.getFieldValue("qty")
      dispatch(SanPhamAPI.fetchPostAddQty({body:{_idSize:size,maMau:color,Soluong:qty,maSanPham:maSP}}))
   }
   const handleDelete =(id)=>
   {
    dispatch(SanPhamAPI.fetchDeleteAddQty({id}));
   }
return <div className="ItemQty" >
    <Form  layout="inline" form={form} initialValues={{size:value?.idSize||null,color:colorID?.trim()||null,qty:value?.soLuong||0}} >
      <Form.Item name="size" label={"Kích thước"}>
      <Select  >
    <Option value={null}>Vui lòng chọn kích thước</Option>
      {sizes&&sizes.map(item=><Option value={item.value}>{item.label}</Option>)}
    </Select>
      </Form.Item>
    <Form.Item name="color" label={"Màu sắc"}>
    <Select >
    <Option value={null} >Vui lòng chọn màu sắc</Option>
    {colors&&colors.map(item=><Option value={item.maMau.trim()}>{item.tenMau}</Option>)}
    </Select>
    </Form.Item>
<Form.Item  name="qty" label={"Số lượng"}>
<InputNumber placeholder="Số lượng" min={0} />
</Form.Item>
<Form.Item>
{value?<><Button onClick={handleAdd}>Sửa</Button><Button onClick={()=>handleDelete(_id)}>Xóa</Button></>:<Button onClick={handleAdd}>Thêm</Button>}
</Form.Item>

    </Form>
  </div>
 
};

const QuanLySoLuong = ({ init = [], maSanPham }) => {
  const {colors} = useSelector(state=>state.MauSac)
  const {sizes} = useSelector(state=>state.KichCo)
  const [openModalAdd,setOpenModalAdd] = useState(false);
  const dispatch = useDispatch();
  console.log({init})
  useEffect(()=>
  {
    dispatch(fetchALLColors())
    dispatch(fetchALLSize())
  },[])
 
  return (
    <>
    <Modal width={"100%"} zIndex={1000}  visible={openModalAdd}   onCancel={()=>setOpenModalAdd(false)}>
      <Item options={{colors,sizes}} maSP={maSanPham}></Item>
    </Modal >
      <Button type="primary"onClick={()=>setOpenModalAdd(true)} >
        Thêm
      </Button>
      {init&&init.map(item=>
        item.sizeDetails.map(size=><Item colorID={item.idmau} value={size} options={{colors,sizes}} maSP={maSanPham} _id={size._id}/>))}
    </>
  );
};

export default QuanLySoLuong;
