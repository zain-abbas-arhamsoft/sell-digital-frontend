import { useContext, useState } from "react";
import commonContext from "../contexts/common/commonContext";
import cartContext from "../contexts/cart/cartContext";
import { Api } from "../utils/Api";
import { toast } from "react-toastify";
import { signupEndpoint, loginEndpoint } from "../utils/Endpoint";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import { setTokenID, setToken, removeID } from "../utils/localstorage";
import {
  forgotPasswordEndpoint,
  resetPasswordEndpoint,
} from "../utils/Endpoint";
const useForm = (redirectCallback) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useContext(cartContext);
  const { toggleForm, setFormUserInfo } = useContext(commonContext);
  const [inputValues, setInputValues] = useState({});

  // handling input-values
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  // handling form-submission
  const handleFormSubmit = async (e, actionType) => {
    console.log("actionType", actionType);
    e.preventDefault();
    setInputValues({});
    if (actionType === "signup") {
      const { statusCode, data } = await Api.registerUser(signupEndpoint, {
        email: inputValues.mail,
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        password: inputValues.password,
        confirmPassword: inputValues.confirmPassword,
      });


      console.log("register data", data);
      console.log("statusCode", statusCode);
      if (statusCode === false) {
        toast.error(data.message);
      } else {
        //setFormUserInfo(loggedUserInfo);
        toast.success(data.message);
        redirectCallback();
      }
    } else if (actionType === "login") {
      console.log("login");
      console.log("email", inputValues.email);
      console.log("password", inputValues.password);
      const { statusCode, data } = await Api.loginUser(loginEndpoint, {
        email: inputValues.mail,
        password: inputValues.password,
      });
      console.log("login data", data);
      console.log("statusCode", statusCode);


      if (statusCode === false) {
        toast.error(data.message);
      } else {
        toggleForm(false);
        // setFormUserInfo(loggedUserInfo);
        toast.success(data.message);
        addItem([])
        const { accessToken } = data.data;
        console.log("accessToken", accessToken);
        setToken(accessToken);
      }
    } else if (actionType === "forgotPassword") {
      console.log("forgotPassword");
      console.log("email", inputValues.email);
      const { statusCode, data } = await Api.loginUser(forgotPasswordEndpoint, {
        email: inputValues.mail,
      });
      console.log("login data", data);
      console.log("statusCode", statusCode);

      if (statusCode === false) {
        toast.error(data.message);
      } else {
        //   toggleForm(false)
        toast.success(data.message);
        const ID = data.data;
        console.log("ID", ID);
        setTokenID(ID);
      }
    } else if (actionType === "resetPassword") {
      console.log("resetPassword");
      console.log("password", inputValues.password);
      console.log("confirmPassword", inputValues.confirmPassword);
      if (inputValues.password !== inputValues.confirmPassword) {
        toast.error("Password and Confirm Password should match");
        setInputValues({});
        return;
      }
      if (inputValues.password.length <= 6) {
        toast.error("Password Length should be greater than 6");
        return;
      }
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const id = localStorage.getItem("ID");
      console.log("Token:", token);
      console.log("ID:", id);
      const { statusCode, data } = await Api.resetPassword(
        resetPasswordEndpoint,
        {
          password: inputValues.password,
          id,
          token,
        }
      );
      if (statusCode === false) {
        toast.error(data.message);
        return;
      }
      if (statusCode === true) {
        toast.success(data.message);
        removeID();
        navigate("/");
      }
    }
  };

  return { inputValues, handleInputValues, handleFormSubmit };
};

export default useForm;
