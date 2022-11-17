import * as Method from "~/axiosRequest/request"

export const fetchDoanhSo=async(id,body)=>
{
try {
    const res = await Method.Post("/api/ThongKe/"+id,body);
    return res;
} catch (error) {
    throw error
}
}