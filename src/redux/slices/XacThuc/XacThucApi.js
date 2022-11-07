import * as Method from "~/axiosRequest/request";

export const GetCurrentUser = async () => {
  try {
    const res = await Method.Get("/api/Auth/GetUser");
    return res;
  } catch (error) {
    throw error;
  }
};
export const UserSignIn = async (body) => {
  try {
    const res = await Method.Post("/api/Auth/SignIn", body);
    return res;
  } catch (error) {
    throw error;
  }
};
export const GetRefreshToken = async () => {
  try {
    const res = await Method.Post("/api/Auth/RefreshToken");
    return res;
  } catch (error) {
    throw error;
  }
};
