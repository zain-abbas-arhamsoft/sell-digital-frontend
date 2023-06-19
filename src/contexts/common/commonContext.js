import { createContext, useReducer } from "react";
import commonReducer from "./commonReducer";

// Common-Context
const commonContext = createContext();

// Initial State
const initialState = {
  isFormOpen: false,
  formUserInfo: "",
  isSearchOpen: false,
  searchResults: [],
};

// Common-Provider Component
const CommonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commonReducer, initialState);

  // Form actions
  const toggleForm = (toggle) => {
    return dispatch({
      type: "TOGGLE_FORM",
      payload: { toggle },
    });
  };

  const setFormUserInfo = (info) => {
    return dispatch({
      type: "SET_FORM_USER_INFO",
      payload: { info },
    });
  };

  // Search actions
  const toggleSearch = (toggle) => {
    console.log("toggle", toggle);
    return dispatch({
      type: "TOGGLE_SEARCH",
      payload: { toggle },
    });
  };

  const setSearchResults = (results) => {
    return dispatch({
      type: "SET_SEARCH_RESULTS",
      payload: { results },
    });
  };

  const setProductID = (productID) => {
    return dispatch({
      type: "SET_PRODUCT_ID",
      payload: { productID },
    });
  };

  // Context values
  const values = {
    ...state,
    toggleForm,
    setFormUserInfo,
    toggleSearch,
    setSearchResults,
    setProductID,
  };

  return (
    <commonContext.Provider value={values}>{children}</commonContext.Provider>
  );
};

export default commonContext;
export { CommonProvider };
