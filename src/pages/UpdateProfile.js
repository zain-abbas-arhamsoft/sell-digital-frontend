import React, { useState, useEffect, useRef } from "react";
import "./UpdateProfile.css";
import { Api } from "../utils/Api";
import { updateProfileEndpoint,getProfileDataEndpoint } from "../utils/Endpoint";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateProfilePage = () => {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNumberRef = useRef();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const phone = phoneNumberRef.current.value;
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    console.log("email", email);
    console.log("firstName", firstName);
    console.log("lastName", lastName);
    console.log("phone", phone);
    console.log("currentPassword", currentPassword);
    console.log("newPassword", newPassword);
    console.log("confirmPassword", confirmPassword);

    const { statusCode, data } = await Api.updateProfile(
      updateProfileEndpoint,
      {
        firstName,
        lastName,
        phone,
        currentPassword:currentPassword,
        newPassword:newPassword,
        confirmPassword:confirmPassword
      }
    );

    console.log("updateProfile data", data);
    console.log("statusCode", statusCode);
    if (statusCode === false) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  };
  useEffect(()=>{
    async function fillFields(){
    const { statusCode, data } = await Api.getProfileData(
        getProfileDataEndpoint,
        {
        }
      );
      const { email, firstName, lastName, phone } = data;

      emailRef.current.value = email;
      firstNameRef.current.value = firstName;
      lastNameRef.current.value = lastName;
      phoneNumberRef.current.value = phone;
      console.log("getProfileData data", data);
      console.log("statusCode", statusCode);
      if (statusCode === false) {
        toast.error(data.message);
      } else {
      }
    }

      fillFields()
  },[])
  return (
    <>
      <div className="update-profile-page">
        <div className="gray-section">
          <h2 className="update-profile-heading">Update Profile</h2>
          <div className="form-group">
            <div className="form-row">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                disabled
                className="form-input disabled"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                //   onChange={handleChange}
                ref={emailRef}
                // value={emailRef}
              />
            </div>
            <div className="form-row name-fields">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                className="form-input"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                ref={firstNameRef}
              />
            </div>
            <div className="form-row name-fields">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="form-input"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                ref={lastNameRef}
              />
            </div>

            <div className="form-row">
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="form-input"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                ref={phoneNumberRef}
              />
            </div>
            <div className="password-section">
              <h2 className="password-heading">Change Password</h2>
              <div className="form-row">
                <label className="form-label" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  className="form-input"
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter your current password"
                  ref={currentPasswordRef}
                />
              </div>
              <div className=" password-fields">
                <div className="half-width">
                  <label className="form-label same-line" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter your new password"
                    ref={newPasswordRef}
                  />
                </div>
                <div className="half-width">
                  <label
                    className="form-label same-line"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    ref={confirmPasswordRef}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProfilePage;
