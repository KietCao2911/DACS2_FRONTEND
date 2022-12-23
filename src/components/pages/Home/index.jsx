import React,{useEffect} from "react";
import BSTSlider from "./components/BSTSlider";
import NewRelease from "./components/NewReleaseSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Space } from "antd";
import HotProducts from "./components/HotProducts";
import "./Home.scss"
import * as SanPhamAPI from "~/redux/slices/SanPham";
import { useDispatch,useSelector } from "react-redux";
import CategoryHome from "./components/Category";
import { Link } from "react-router-dom";
import MyButton from "~/components/commomComponents/Button";
import * as Api from "~/redux/slices/BoSuuTap";

document.title = "Trang chính";

const Home = () => {
  const dispatch =useDispatch();
  const {user} = useSelector(state=>state.XacThuc);
  const { boSuuTaps } = useSelector((state) => state.BoSuuTap);
  const { productsLatest } = useSelector((state) => state.SanPham);
  const {productsHot} = useSelector(state=>state.SanPham)
  const profile = user?.info?.find(x=>user.addressDefault ==x.id )||null
  console.log("HOME ");
  useEffect(()=>
  {   
      dispatch(SanPhamAPI.GetHotProducts());
      dispatch(SanPhamAPI.fetchGetLatestProducts());
      dispatch(Api.fetchAllBST({}));
  },[])
  return (
    <div className="HomeDefaultLayout">
      <BSTSlider />
      <div className="PageContainer">
        
      <div className="headingPage">VỪA CẬP NHẬT</div>
      <NewRelease />
      <div className="headingPage">SẢN PHẨM NỔI BẬT</div>
      <HotProducts/>
      <div className="Membership">
      <div className="headingPage">MEMBERSHIP</div>
      <div className="banner">
        <div className="mainContent">
          {profile?<strong>Xin chào {profile.name}</strong>:<strong>Trở thành hội viên</strong>}
          {profile?<p>Xem lại thông tin của bạn</p>:<p>Trở thành hội viên</p>}
          {profile?<Link to="/"><MyButton>Xem</MyButton></Link>:<Link to={"/dang-nhap"}><MyButton>Đăng ký</MyButton></Link>}
        </div>
       
      </div>
    
      </div>
      <div className="headingPage">Danh mục hàng</div>
      <CategoryHome/>
      </div>
    </div>
  );
};

export default Home;
