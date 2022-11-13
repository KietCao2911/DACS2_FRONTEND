import React,{useState} from 'react'
import "./InfoPage.scss"
import { useDispatch,useSelector } from 'react-redux'
import {Modal} from "antd"
import ModalCustom from '~/components/commomComponents/ModalCustom'
import { InputText } from '~/components/commomComponents/InputText'
import MyButton from '~/components/commomComponents/Button'
const InfoPage = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.XacThuc)
    const [modalInfo,setModalInfo] = useState(false);
    const [userName,setUserName] = useState(user.info.tenKhachHang||"")
    const [dateInfo,setDateInfo] = useState({
        dd:{
            value:"",
            error:""
        },
        mm:{
            value:"",
            error:""
        },
        yyyy:{
            value:"",
            error:""
        }
    })
    const [sex,setSex] = useState(user.info.gioitinh||null);
    console.log({sex})
    const handleToggleModalInfo=()=>
    {
        setModalInfo(true)
    }
    const handleSetDay=(value)=>
    {
        if(Number(value)<31&&Number(value))
        {
            setDateInfo({...dateInfo,dd:{value,error:""}})
        }
        else{
            setDateInfo({...dateInfo,dd:{value,error:"Ngày không hợp lệ"}})
        }
    }
  return (
    <div className='InfoPage'>
        <div className="MyInfo">
            <h2>THÔNG TIN CỦA TÔI</h2>
            <i>Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản của bạn luôn được cập nhật.</i>
        </div>
        <div className="InfoDetail">
        <h2>THÔNG TIN CHI TIẾT</h2>
            <div className="name">{user.info.tenKhachHang||<i>Chưa cập nhật ngày sinh</i>}</div>
            <div className="date">{user.info.ngaysinh||<i>Chưa cập nhật ngày sinh</i>}</div>
            <div className="date">{user.info.gioitinh||<i>Chưa cập nhật giới tính</i>}</div>
            <div className="action">
                <span onClick={handleToggleModalInfo}>
                    Chỉnh sửa
                </span>
            </div>
        </div>
        <div className="LoginDetail">
            <h2>THÔNG TIN ĐĂNG NHẬP</h2>
            <div className="email">
                <h3>EMAIL</h3>
                <div className="date">{user.info.email||<i>Chưa cập nhật email</i>}</div>
               <div className="action">
               <span>
                    Chỉnh sửa
                </span>
               </div>
            </div>
            <div className="password">

            </div>
        </div>
       <ModalCustom visiable={modalInfo} onCancel={()=>setModalInfo(false)}>
      <div className="formUpdateInfo">
      <strong>CHỈNH SỬA THÔNG TIN CỦA BẠN</strong>
        <InputText maxLength={10} value={userName} onChange={(e)=>setUserName(e.target.value)} label="Tên người dùng"></InputText>
        <strong>Ngày sinh</strong>
        <div className="infoDate">
            <InputText number={true} errorProp={dateInfo.dd.error} maxLength={2} label="dd" value={dateInfo.dd.value} onChange={(e)=>handleSetDay(e.target.value)}></InputText>
            <InputText number={true} maxLength={2} label="mm" value={dateInfo.mm.value} ></InputText>
            <InputText number={true} maxLength={4} label="yyyy" value={dateInfo.yyyy.value} ></InputText>
        </div>
            <strong>Giới tính</strong>
        <div className="sexInfo">
            <div className="RadioItem">
                <input type="radio" value={"true"} checked={sex?true:null} id='nu' name='sex' onChange={(e)=>(setSex(e.target.value=="true"?true:false))}/>
                <label htmlFor="nu">NAM</label>
            </div>
            <div className="RadioItem">
                <input value={"false"} onChange={(e)=>(setSex(e.target.value=="true"?true:false))} type="radio" id='nam' name='sex' checked={sex==false?true:null}/>
                <label htmlFor="nam">NỮ</label>
            </div>
        </div>
            <MyButton style={{width:"100%"}}>CẬP NHẬT</MyButton>
      </div>
       </ModalCustom>
    </div>
  )
}

export default InfoPage