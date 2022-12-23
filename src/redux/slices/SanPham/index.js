import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as Api from "./SanPhamApi";
const initialState = {
  products: [],
  product: {
  },
  searchResult:[],
  productsHot:[],
  productsLatest:[],
  loading: {
    btnLoading: false,
    tableLoading: false,
    searchLoading:false,
  },
  totalRow: 0,
};

export const fetchGetAllProducts = createAsyncThunk(
  "fetchGetAllProducts",
  async (props) => {
    const {id,params} = props;
    const res = await Api.GetAllProducts(id,params);
    return res;
  }
);
export const fetchGetProduct = createAsyncThunk(
  "fetchGetProduct",
  async (params) => {
    const { slug} = params;
    const res = await Api.GetProductById(slug);
    return res;
  }
);
export const fetchPostProduct = createAsyncThunk(
  "fetchPostProduct",
  async (params, { rejectWithValue }) => {
    const { body } = params;
    try {
      const res = await Api.PostProduct(body);
      return res;
    } catch (err) {
      throw err
    }
  }
);
export const fetchPutProduct = createAsyncThunk(
  "fetchPutProduct",
  async (params) => {
    const { id, body } = params;
    const res = await Api.PutProduct(id, body);
    return res;
  }
);
export const fetchDeleteProduct = createAsyncThunk(
  "fetchDeleteProduct",
  async (params) => {
    const { id } = params;
    const res = await Api.DeleteProduct(id);
    return res;
  }
);
export const fetchGetAllProductsUser = createAsyncThunk(
  "fetchGetAllProductsUser",
  async (payload) => {
    const { id, params } = payload;
    const res = await Api.GetAllProductsUser(id, params);
    return res;
  }
);
export const fetchGetLatestProducts = createAsyncThunk(
  "fetchGetLatestProducts",
  async () => {
    const res = await Api.GetAllLatestProducts();
    return res;
  }
);
export const fetchPostAddQty =createAsyncThunk("fetchPostUpdateQty",async(params)=>
{
  const {body} = params;
  const res = await Api.PostAddQty(body)
  return res;
})
export const fetchDeleteAddQty =createAsyncThunk("fetchDeleteAddQty",async(params)=>
{
  const {id} = params;
  const res = await Api.DeleteQty(id)
  return res;
})
export const UploadFile = createAsyncThunk("UploadFile",async(params)=>
{
  const {maSP,maMau,body,config } = params;
  console.log({params})
  const res= await Api.Uploads(maSP,maMau,body,config)
  return res;
})
export const DeleteFile = createAsyncThunk("DeleteFile",async(params)=>
{
  const {fileName,_id,maSP,maMau} = params;
  const res= await Api.DeleteImg(fileName,_id,maSP,maMau);
  return res;
})
export const UpdateCategory = createAsyncThunk("UpdateCategory",async(params)=>
{
  const {maSP,body} = params;
  const res = await Api.PutCategoryProduct(maSP,body)
  return res;
})
export const GetHotProducts = createAsyncThunk("GetHotProducts",async()=>
{
  const res= await Api.HotProducts();
  return res;
})
export const SearchProducts =createAsyncThunk("SearchProducts",async(params)=>
{
  const {s} = params;
  const res= await Api.SearchProducts(s);
  return res;
})
const SanPhamSlice = createSlice({
  initialState,
  name: "SanPham",
  reducers: {
    getImgs: (state, action) => {
      const colorId = action.payload.trim();

      let colors = [...state.product.color];
      let sizess = [...state.product.chiTietSoLuong];
      console.log({colors})
      let imgs = colors.filter((item) => item.idMaumau.trim() == colorId);
      let sizes = sizess.filter((item) => item.idmau.trim() == colorId);
      console.log({sizes})
      let sizeResult = sizes || [];
      let imgResult = imgs || [];
      console.log({imgResult});
      state.product.hinhAnhDisplay = imgResult;
      state.product.sizeDisplay = sizeResult;
      state.product.colorSelected = colorId;
      state.product.sizeSelected = null;
      state.product.img = imgResult[0].hinhAnhInfo[0].url
    },
    sizeSelected: (state, action) => {
      const sizeSelected = action.payload.size;
      const colorSelected = action.payload.color;
      const QTY = action.payload.Qty;
      console.log({sizeSelected})
      let ctsl =current(state.product.chiTietSoLuong);
      let colors = ctsl.find(x=>x.idmau.trim() == colorSelected)
      let size = colors.sizeDetails.find(x=>x.idSize == sizeSelected)
      state.product.sizeSelected = size;
      state.product.QtyRemain = QTY||0;
    },
  },
  extraReducers: (builder) => {
    //SearchProducts
    builder.addCase(SearchProducts.pending,(state,action)=>
    {
      state.loading.searchLoading =true;
    })
    builder.addCase(SearchProducts.fulfilled,(state,action)=>
    {
      state.loading.searchLoading =false;
      state.searchResult = action.payload.products;

    })
    //GetHotProducts
    builder.addCase(GetHotProducts.fulfilled,(state,action)=>{
      state.productsHot=action.payload;
    })
    //UpdateCategory
    builder.addCase(UpdateCategory.fulfilled,(state,action)=>
    {
      alert("!");
    })
    //DeleteFile
    builder.addCase(DeleteFile.fulfilled,(state,action)=>
    {
      const {fileName,_id,maSP,maMau} = action.meta.arg;

      console.log({maMau})
      const {} = action.payload;
      const colors = current(state.product.color);
      const obj = colors.find(x=>x.idMaumau.trim()==maMau?.trim());
      const index = colors.indexOf(obj)
      if(obj && index>-1)
      {
        const objHinhAnh = colors[index].hinhAnhInfo.find(x=>x.uid==_id);
        const indexHinhAnh = colors[index].hinhAnhInfo.indexOf(objHinhAnh);
        state.product.color[index].hinhAnhInfo.splice(indexHinhAnh,1);
      }
      
    })
    //UploadFile
    builder.addCase(UploadFile.fulfilled,(state,action)=>
    {
      const {maSanPham,maMau} = action.meta.arg;
      const colors = current(state.product.color);
      const obj = colors.find(x=>x.idMaumau.trim()==maMau?.trim());
      const index = colors.indexOf(obj)
      if(obj && index>-1)
      {

        state.product.color[index].hinhAnhInfo.push(action.payload);
      }
      else
      {
        const data ={idMaumau:maMau,hinhAnhInfo:[{...action.payload}]};
        state.product.color.push({idMaumau:maMau,hinhAnhInfo:[{...action.payload}]})
      }
    })
    //fetchDeleteAddQty
    builder.addCase(fetchDeleteAddQty.fulfilled,(state,action)=>
    {
      let obj = state.product.chiTietSoLuong.find(x=>x.idmau.trim()==action.payload.maMau.trim());
      let indexObj = state.product.chiTietSoLuong.indexOf(obj);
      let qtyDetailObj = obj.sizeDetails.find(x=>x._id==action.meta.arg.id);
      let indexDetail = state.product.chiTietSoLuong[indexObj].sizeDetails.indexOf(qtyDetailObj);
      let myArrSizeDetails = [...obj.sizeDetails];
      myArrSizeDetails.splice(indexDetail,1);
      
      if(indexDetail>-1&&indexObj>-1)
      {
        console.log({myArrSizeDetails})  
        state.product.chiTietSoLuong[indexObj].sizeDetails = [...myArrSizeDetails];
        // state.product.chiTietSoLuong = [...state.product.chiTietSoLuong];
      }
    })
    //fetchPostUpdateQty
    builder.addCase(fetchPostAddQty.fulfilled,(state,action)=>
    {
      
      if(action.payload.action=="Add")
      {
      const ctsl =[...current(state.product.chiTietSoLuong)];
      notification.open({
        type:"success",
        message:"Thêm thành công"

      })
      console.log({ctsl})
        if(ctsl.length>1 )
        {
         
          var obj = ctsl.find(x=>x.idmau.trim()==action.payload.maMau.trim());
          console.log({obj});
          var index = ctsl.indexOf(obj);
          if(index>-1)
          {
            state.product.chiTietSoLuong[index].sizeDetails.push(action.payload)
          }
        }
        else
        {
          console.log("Length< 0 ")
          state.product.chiTietSoLuong.push({idmau:action.payload.maMau.trim(),sizeDetails:[{...action.payload}],colorLabel:action.payload.colorLabel})
        }
      }
      else
      {
        notification.open({
          type:"success",
          message:"Cập nhật thành công"
  
        })
      }
     
    })
    builder.addCase(fetchPostAddQty.rejected,(state,action)=>
    {
      alert("ERROR");
      console.log({details:action.payload})
    })
    //fetchGetLatestProducts
    builder.addCase(fetchGetLatestProducts.pending, (state) => {
      state.loading.tableLoading = true;
    });
    builder.addCase(fetchGetLatestProducts.fulfilled, (state, action) => {
      state.loading.tableLoading = false;
      state.productsLatest = action.payload;
    });
    //fetchGetAllProducts
    builder.addCase(fetchGetAllProducts.pending, (state) => {
      state.loading.tableLoading = true;
    });
    builder.addCase(fetchGetAllProducts.fulfilled, (state, action) => {
      state.loading.tableLoading = false;
      const { products, totalRow } = action.payload;
      state.products = products;
      state.totalRow = totalRow;
    });
    builder.addCase(fetchGetAllProducts.rejected,(state)=>
    {
      state.loading.tableLoading =false;
      state.products= [];
      state.totalRow = 0;
    })
    //fetchGetAllProductsUser
    builder.addCase(fetchGetAllProductsUser.pending, (state) => {
      state.loading.tableLoading = true;
    });
    builder.addCase(fetchGetAllProductsUser.fulfilled, (state, action) => {
      state.loading.tableLoading = false;
      const { products, totalRow } = action.payload;
      state.products = products;
      state.totalRow = totalRow;
    });
    //fetchGetProduct
    builder.addCase(fetchGetProduct.pending, (state) => {});
    builder.addCase(fetchGetProduct.fulfilled, (state, action) => {
      state.product = action.payload;

      state.product.colorSelected =
        state.product?.color[0]?.idMaumau.trim() || null;
      const colorId = state.product.colorSelected;
      let colors = state.product?.color||[];
      let sizess = state.product?.chiTietSoLuong||[];
      let imgs = colors.filter((item) => item.idMaumau.trim() == colorId);
      let sizes = sizess?.filter((item) => item.idmau?.trim() == colorId);
      console.log({colors})
      console.log({imgs})
      let sizeResult = sizes || [];
      let imgResult = imgs || [];
      state.product.img = imgResult[0].hinhAnhInfo[0].url
      state.product.hinhAnhDisplay = imgResult;
      state.product.sizeDisplay = sizeResult;
    });
    //fetchPostProduct
    builder.addCase(fetchPostProduct.pending, (state) => {
      state.loading.btnLoading = true;
    });
    builder.addCase(fetchPostProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload];
      state.loading.btnLoading = false;
      notification.open({
        message: "Thêm thành công",
        type: "success",
      });
    });
    builder.addCase(fetchPostProduct.rejected, (state, action) => {
      state.loading.btnLoading = false;
      console.log({ err: action.payload });
    });
    //fetchPutProduct
    builder.addCase(fetchPutProduct.pending, (state) => {
      state.loading.btnLoading = true;
    });
    builder.addCase(fetchPutProduct.fulfilled, (state, action) => {
      state.loading.btnLoading = false;
      localStorage.clear("cart")
    });
    builder.addCase(fetchPutProduct.rejected, (state) => {
      state.loading.btnLoading = false;
    });
    //fetchDeleteProduct
    builder.addCase(fetchDeleteProduct.pending, (state) => {
      state.loading.btnLoading = true;
    });
    builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
      state.loading.btnLoading = false;
      var temp = [...state.products];
      var obj = temp.find((x) => x.maSanPham == action.meta.arg.id);
      var index = temp.indexOf(obj);
      if (index > -1) {
        temp.splice(index, 1);
        state.products = temp;
      }
      notification.open({
        message: "Xóa thành công",
        type: "success",
      });
    });
    builder.addCase(fetchDeleteProduct.rejected, (state, action) => {
      state.loading.btnLoading = false;
      console.log({ ERR: action.error });
    });
  },
});
export const { getImgs, sizeSelected } = SanPhamSlice.actions;
export default SanPhamSlice;
