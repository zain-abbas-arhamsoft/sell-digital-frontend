import React, { createContext, useReducer } from "react";
import cartReducer from "./cartReducer";

// Cart-Context
const cartContext = createContext();
// Initial State
const initialState = {
  cartItems: [],
  cartLength: 0,
//   deletedItem: false,
};
// Cart-Provider Component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // Dispatched Actions
  const addItem = (item) => {
    console.log("item", item);
    return dispatch({
      type: "ADD_TO_CART",
      payload: { item },
    });
  };

  const emptyArray = (item) => {
    console.log("emptyArray", item);
    return dispatch({
      type: "EMPTY_CART",
      payload: { item },
    });
  };

//   const isDeletedItem = (item) => {
//     return dispatch({
//       type: "DELETED_ITEM",
//       payload: { item },
//     });
//   };

  const cartsLength = (item) => {
    console.log("cartLength context", item);
    return dispatch({
      type: "CART_LENGTH",
      payload: { item },
    });
  };
  const removeItem = (itemId) => {
    return dispatch({
      type: "REMOVE_FROM_CART",
      payload: { itemId },
    });
  };

  const incrementItem = (itemId) => {
    return dispatch({
      type: "INCREMENT_ITEM",
      payload: { itemId },
    });
  };

  const decrementItem = (itemId) => {
    return dispatch({
      type: "DECREMENT_ITEM",
      payload: { itemId },
    });
  };

  // Context values
  const values = {
    ...state,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    emptyArray,
    cartsLength,
    // isDeletedItem,
  };

  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default cartContext;
export { CartProvider };
