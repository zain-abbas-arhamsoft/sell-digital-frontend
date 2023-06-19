import React, { useContext, useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
// import QuantityBox from '../common/QuantityBox';
import { Api } from "../../utils/Api";
import { removeCart, showCarts } from "../../utils/Endpoint";
const CartItem = (props) => {
  const { cartsLength } = useContext(cartContext);
  const { addItem, isDeletedItem } = useContext(cartContext);
  const { _id, info, quantity } = props;
  console.log("props...", props);
  console.log("props.productId", props?.productId);
  const { image, title, price } = props?.productId;
  const productId = props.productId._id;
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  console.log("_id", _id);
  console.log("image", image);
  console.log("price", price);
  console.log("_id", _id);
  console.log("productId", productId);
  const calculateCartItems = async () => {
    const { statusCode, data } = await Api.showCart(showCarts, {});
    if (statusCode === true) {
      console.log("data cart count", data);
      console.log("data.cartsCount", data.cartCount);
      //   setCartQuantity(data.cartCount)
      cartsLength(data.cartCount);
    }
  };
  // const { removeItem } = useContext(cartContext);
  const handleRemoveItem = async (_id) => {
    try {
      console.log("cartId", _id);
      const { statusCode, data } = await Api.removeCartItem(removeCart, {
        cartId: _id,
      });
      if (statusCode === true) {
        console.log("data remove", data);
        addItem(data);
        // isDeletedItem(true);
        setIsDeleting(false);
        setShowPopup(false);
        calculateCartItems();
      }
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
    }
  };
  const newPrice = displayMoney(price);
  console.log("newPrice", newPrice);
  const oldPrice = displayMoney(price);
  console.log("oldPrice", oldPrice);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPopup]);

  return (
    <>
      <div className="cart_item">
        <figure className="cart_item_img">
          <Link to={`/product-details/${productId}`}>
            <img
              src={image[0]}
              alt="product-img"
            />
          </Link>
        </figure>
        <div className="cart_item_info">
          <div className="cart_item_head">
            <h4 className="cart_item_title">
              <Link to={`/product-details/${productId}`}>{title}</Link>
            </h4>
            <div className="cart_item_del">
              <span onClick={() => setShowPopup(true)}>
                <TbTrash />
              </span>
              <div className="tooltip">Remove Item</div>
            </div>
          </div>

          <h2 className="cart_item_price">
            {price} &nbsp;
            <small>
              <del>{Number(price) + 100}</del>
            </small>
          </h2>

          {/* <QuantityBox itemId={_id} itemQuantity={quantity} /> */}
        </div>
      </div>
      {showPopup && (
        <div className="cart_popup">
          <div className="cart_popup_content">
            <h4>Are you sure you want to delete this cart item?</h4>
            <div className="cart_popup_actions">
              <button
                onClick={() => handleRemoveItem(_id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes"}
              </button>
              <button onClick={() => setShowPopup(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
