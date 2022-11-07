import React from 'react'
import { useState } from 'react'
import "./InputText.scss"
import {CloseCircleFilled} from "@ant-design/icons"
export const InputText = (props) => {
  const {label} = props;
    const [click,setClick] = useState(false);
    const [text,setText] = useState("");
    const [error,setError] = useState("");
    const ClickEvent = ()=>
    {

    }
    const changeText = (e)=>
    {
        setError("")
       setText(e.target.value)
    }
    const validateInput = ()=>
    {
        if(text.length==0)
        {
            setError("Vui lòng nhập trường này!...");
        }
    }
  return (
    <div className='InputText'>
        <input type="text" className={`${text.length>0?"onClickEvent":""}`} value={text} onChange={changeText} onKeyDown={validateInput}/>
        <label htmlFor="#" >{label||"Tên"}</label>
        {error&& <span className='error'>{error}</span>}
        <CloseCircleFilled className='IconClose'/>
    </div>
  )
}
