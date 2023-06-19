import { config } from "./config";
import { getToken } from "../utils/localstorage";

const registerUser = async (path, body) => {
  console.log("registerUser");
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    console.log("res", res);
    const data = await res.json();
    console.log("registerUser", data);
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const loginUser = async (path, body) => {
  console.log("loginUser");
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    console.log("res", res);
    const data = await res.json();
    console.log("login", data);
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const forgotPassword = async (path, body) => {
  console.log("forgotPassword");
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("forgotPassword data", data);
    //   localStorage.setItem("ID", data?.data);
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const LinkExpired = async (path, body) => {
  console.log("LinkExpired");
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.baseURL + path, params);
    console.log("res", res);
    const data = await res.json();
    console.log("LinkExpired", data);
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const verifyToken = async (path, body) => {
  console.log("verifyToken");
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log("params", params);
    const res = await fetch(config.baseURL + path, params);
    console.log("res", res);
    const data = await res.json();
    console.log("verifyToken", data);
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const resetPassword = async (path, body) => {
  console.log("resetPassword");
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    console.log("params", params);
    const res = await fetch(config.baseURL + path, params);
    console.log("res", res);
    const data = await res.json();
    console.log("resetPassword", data);
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const getAllProducts = async (path, body) => {
  console.log("getAllProducts", config.baseURL + path);
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("getAllProducts data", data);
    return { statusCode: data.success, data: data.obj };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const updateProfile = async (path, body) => {
  console.log("updateProfile");
  console.log(config.baseURL + path);
  console.log("getToken", getToken());
  const token = getToken();
  try {
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("updateProfile data...", data);
    return { statusCode: data.success, data: data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const getProfileData = async (path, body) => {
  console.log("getProfileData");
  console.log(config.baseURL + path);
  console.log("getToken", getToken());
  const token = getToken();
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    return { statusCode: data.success, data: data.data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const resetSessionTimer = async (path, body) => {
  console.log("resetSessionTimer");
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    return { statusCode: data.success };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};
const getDynamicList = async (path, body) => {
  console.log("getDynamicList");
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("getDynamicList data", data);
    return { statusCode: data.success, data: data.dynamicData };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const getFeaturedProducts = async (path, body) => {
  console.log("getFeaturedProducts");
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("getFeaturedProducts", data);
    return { statusCode: data.success, data: data.obj };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const getRecentlyAddedProducts = async (path, body) => {
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("getRecentlyAddedProducts", data);
    return { statusCode: data.success, data: data.filteredProducts };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};
const getSearchProducts = async (path, body) => {
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("getSearchProducts", data);
    return { statusCode: data.success, data: data.obj };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const getProductDetail = async (path, body) => {
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("getProductDetail", data);
    return { statusCode: data.success, data: data.product };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const getRelatedDetail = async (path, body) => {
  console.log(config.baseURL + path);
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("getRelatedDetail", data);
    return { statusCode: data.success, data: data.relatedProducts };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const addItemInCart = async (path, body) => {
  console.log(config.baseURL + path);
  console.log("getToken", getToken());
  const token = getToken();
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("addItemInCart", data);
    return { statusCode: data.success, data: data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};
const showCart = async (path, body) => {
  console.log(config.baseURL + path);
  console.log("showCart token", getToken());
  const token = getToken();
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("showCart", data);
    return { statusCode: data.success, data: data.data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const removeCartItem = async (path, body) => {
  console.log(config.baseURL + path);
  console.log("removeCart token", getToken());
  const token = getToken();
  try {
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    console.log("removeCart", data);
    return { statusCode: data.success, data: data.remainingCarts };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};



export const Api = {
  registerUser,
  loginUser,
  forgotPassword,
  LinkExpired,
  verifyToken,
  resetPassword,
  getAllProducts,
  updateProfile,
  getProfileData,
  resetSessionTimer,
  getDynamicList,
  getFeaturedProducts,
  getSearchProducts,
  getProductDetail,
  getRelatedDetail,
  getRecentlyAddedProducts,
  addItemInCart,
  showCart,
  removeCartItem
};
