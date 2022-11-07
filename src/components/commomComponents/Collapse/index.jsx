import React from 'react'
import "./Collapse.scss"
import {DownOutlined,UpOutlined} from "@ant-design/icons"
import { useState } from 'react';
const MyCollapse = (props) => {
    const {Icon,children,label} = props;
    const [open,setOpen] = useState(false);
  return (
    <section className='MyCollapse' onClick={()=>setOpen(!open)}>
        <div className="labelGroup"  >
            <h3 className="label">{label}</h3>
        <div className="Icon Icon-Down">
            {open?<UpOutlined/>:<DownOutlined/>}
            
        </div>
        </div>
        <div className={`Content ${open?"active":""}`}>
    <p>{children}</p>
        </div>
    </section>
  )
}

export default MyCollapse