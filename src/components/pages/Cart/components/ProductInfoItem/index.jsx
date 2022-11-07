import React from 'react'
import "./ProductInfoItem.scss"
import {CloseOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import GioHangSlice,{RemoveItem} from '~/redux/slices/GioHang/GioHangSlice'
function ProductInfoItem(props) {
    console.log({props})
    const {hinhAnhDisplay,giaBanDisplay,qty,sizeSelected,colorSelected,maSanPham,tenSanPham} = props;
    const img = hinhAnhDisplay[0]?.hinhAnhInfo[0]?.url;
    console.log({img})
    const dispatch =useDispatch();
    const handleRemoveItem =()=>
    {
        dispatch(RemoveItem({size:sizeSelected.idSize,color:colorSelected,maSanPham}))
    }
  return (
    <Link to={"#"} className='PrductInfoItem'>
    <CloseOutlined  className="closeIcon" onClick={handleRemoveItem}/>
    <div className="Container">
        <div className="img">
            <img src={img||"https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
        </div>
        <div className="content">
            <div className="name">
            <h4>{tenSanPham||"CAMPUS 80S SOUTH PARK TOWELIE"}</h4>
            </div>
            <p>{giaBanDisplay||"---"}</p>
            <div className="size">
                <h3>KÍCH CỠ: {sizeSelected.sizeLabel} </h3>
            </div>
            <div className="SizeSelect">
                <select value={qty}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default ProductInfoItem