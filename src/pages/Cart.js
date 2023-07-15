import React, { useContext } from "react";
import { BsCartX } from "react-icons/bs";
import { calculateTotal, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import { showCarts } from "../utils/Endpoint";
import { Api } from "../utils/Api";
import { useEffect, useState } from "react";
const Cart = () => {
  useDocTitle("Cart");
  const { cartItems } = useContext(cartContext);
  const { cartsLength } = useContext(cartContext);
  const [carts, setCarts] = useState([]);
  const cartQuantity = carts.length;
  const calculateCartTotal = calculateTotal(carts);
  const displayCartTotal = displayMoney(calculateCartTotal);
  const displayTotalAmount = displayMoney(calculateCartTotal);

  const renderCarts = async () => {
    const { statusCode, data } = await Api.showCart(showCarts, {});
    if (statusCode === true) {
      setCarts(data.carts);
    }
  };
  const calculateCartItems = async () => {
    const { statusCode, data } = await Api.showCart(showCarts, {});
    if (statusCode === true) {
      cartsLength(data.cartCount);
    }
  };

  useEffect(() => {
    renderCarts();
    calculateCartItems();
  }, []); // Add cartItems as a dependency for the effect

  useEffect(() => {
    setCarts(cartItems);
  }, [cartItems]);
  return (
    <>
      <section id="cart" className="section">
        <div className="container">
          {carts.length === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Your Cart is Empty"
              link="/"
              btnText="Start Shopping"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              {/* cart_left_col */}
              <div className="">
                {carts.length > 0 &&
                  carts.map((item) => <CartItem key={item._id} {...item} />)}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>
                    Order Summary &nbsp; ( {cartQuantity}{" "}
                    {cartQuantity > 1 ? "items" : "item"} )
                  </h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Original Price</span>
                      <b>{displayCartTotal}</b>
                    </div>
                    <div className="discount">
                      <span>Discount</span>
                      <b>0</b>
                    </div>
                    <div className="delivery">
                      <span>Delivery</span>
                      <b>Free</b>
                    </div>
                    <div className="separator"></div>
                    <div className="total_price">
                      <b>
                        <small>Total Price</small>
                      </b>
                      <b>{displayTotalAmount}</b>
                    </div>
                  </div>
                  <button type="button" className="btn checkout_btn">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
