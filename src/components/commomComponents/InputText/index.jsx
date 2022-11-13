import React, { memo, useMemo } from 'react'
import { useState } from 'react'
import "./InputText.scss"
import {CloseCircleFilled} from "@ant-design/icons"
import { useEffect } from 'react'
export const InputText = (props) => {
  const {label,value,maxLength,minLength,number,onChange,type,errorProp} = props;
    const [error,setError] = useState(errorProp||"");

    const validateInput = ()=>
    {
        if(value?.length<=0)
        {
            setError("Vui lòng nhập trường này!...");
        }
        else if(value?.length>=(maxLength))
        {
          setError(`Trường này không được nhập hơn ${maxLength} kí tự`); 
        }
        else if(value?.length<minLength) {
          setError(`Trường này phải nhập ít nhất ${minLength} kí tự`);
        }
        else if(number)
        {
          if(/\D/.test(value))
          {
            setError(`Trường này phải là số`);
            onChange("");
          }
          else{
            setError("")
          }
        }
        else{
          setError("")
        }
    }
    useEffect(()=>
    {
      validateInput();
    })
  
    const handleChange=(e)=>
    {
      onChange(e);
    }    
  return (
    <div className='InputText'>
        <input type={"text"} maxLength={maxLength} value={value||""} className={`${value?"onClickEvent":""}`}  {...props} onChange={(e)=>handleChange(e.target.value)} onKeyDown={validateInput}/>
        <label htmlFor="#" >{label||"Tên"}</label>
        {error&& <span className='error'>{error}</span>}
        <CloseCircleFilled className='IconClose'/>
    </div>
  )
}
export default InputText
