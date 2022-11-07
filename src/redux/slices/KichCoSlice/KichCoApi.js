import * as request from "~/axiosRequest/request";

export const getALLSize = async () => {
  try {
    const res = await request.Get("/api/Sizes");
    return res;
  } catch (error) {
    return error;
  }
};
