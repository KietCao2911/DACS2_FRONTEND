import React from "react";
import { Checkbox, Menu, Radio, Space } from "antd";
import "./colorOptions.scss";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { GetAllColors } from "~/redux/slices/MauSacSlice/MauSacAPI";
import { useState } from "react";
const Item=(props)=>
{
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get("color");
  const {checked , value,label} = props;
  const size = searchParams.get("size") || null;
  const handleChange = (e)=>
  {
    setSearchParams({size,color:e.target.value})
    const value = e.target.value
    console.log({value})
  }
  return  (<div className="ColorCheckboxGroup" style={{display:"inline"}}>
  <input onChange={(e)=>handleChange(e)} checked={defaultValue==value||null}  name="colorOptions" type="radio" id={value} value={value}/>
  <label style={{backgroundColor:"#"+value}}  htmlFor={value||defaultValue||null}>{label}</label>
</div>)
  
}

const ColorOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items,setItems] = useState([]);
  const params = useParams();
  const query = useSearchParams();
  console.log({searchParams})
  
  useEffect(()=>
  {
    const Fetch = async()=>
    {
      const arr = [];
      try {
          const res= await GetAllColors();
          if(res)
          {
            const CountRow = res.length/4;
            let arrChild = [];
            for(let i=0;i< CountRow;i++)
            {
                
              for(let j =i*4;j<(i+1)*4;j++)
              {
                arrChild.push({...res[j]})
              }
              arr.push([...arrChild])
              arrChild =[];
            }
           
          }
          setItems(arr)
         
      } catch (error) {
        throw error;
      }
    }
    Fetch();
  },[])
  const handleCheckBox = (e) => {
    setSearchParams({
      sort: searchParams.get("sort") || "",
      size: searchParams.getAll("size") || "",
      color: e.target.value,
    });
  };
  // useEffect(()=>
  // {
  //   alert("Slug change")
  // },[])
  return (
   <Menu mode="inline" className="ColorOptions">
    <Menu.SubMenu title="Màu sắc"  >
      {items&&items.map(item=>{
        return <Menu.Item style={{display:"flex",height:"5rem"}}>
        {
          item.map(color=>{
            return <Item  value={color.maMau.trim()} label={color.tenMau} />
          })
        }
      </Menu.Item>
      })}
      
    </Menu.SubMenu >
   </Menu>
  );
};

export default ColorOptions;
