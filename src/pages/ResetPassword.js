import React, {  useEffect } from "react";
import {  useNavigate, useLocation } from "react-router-dom";
import useForm from "../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Api } from "../utils/Api";
import { linkExpiredEndpoint,verifyTokenEndpoint } from "../utils/Endpoint";

const ResetPassword = () => {
    const navigate = useNavigate()
  const location = useLocation();
  const { inputValues, handleInputValues, handleFormSubmit } = useForm(
    useNavigate(),
    location,
    // () => {
    //   // Redirect callback function
    // }
  );

  const isLinkExpired = async (timestamp) => {
    const { statusCode, data } = await Api.LinkExpired(linkExpiredEndpoint, {
      timestamp,
    });
    if (statusCode === false) {
      console.log("data.message", data.message);
      await toast.error(data.message);
      navigate("/");
      // return;
    }
    console.log("statusCode", statusCode);
    console.log("data", data);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const timestamp = params.get("timestamp");
    const token = params.get("token");
    const id = localStorage.getItem("ID");
    isLinkExpired(timestamp);
    async function verifyToken() {
        const { statusCode } = await Api.verifyToken(
            verifyTokenEndpoint,
          {
            token,
            id,
          }
        );
        if (statusCode === false) {
          console.log("statusCode verify Token", statusCode);
        //   navigate("/");
        //   return;
        }
      }
      if (token) {
        verifyToken();
      }
  }, []);

  return (
    <>
      <ToastContainer />
      {/* {isFormOpen && ( */}
      <div>
        <div className="light-color">
          <div className="modal_centered">
            <form
              id="account_form"
              //   ref={formRef}
              onSubmit={(e) => handleFormSubmit(e, "resetPassword")}
            >
              {/*===== Form-Header =====*/}
              <div className="form_head">
                <h2>Reset Password</h2>
              </div>

              {/*===== Form-Body =====*/}
              <div className="form_body">
                <div className="input_box">
                  <input
                    type="password"
                    name="password"
                    className="input_field"
                    value={inputValues.password || ""}
                    onChange={handleInputValues}
                    required
                  />
                  <label className="input_label">Password</label>
                </div>

                <div className="input_box">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="input_field"
                    value={inputValues.confirmPassword || ""}
                    onChange={handleInputValues}
                    required
                  />
                  <label className="input_label">Confirm Password</label>
                </div>

                <div className="input_box">
                  <button type="submit" className="btn login_btn">
                    Reset Password
                  </button>
                </div>
              </div>


            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default React.memo(ResetPassword);
