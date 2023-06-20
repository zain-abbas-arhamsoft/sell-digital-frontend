import React, { useContext, useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import cartContext from "../../contexts/cart/cartContext";
import { Api } from "../../utils/Api";
import { removeCart, showCarts } from "../../utils/Endpoint";
const CartItem = (props) => {
  const { cartsLength } = useContext(cartContext);
  const { addItem } = useContext(cartContext);
  const { _id } = props;
  const { image, title, price } = props?.productId;
  const productId = props.productId._id;
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const calculateCartItems = async () => {
    const { statusCode, data } = await Api.showCart(showCarts, {});
    if (statusCode === true) {
      cartsLength(data.cartCount);
    }
  };
  const handleRemoveItem = async (_id) => {
    try {
      const { statusCode, data } = await Api.removeCartItem(removeCart, {
        cartId: _id,
      });
      if (statusCode === true) {
        addItem(data);
        setIsDeleting(false);
        setShowPopup(false);
        calculateCartItems();
      }
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
    }
  };

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
