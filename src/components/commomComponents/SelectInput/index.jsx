import React from 'react'
import "./SelectInput.scss"
import { Spin } from 'antd';
import CustomSpin from '~/components/CustomSpin';
export const SelectInput = (props) => {
  const {onChange,defaultLabel,options,children,name,loading=false}= props;
  return (
    <div className='SelectInput'>
        <select name={name} onChange={onChange} >
          {children}
        </select>
        <div className="loading">
           {loading&&<CustomSpin/>} 
        </div>
    </div>
  )
}
