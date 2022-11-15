import * as Method from "~/axiosRequest/request";
export const GetAllProducts = async (id,params) => {
  try {
    const res = await Method.Get("/api/admin/SanPham/"+id||null, params);
    return res;
  } catch (err) {
    throw err;
  }
};

export const GetProductById = async (id) => {
  try {
    const res = await Method.Get(`/api/admin/SanPham/san-pham/${id}`);
    return res;
  } catch (error) {
    throw error;
  }
};
export const PostProduct = async (body, config) => {
  try {
    const res = await Method.Post("/api/admin/SanPham", body, config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const PutProduct = async (id, body, config) => {
  try {
    const res = await Method.Put(`/api/admin/SanPham/${id}`, body, config);
    return res;
  } catch (error) {
    throw error;
  }
};
export const DeleteProduct = async (id) => {
  try {
    const res = await Method.Delete(`/api/admin/SanPham/${id}`);
  } catch (error) {
    throw error;
  }
};
export const GetAllProductsUser = async (id, params) => {
  try {
    const res = await Method.Get("/api/SanPham/" + id, {params});
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetAllLatestProducts = async () => {
  try {
    const res = await Method.Get("/api/Home/ProductsLatesUpdate");
    return res;
  } catch (err) {
    throw err;
  }
};
export const PutCategoryProduct = async(maSP,body)=>
{
  try {
    const res = await Method.Post("/api/DanhMucDetails/"+maSP,body);
    return res;
  } catch (error) {
    throw error;
  }
}
export const PostAddQty = async(body)=>
{
  try {
    const res = await Method.Post("/api/SoLuongDetail",body)
    return res;
  } catch (error) {
    throw error
  }
}
export const DeleteQty = async (id)=>
{
  try {
    const res = await Method.Delete("/api/SoLuongDetail/"+id);
    return res;
  } catch (error) {
    throw error
  }
}
export const Uploads = async (MaSP, MaMau, body, config) => {
  try {
    const res = await Method.Post(
      `/api/admin/SanPham/Upload-Mutiple/${MaSP}/${MaMau}`,
      body,
      config
    );
    return res;
  } catch (err) {
    throw err;
  }
};
export const DeleteImg = async(fileName,_id,maSP,maMau)=>
{
  try {
    const res = await Method.Delete(`/api/admin/SanPham/RemoveImg?fileName=${fileName}&_id=${_id}&maSP=${maSP}&maMau=${maMau}`);
    return res;
  } catch (error) {
    throw error
  }
}