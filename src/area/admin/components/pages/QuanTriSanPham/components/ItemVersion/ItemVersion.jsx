import { DeleteOutlined } from '@ant-design/icons'
import { Checkbox, Col, notification, Row, Select } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyButton from '~/components/commomComponents/Button'
import "./ItemVersion.scss"

import { v4 } from 'uuid'
const {Option} = Select
const ItemVersion = (props) => {
  const {versions,setVersions, index,item,initValues,sizes,colors} = props;
  const {soLuongTon} = initValues;
  const [selected,setSelected] = useState(()=>
  {
    const res = versions[index][0].IDColor;
    return res||"Red";
  })

  const [checked,setChecked] = useState(()=>{
    const res = versions[index].map(item=>item.IDSize)
    return res||[];

  })

  const handleDeleteItem =()=>
  {
   versions.splice(index,1);
    setVersions([...versions])
  }
  const onChangeSelect=(e)=>
  {
    let res =versions[index].map(item=>{
      return {
        ...item,
        IDColor:e
      }
    })
    versions[index]=res;
    setVersions([...versions])
  }
  const onChangeCheckbox=(e)=>
  {
    let temp = e.map(item=>{
      return {
        IDColor:selected,
        IDSize:item,
        soLuongTon:initValues.soLuongTon
      }
    })
    versions[index]=  temp;
    setVersions([...versions])
  }
  return (
    <div className='ItemVersion'>
      <Row >
        <Col xl={8}>
          <Select defaultValue={selected} onChange={(e)=>onChangeSelect(e)} style={{ width: "100%" }}>
                {colors&&colors.map(color=><Option value={color.maMau.trim()}>{color.tenMau}</Option>)}
          </Select>
        </Col>
        <Col xl={8}>
          <Checkbox.Group defaultValue={checked} onChange={onChangeCheckbox}>
          <Row>
      {sizes&&sizes.map(size=><Col key={v4()} span={8}>
        <Checkbox value={size.value}>{size.label}</Checkbox>
      </Col>)}
      
    </Row>
          </Checkbox.Group>
        </Col>
        <Col xl={8}>
          <MyButton onClick={handleDeleteItem} style={{width:"10rem"}}><DeleteOutlined/></MyButton>
        </Col>
      </Row>
    </div>
  )
}

export default ItemVersion