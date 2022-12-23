import React, { memo, useMemo } from 'react'
import { useState } from 'react'
import "./InputText.scss"
import {AlertOutlined, CloseCircleFilled, CloseOutlined, ExclamationCircleOutlined, ExclamationOutlined} from "@ant-design/icons"
import { useEffect } from 'react'
import CustomSpin from '~/components/CustomSpin'
import { Spin, Tooltip } from 'antd'
import MyButton from '../Button'
export const InputText = (props) => {
  const {label,value,maxLength,minLength,number,onChange,type,errorProp,loading,setWrong} = props;
    const [error,setError] = useState("");
    // const validateInput = ()=>
    // {
    //     if(value?.length<=0)
    //     {
    //         setError("Vui lòng nhập trường này!...");
    //         setWrong(true)
    //     }
    //     else if(value?.length>(maxLength))
    //     {
    //       setError(`Trường này không được nhập hơn ${maxLength} kí tự`); 
    //       setWrong(true)
    //     }
    //     else if(value?.length<minLength) {
    //       setError(`Trường này phải nhập ít nhất ${minLength} kí tự`);
    //       setWrong(true)
    //     }
    //     else if(type=="phone")
    //     {
    //       if(/\D/.test(value))
    //       {
    //         setError(`Trường này phải là số`);
    //         handleChange('')
    //         setWrong(true)

    //         return;
    //       }
    //       else{
    //         setError("")
    //         setWrong(false)
    //       }
    //     }
    //     else if(type=="email")
    //     {
    //       let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //       if(!value.match(validRegex))
    //       {
    //         setError(`Sai định dạng Email`);
    //         setWrong(true)
    //       }
    //       else
    //       {
    //         setError(``);
    //         setWrong(false)
    //       }
    //     }
    //     else{
    //       setError("")
    //       setWrong(false)
    //     }
       
    // }
    // useEffect(()=>
    // {
    //   validateInput();
    // })
  
    const handleChange=(e)=>
    {
      onChange(e);
    }    
    const onClickClear=()=>
    {
      handleChange('');
    }
  return (
    <div className='InputText'>
        <input  type={"text"} onChange={onChange} {...props} />
        <label htmlFor="#" ><p>{label||"Tên"} </p>
          {/* <Tooltip title="Làm này làm kia"><ExclamationCircleOutlined /></Tooltip> */}
        </label>
        {/* {error&& <span className='error'>{error}</span>} */}
       {/* {!loading? <CloseOutlined className='IconClose' onClick={onClickClear}/>: <div className='IconClose'><Spin /></div>} */}
    </div>
  )
}
export default InputText
