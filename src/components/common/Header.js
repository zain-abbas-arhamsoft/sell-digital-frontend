import React, { useContext, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineUserAdd,
} from "react-icons/ai";
// import { dropdownMenu } from "../../data/headerData";
import commonContext from "../../contexts/common/commonContext";
import cartContext from "../../contexts/cart/cartContext";
import AccountForm from "../form/AccountForm";
import SearchBar from "./SearchBar";
import SearchNavbar from "./SearchNavbar";
import "./Header.css";
import { getToken ,removeToken} from "../../utils/localstorage"; // Import getToken function
const Header = () => {
  
  const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
  const { cartItems } = useContext(cartContext);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate()
  const token = getToken(); // Get the token from localStorage
  console.log("token", token);

  const handleLogout = () => {
    removeToken(); // Remove the token from localStorage
    toggleForm(false); // Reset formUserInfo to false
    // navigate("/")
    console.log('formUserInfo',formUserInfo)
  };
  console.log('formUserInfo',formUserInfo)

  // handle the sticky-header
  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

    window.addEventListener("scroll", handleIsSticky);

    return () => {
      window.removeEventListener("scroll", handleIsSticky);
    };
  }, []);

  const cartQuantity = cartItems.length;

  return (
    <>
      <header id="header" >
        <div className="container light-color">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link to="/">Sell Digital</Link>
            </h2>
            <nav className="nav_actions">
              <div className="cart_action item-hover">
                <Link to="/reset-pass">
                  <p>About Us</p>
                </Link>
              </div>

              <div className="cart_action item-hover">
                <Link to="/cart">
                  <p>Contact Us</p>
                </Link>
              </div>

              
{token ? ( // Render Logout button if token exists
                <div className="cart_action item-hover">
                  <Link to="/"  onClick={handleLogout}>
                    <AiOutlineLock />
                    <span>Logout</span>
                  </Link>
                </div>
              ) : (
                <div className="cart_action item-hover">
                  {!formUserInfo && (
                    <button type="button" onClick={() => toggleForm(true)}>
                      Login / Signup
                    </button>
                  )}
                </div>
              )}

              {/* <div className="user_action Icon-props item-hover">
                <span>
                  <AiOutlineUser />
                </span>
                <div className="dropdown_menu">
                  <h4>
                    Hello!{" "}
                    {formUserInfo && <Link to="*">&nbsp;{formUserInfo}</Link>}
                  </h4>
                  <p>Access/ edit account details and manage your orders</p>
                  <div className="separator"></div>
                  <ul>
                    {dropdownMenu.map((item) => {
                      const { id, link, path } = item;
                      return (
                        <li key={id}>
                          <Link to={path}>{link}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div> */}
{token ? (
              <div className="cart_action item-hover Icon-props">
                <Link to="/update-profile">
                  <p><AiOutlineUser /></p>
                </Link>
              </div>
              ) : ""
}
            
            </nav>
          </div>
        </div>
      </header>
      {/* <SearchBar /> */}
      <AccountForm />
    </>
  );
};

export default Header;
