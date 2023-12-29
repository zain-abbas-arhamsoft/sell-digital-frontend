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
  }
};
const forgotPassword = async (path, body) => {
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
  }
};

const LinkExpired = async (path, body) => {

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
  }
};

const updateProfile = async (path, body) => {
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
  }
};

const getProfileData = async (path, body) => {
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
  }
};

const resetSessionTimer = async (path, body) => {
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
  }
};
const getDynamicList = async (path, body) => {
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
  }
};

const getFeaturedProducts = async (path, body) => {
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
  }
};

const getRecentlyAddedProducts = async (path, body) => {
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
  }
};
const getSearchProducts = async (path, body) => {
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
  }
};

const getProductDetail = async (path, body) => {
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
  }
};

const getRelatedDetail = async (path, body) => {
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
  }
};

const addItemInCart = async (path, body) => {
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
  }
};
const showCart = async (path, body) => {
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
  }
};

const removeCartItem = async (path, body) => {
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
