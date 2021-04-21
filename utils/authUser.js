import axios from "axios";
import catchErrors from "./catchErrors";
import Router from "next/router";
import cookie from "js-cookie";
import { baseUrl } from "./baseUrl";

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};

export const registerUser = async (user, profilePicUrl, setError) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      user,
      profilePicUrl,
    });
    setToken(res.data);
  } catch (error) {
    console.log(`error`, error);
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};

export const loginUser = async (user, setError, setLoading) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, { user });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const logoutUser = (email) => {
  cookie.set("userEmail", email);
  cookie.remove("token");
  Router.push("/login");
  Router.reload();
};
