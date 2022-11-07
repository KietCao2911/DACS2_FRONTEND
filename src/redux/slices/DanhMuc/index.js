import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as request from "./DanhMucApi";
import { notification } from "antd";
const initialState = {
  items: {},
  item: {},
  itemsArr: [],
  loading: false,
};
export const fetchCategoryAll = createAsyncThunk(
  "DanhMuc/fetchCategoryAll",
  async () => {
    const res = await request.GetAllDanhMucForUI();
    return res;
  }
);
export const fetchCategoryDelete = createAsyncThunk(
  "DanhMuc/fetchCategoryDelete",
  async (id) => {
    const res = await request.DeleteCategory(id);
    return res;
  }
);
export const fetchCategoryUpdate = createAsyncThunk(
  "DanhMuc/fetchCategoryUpdate",
  async (params) => {
    const { id, body } = params;
    console.log({ id, body });
    const res = await request.UpdateCategory(id, body);
    return res;
  }
);
export const fetchCategoryGetById = createAsyncThunk(
  "DanhMuc/fetchCategoryGetById",
  async (id) => {
    const res = await request.GetCatById(id);
    return res;
  }
);
export const fetchCategoryAdd = createAsyncThunk(
  "DanhMuc/fetchCategoryAdd",
  async (params) => {
    const res = await request.PostCategory(params);
    return res;
  }
);
export const fetchCategoryAllAdmin = createAsyncThunk(
  "DanhMuc/fetchCategoryAllAdmin",
  async () => {
    const res = await request.GetAllDanhMucForAdmin();
    return res;
  }
);
export const fetchGetCategoryByParentId = createAsyncThunk(
  "DanhMuc/fetchGetCategoryByParentId",
  async (params) => {
    const { id } = params;
    const res = await request.GetCategoryByParentId(id);
    return res;
  }
);
const DanhMucSlice = createSlice({
  name: "DanhMuc",
  initialState,
  extraReducers: (builder) => {
    //fetchCategoryAdd

    builder.addCase(fetchCategoryAdd.fulfilled, (state, action) => {
      notification.open({
        message: "Thêm thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryAdd.rejected, () => {
      notification.open({
        message: "Có lỗi xảy ra",
        type: "error",
      });
    });
    builder.addCase(fetchCategoryGetById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryGetById.fulfilled, (state, action) => {
      state.loading = false;
      state.item = action.payload;
    });
    builder.addCase(fetchCategoryAll.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAll.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategoryDelete.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryDelete.fulfilled, (state, action) => {
      const id = action.meta.arg;
      let temp = state.items.danhmucs.filter((x) => x.id != id);
      state.loading = false;
      state.items.danhmucs = temp;
      notification.open({
        message: "Xóa thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryDelete.rejected, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Có lỗi xảy ra, vui lòng thử lại sau",
        type: "error",
      });
    });
    //fetchCategoryUpdate
    builder.addCase(fetchCategoryUpdate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryUpdate.fulfilled, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Cập nhật thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryUpdate.rejected, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Cập nhật thất bại!",
        type: "error",
      });
    });
    //fetchCategoryAllAdmin
    builder.addCase(fetchCategoryAllAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAllAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    //fetchGetCategoryByParentId
    builder.addCase(fetchGetCategoryByParentId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetCategoryByParentId.fulfilled, (state, action) => {
      state.loading = false;
      state.itemsArr = action.payload;
    });
  },
});
export default DanhMucSlice;
