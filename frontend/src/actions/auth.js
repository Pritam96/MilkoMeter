import axios from "axios";
import {
  login as authLogin,
  logout as authLogout,
  loadData,
} from "../store/authSlice";

export const create =
  ({ username, email, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post("api/auth/register", {
        username,
        email,
        password,
      });
      dispatch(authLogin(res.data));
    } catch (error) {
      console.log(error);
      dispatch(authLogout());
    }
  };

export const login =
  async ({ email, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post("api/auth/login", {
        email,
        password,
      });
      console.log(res);
      dispatch(authLogin(res.data));
    } catch (error) {
      console.log(error);
      dispatch(authLogout());
    }
  };

export const getCurrentUser = async (token) => async (dispatch) => {
  try {
    const res = await axios.get("api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(loadData(res.data));
  } catch (error) {
    console.log(error);
    dispatch(authLogout());
  }
};

export const logout = async () => async (dispatch) => {
  try {
    await axios.get("api/auth/logout");
    dispatch(authLogout());
  } catch (error) {
    console.log(error);
  }
};
