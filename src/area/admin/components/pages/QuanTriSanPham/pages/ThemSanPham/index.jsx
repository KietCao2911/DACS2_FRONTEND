import { BarcodeOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Col, Form, Input, InputNumber, Row, Select, Space, Spin, Switch } from 'antd'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react'
import MyButton from '~/components/commomComponents/Button';
import InputText from '~/components/commomComponents/InputText';
import * as Yup from "yup"
import convertVND from '~/components/utils/ConvertVND';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ItemVersion from '../../components/ItemVersion/ItemVersion';
import { v4 } from 'uuid';
import ChildProduct from '../../components/ChildProduct';
import { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as KichCoAPI from '~/redux/slices/KichCoSlice'
import * as MauSacAPI from '~/redux/slices/MauSacSlice'
const CreateProduct = () => {
  const [khoiTaoKho, setKhoiTaoKho] = useState(false);
  const [initStyles, setInitStyle] = useState(false);
  const [versions, setVersions] = useState([]);
  const [openDes, setOpenDsc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const {sizes} = useSelector(state=>state.KichCo)
  const {colors} = useSelector(state=>state.MauSac)
  console.log({sizes,colors});
  const dispatch = useDispatch();
  useEffect(()=>
  {
    dispatch(KichCoAPI.fetchALLSize());
    dispatch(MauSacAPI.fetchALLColors())
  },[])
  const form = useFormik({
    initialValues: {
      product: {
        tenSanPham: "",
        MaSanPham: "",
        giaNhap: 0,
        giaBanLe: 0,
        giaBanSi: 0,
        giaVon: 0,
        soLuongTon: 0,
        status: true,
        Mota: "",
        SanPhams: [],
      },
      maSP: ""
    },
    validationSchema: Yup.object({
      product: Yup.object().shape({
        tenSanPham: Yup.string().required("Trường này là bắt buộc"),
        giaNhap: Yup.number()
      })
    })
  })
  function isNumeric(str) {
    return !isNaN(str)
  }
  const handleChangePrice = (props) => {
    const { e, fieldName } = props;
    let value = e.target.value;
    if (value.length > 0 && !isNumeric(value)) {
      //  alert("Wrog")
    }
    else {
      form.setFieldValue(`product.${fieldName}`, value);
      const res = versions.map(item => {
        return item.map(child => {
          return {
            ...child,
            [fieldName]: value,
          }
        })
      })
      startTransition(() => {
        setVersions([...res])
      })

    }
  }
  const handleSubmt = () => {
    form.submitForm()
  }
  const onSwitchKho = (status) => {
    if (!status) {
      form.setFieldValue("product.soLuongTon", 0);
    }
    setKhoiTaoKho(status)
  }
  const handleClickAddFieldChild = () => {
    const { giaBanLe, giaVon, giaBanSi, soLuongTon } = form.values.product;
    setVersions([...versions, [{ giaBanLe, giaVon, giaBanSi, soLuongTon }]])
  }
  return (
    <Form>
      <Row gutter={[10, 20]}>
        <Col md={{span:16,order:1}}  xs={{ span:24,order:2}} >
          <div className="left">
            <Row gutter={[0, 20]}>
              <Col md={24}>
                <Card title="Thông tin sản phẩm" style={{ width: "100%" }}>
                  <Row gutter={[20, 20]}>
                    <Col md={12} xs={24}>
                      <InputText placeHolder="Mã sản phẩm (Có thể bỏ trống)" label="Mã sản phẩm" name="product.MaSanPham" value={form.values.product.MaSanPham} onChange={form.handleChange}></InputText>
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText label="Tên sản phẩm " name={"product.tenSanPham"} placeHolder={"Tên sản phẩm (Không thể bỏ trống)"} value={form.values.product.tenSanPham} onChange={form.handleChange} />
                      {form.touched && form.errors?.product?.tenSanPham && <span className='error'>{form.errors?.product?.tenSanPham}</span>}
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText label="Giá bán lẻ" name="product.giaBanLe" value={form.values.product.giaBanLe} onChange={(e) => handleChangePrice({ e, fieldName: "giaBanLe" })}></InputText>
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText name="product.giaBanSi" value={form.values.product.giaBanSi} label="Giá sỉ" onChange={(e) => handleChangePrice({ e, fieldName: "giaBanSi" })}></InputText>
                    </Col>
                    <Col md={24} xs={24}>
                      <Card title="Mô tả" extra={<Switch defaultChecked={false} onChange={() => setOpenDsc(!openDes)} />}>
                        {!openDes ? "Thêm mô tả cho sản phẩm" : <CKEditor
                          onChange={(e, editor) => form.setFieldValue("product.Mota", editor.getData())}
                          editor={ClassicEditor}
                        >Mô tả sản phẩm
                        </CKEditor>
                        }
                      </Card>
                    </Col>

                  </Row>


                </Card></Col>
              <Col md={24} xs={24} >
                <Card style={{ width: "100%" }} title="Khởi tạo kho hàng" extra={<Switch onChange={(e) => onSwitchKho(e)} />}>
                  <p>Ghi nhận số lượng tồn ban đầu</p>
                  {khoiTaoKho && <Row gutter={[20, 20]}>
                    <Col md={12} xs={24}>
                      <InputText label="Tồn kho ban đầu" value={form.values.product.soLuongTon} onChange={(e) => handleChangePrice({ e, fieldName: "soLuongTon" })}></InputText>
                    </Col>
                    <Col md={12} xs={24}>
                      <InputText label="Giá vốn" placeHolder="Giá vốn" value={form.values.product.giaVon} onChange={(e) => handleChangePrice({ e, fieldName: "giaVon" })}></InputText>
                    </Col>
                  </Row>}

                </Card></Col>
              <Col xs={24} md={24} >
                <Card style={{ width: "100%" }} title="Khởi tạo phiên bản" extra={<Switch onChange={(e) => setInitStyle(e)} />}>
                  <p>Thêm các phiên bản cho sản phẩm</p>
                  <Row gutter={[0, 40]}> {initStyles && versions.map((i, index) => <Col xl={24} key={v4()}><ItemVersion colors={colors} sizes={sizes} item={i} initValues={form.values.product} index={index} versions={versions} setVersions={setVersions} /></Col>)}</Row>
                  {initStyles && <MyButton style={{ width: "20rem" }} onClick={() => handleClickAddFieldChild()}>Thêm trường</MyButton>}
                </Card></Col>

            </Row>
          </div>
        </Col>
        <Col md={{span:8,order:2}} xs={{ span:24,order:1}} >
          <div className="right">
            <Row gutter={[0, 20]}>
              <Col md={24} >
                <Card title="Chi nhánh" style={{ width: "100%" }}>
                  <Select value={1} style={{ width: "100%" }}>
                    <Select.Option value={1}>Chi nhánh mặc định</Select.Option>
                  </Select>


                </Card>
              </Col>
              <Col xl={24} >
                <Card title="Loại hàng" style={{ width: "100%" }} >
                  <Row gutter={[20,20]}>
                    <Col xl={24}>
                    <Select value={null} style={{ width: "100%" }}>
                    <Select.Option value={null}>Chọn loại sản phẩm</Select.Option>
                  </Select>
                    </Col>
                    <Col xl={24}>
                    <Select value={null} style={{ width: "100%" }}>
                    <Select.Option value={null}>Chọn nhãn hiệu</Select.Option>
                  </Select>
                    </Col>
                  </Row>
                 

                </Card>
              </Col>
              <Col md={24} xs={24}>
                <Card style={{ width: "100%" }} title="Cho phép bán" extra={<Switch defaultChecked={form.values.product.status ? true : false} onChange={(s) => form.setFieldValue("product.status", s)}></Switch>}>
                  {form.values.product.status ? "Cho" : "Không"} phép bán sản phẩm này.
                </Card>
              </Col>

            </Row>
          </div>
        </Col>
        <Col md={{span:24,order:3}}>
          {versions.length > 0 && <Card title="Phiên bản">
            <Row gutter={[0, 20]}>
              {versions && versions.map((item, parentIndex) => item && item.map((child, index) => {
                return <Col xl={24}><ChildProduct versions={versions} setVersions={setVersions} parentIndex={parentIndex} index={index} form={form} value={child} /></Col>
              }))}
            </Row>
          </Card>}
        </Col>
      </Row>
      <div className="actions">
              <Row>
              <MyButton style={{backgroundColor:"red",width:"15rem"}} icon={loading ? <Spin /> : <CloseOutlined />}>Thoát</MyButton>
          <MyButton style={{backgroundColor:"green",width:"15rem"}} icon={<SaveOutlined />} onClick={handleSubmt}>Tạo</MyButton>
          <MyButton style={{width:"15rem"}} icon={<BarcodeOutlined />}>In mã vạch</MyButton>
              </Row>
      </div>
    </Form>
  )
}

export default CreateProduct