import React, { useState } from "react";
import "./ProductDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import {
  Col,
  Row,
  Image,
  Collapse,
  Space,
  Rate,
  Button,
  Breadcrumb,
  notification,
  Tooltip,
  Avatar,
  message
} from "antd";
import { Pagination } from "swiper";
import SizeSelect from "./components/SizeCompoent";
import { useSelector, useDispatch } from "react-redux";
import { ArrowRightOutlined, CarOutlined,RollbackOutlined} from "@ant-design/icons";
import * as Api from "~/redux/slices/SanPham";
import * as ApiSize from "~/redux/slices/KichCoSlice";
import connection from "~/components/utils/SignalR";
import GioHangSlice, {
  ViewCart,
  AddToCart,
} from "~/redux/slices/GioHang/GioHangSlice";
import MyCollapse from "~/components/commomComponents/Collapse";
import KichCoSlice, {
  checkedSize,
  fetchALLSize,
  fillSizes,
} from "~/redux/slices/KichCoSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "~/const";
import ReactHtmlParser from "react-html-parser";
import ColorComponent from "./components/ColorComponent";
import { v4 as uuidv4 } from "uuid";
import { fetchGetQTY } from "~/redux/slices/ChiTietSoLuong/CtslAPI";
import * as MessageAPI from "~/redux/slices/Messages/MessagesSlice";
import { number } from "yup";
const { Panel } = Collapse;
const actions = [
  <Tooltip><Rate value={5}/></Tooltip>

];
class IMessage {
  constructor() { 
    this.content=String;
    this.createdAT= String;
    this.creatorID= number;
    this.id=number;
    this.messageNavigation={};
    this.messages= [];
    this.parentMessageID= number;
    this.userNavigation= {}
   }
}
const nestComments = (root, xs) => 
xs.filter (({parentMessageID}) => parentMessageID == root)
   .map(({id, parentMessageID, ...rest}) => {
    //  ({id, ...rest, messages: nestComments (id, xs)})
    // return ( <Comment
    //   author={<a>{rest.userNavigation.tenHienThi||"{NULL}"}</a>}
    //   avatar={<Avatar src={`${BASE_URL}wwwroot/res/users/${rest.userNavigation.tenTaiKhoan.trim()}/avatars/${rest.userNavigation.avatar}`}        alt="Han Solo"></Avatar>}
    //   content={
    //     <p>
    //      {rest.content}
    //     </p>
    //   }
    // >
    //  {nestComments(id,xs)} 
    // </Comment>)
  return <h1>sd</h1>
   })
const TrangChiTietSanPham = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.SanPham);
  const {  Messages} = useSelector((state) => state.Message);
  const { slug } = useParams();
  
  var data =[...Messages]||[]
  console.log({data});
 
  useEffect(()=>
  {
    const JoinToGroup =async()=>
    {
      if(connection.state=="Connected")
      {
    
        await connection.invoke("AddToGroup", {MaSP:slug.split("_")[1],UserID:"0325560455"});
      }else{
        alert("NOT CONNECTED")
      }
    }
    JoinToGroup();
    return async()=>
    {
      return await connection.invoke("RemoveFromGroup", {MaSP:slug.split("_")[1],UserID:"0325560455"});
    }
  },[])
  connection.on("ReceiveMessage",(message)=>
  {
    const res = JSON.parse(message);
    console.log(res);
  })
  connection.on("Send",(message)=>
  {
    // alert(message)
  })
  useEffect(() => {
    dispatch(MessageAPI.fetchGetMessages())
    dispatch(Api.fetchGetProduct({ slug }));
  }, [slug]);
  const handleAddToCart =async () => {
    if(product.sizeSelected)
    {
    let CartItem = { ...product };
    CartItem.qty = 1;
    CartItem.color = product.colorSelected;
    CartItem.size = product.sizeSelected.idSize;
    try {
        const res = await fetchGetQTY(product.maSanPham, product.colorSelected,product.sizeSelected.idSize)
        if(res<=0)
        {
          notification.open({
            message:"Sản phẩm vừa hết hàng",
            type:"error"
      })
        }
        else
        {
          dispatch(AddToCart(CartItem));         
        }
    } catch (error) {
      throw error
    }
    
    }
    else{
      notification.open({
        type:"error",
        message:"Vui lòng chọn kích thước"
      })
    }
  };
  return (
    <div className="ProductDetail">
      <Row>
        <Col className="ProductDsc" xs={{ span: 24 }} xl={{ span: 16 }}>
          <Row>
            <Col className="ProductDscPC" xs={{ span: 0 }} xl={{ span: 24 }} >
              <div className="ImgContainer">
                {product.hinhAnhDisplay &&
                  product.hinhAnhDisplay[0]?.hinhAnhInfo?.map((item) => {
                    return (
                      <Image
                        key={uuidv4()}
                        src={item.url}
                        preview
                      />
                    );
                  })}
              </div>
            </Col>
            <Col
              xl={{ span: 0 }}
              xs={{ span: 24 }}
              className="ProductDscMobile"
            >
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className="mySwiper"
              >
                {product.hinhAnhDisplay?.length>0&&product.hinhAnhDisplay[0].hinhAnhInfo.map((item) => {
                  return (
                    <SwiperSlide>
                      <Image
                      style={{objectFit:"contain"}}
                        src={item.url}
                        preview
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
          </Row>
          <div className="PageContainer">
          <MyCollapse label="Mô tả" >
          {ReactHtmlParser(product?.mota)}
          </MyCollapse>

          <div className="comments">
            <strong>BÌNH LUẬN</strong>
            {nestComments(null,data)}
          </div>
          </div>
         
        </Col>
        {/* <Col xl={{ span: 0 }}></Col> */}

        <Col span={24} xl={{ span: 8 }} >
          <Space className="ProductInfo" direction="vertical" >
            <Space className="InfoHeader">
              <div className="InforHeader_ClsName">
                {product?.boSuuTap?.value || "Chưa thuộc bộ sưu tập nào"}
              </div>
              <div className="InforHeader_Star">
                {" "}
                <Rate disabled value={5} />{" "}
              </div>
            </Space>
            <h1 className="InfoTitle">
              {product?.tenSanPham || "GIÀY SUPERSTAR TAEGEUKDANG"}
            </h1>
            <h2 className="InfoPrice">
              {product?.giaBanDisplay || "2.800.000₫"}{" "}
            </h2>
            <span>
              <h3>Kích cỡ</h3>
              {
                 product?.sizeDisplay?.length > 0 ? <SizeSelect
                 items={
                   product?.sizeDisplay?.length > 0 ? product.sizeDisplay[0] : []
                 }
               />:<strong style={{color:"	#df4759"}}>{`Sản phẩm đã hết hàng :(`}</strong>
              }
             
            </span>
            <span>
              <h3>Màu sắc</h3>
              <ColorComponent items={product?.color}></ColorComponent>
            </span>

            <button className="AddToCart" onClick={handleAddToCart}>
              <strong>THÊM VÀO GIỎ HÀNG</strong>
              <ArrowRightOutlined />
            </button>
            <a href=""><CarOutlined /> QUAY LẠI DỄ DÀNG</a>
            <a href=""><RollbackOutlined /> Không đúng kích cỡ hoặc màu sắc? Vui lòng truy cập trang Trả lại hàng & Hoàn tiền của chúng tôi để biết chi tiết</a>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default TrangChiTietSanPham;
