import { config } from "./config";
import { getToken } from "../utils/localstorage";

const registerUser = async (path, body) => {
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
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const loginUser = async (path, body) => {
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
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const forgotPassword = async (path, body) => {
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
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const LinkExpired = async (path, body) => {
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
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const verifyToken = async (path, body) => {
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
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const resetPassword = async (path, body) => {
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
    return { statusCode: data.success, data };
  } catch (e) {
    console.log(`error in post Request (${path}) :- `, e);
  }
};
const getAllProducts = async (path, body) => {
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(config.baseURL + path, params);
    const data = await res.json();
    return { statusCode: data.success, data: data.obj };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const updateProfile = async (path, body) => {
  console.log(config.baseURL + path);
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
    return { statusCode: data.success, data: data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const getProfileData = async (path, body) => {
  console.log(config.baseURL + path);
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
    console.log('data resetSessionTimer',data)
    return { statusCode: data.success };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};
const getDynamicList = async (path, body) => {
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
    return { statusCode: data.success, data: data.dynamicData };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const getFeaturedProducts = async (path, body) => {
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
    return { statusCode: data.success, data: data.recentlyAddedProducts };
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
    return { statusCode: data.success, data: data.relatedProducts };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};

const addItemInCart = async (path, body) => {
  console.log(config.baseURL + path);
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
    return { statusCode: data.success, data: data };
  } catch (e) {
    console.log(`error  post Request (${path}) :- `, e);
  }
};
const showCart = async (path, body) => {
  console.log(config.baseURL + path);
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

const removeCartItem = async (path, body) => {
  console.log(config.baseURL + path);
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
