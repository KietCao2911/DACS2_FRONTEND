import * as Method from "~/axiosRequest/request";

export const fetchGetAllHoaDon =async()=>
{
    try {
        const res = await Method.Get("api/admin/DonHang");
        return res;
    } catch (error) {
        throw error
    }
}