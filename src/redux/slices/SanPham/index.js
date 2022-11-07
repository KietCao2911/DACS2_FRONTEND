import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as Api from "./SanPhamApi";
const initialState = {
  products: [],
  product: {
  },
  loading: {
    btnLoading: false,
    tableLoading: false,
  },
  totalRow: 0,
};

export const fetchGetAllProducts = createAsyncThunk(
  "fetchGetAllProducts",
  async (params) => {
    const res = await Api.GetAllProducts(params);
    return res;
  }
);
export const fetchGetProduct = createAsyncThunk(
  "fetchGetProduct",
  async (params) => {
    const { id } = params;
    const res = await Api.GetProductById(id);
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
      throw rejectWithValue(err);
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
  async (params) => {
    const { id, query } = params;
    const res = await Api.GetAllProductsUser(id, query);
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
const SanPhamSlice = createSlice({
  initialState,
  name: "SanPham",
  reducers: {
    getImgs: (state, action) => {
      const colorId = action.payload.trim();

      console.log({ colorId });
      let colors = [...state.product.mauSac];
      let sizess = [...state.product.chiTietSoLuong];
      console.log({colors})
      let imgs = colors.filter((item) => item.idMaumau.trim() == colorId);
      let sizes = sizess.filter((item) => item.idmau.trim() == colorId);
      let sizeResult = sizes || [];
      let imgResult = imgs || [];
      console.log({ reducers: colors, sizess });
      state.product.hinhAnhDisplay = imgResult;
      state.product.sizeDisplay = sizeResult;
      state.product.colorSelected = colorId;
      state.product.sizeSelected = null;
    },
    sizeSelected: (state, action) => {
      const sizeSelected = action.payload.size;
      const colorSelected = action.payload.color;
      console.log({sizeSelected})
      let ctsl =current(state.product.chiTietSoLuong);
      let colors = ctsl.find(x=>x.idmau.trim() == colorSelected)
      let size = colors.sizeDetails.find(x=>x.idSize == sizeSelected)
      state.product.sizeSelected = size;
    },
  },
  extraReducers: (builder) => {
    //fetchGetLatestProducts
    builder.addCase(fetchGetLatestProducts.pending, (state) => {
      state.loading.tableLoading = true;
    });
    builder.addCase(fetchGetLatestProducts.fulfilled, (state, action) => {
      state.loading.tableLoading = false;
      state.products = action.payload;
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
        state.product?.chiTietSoLuong[0]?.idmau.trim() || null;
      const colorId = state.product.colorSelected;
      console.log(colorId);
      let colors = [...state.product.mauSac];
      let sizess = [...state.product.chiTietSoLuong];
      let imgs = colors.filter((item) => item.idMaumau.trim() == colorId);
      let sizes = sizess?.filter((item) => item.idmau?.trim() == colorId);
      let sizeResult = sizes || [];
      let imgResult = imgs || [];
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
