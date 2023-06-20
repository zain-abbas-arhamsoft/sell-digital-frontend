import React, { useContext } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../contexts/cart/cartContext";
import useActive from "../../hooks/useActive";
import { Api } from "../../utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCartItem, showCarts } from "../../utils/Endpoint";

const RelatedProductCard = (props) => {
  const { cartsLength } = useContext(cartContext);
  const { name } = props.category[0];
  const { _id, image, title, followers, description, price } = props;
  const subCategoryTitle = props.subcategory[0]?.title;
  const { handleActive, activeClass } = useActive(false);
  const calculateCartItems = async () => {
    const { statusCode, data } = await Api.showCart(showCarts, {});
    if (statusCode === true) {
      cartsLength(data.cartCount);
    }
  };
  const handleAddItem = async () => {
    if (!localStorage.getItem("E_COMMERCE_TOKEN")) {
      toast.error("please login to add item in cart");
      return;
    }
    handleActive(_id);
    setTimeout(() => {
      handleActive(false);
    }, 3000);
    const { statusCode } = await Api.addItemInCart(addCartItem, {
      productDetail: {
        _id,
        price,
        quantity: 1, // Set the desired quantity value
      },
    });
    if (statusCode === true) {
      calculateCartItems();
    }
  };

  return (
    <>
      <div
        className={`card products_card social-account-color-hover ${name.toLowerCase()}`}
      >
        <figure
          className={`social-account-color ${name.toLowerCase()} products_img`}
          style={{ height: "180px" }} // Add click event handler
        >
          <Link to={`/product-details/${_id}`}>
            <div>
              <img className="rounded-img" src={image[0]} />
            </div>
          </Link>
        </figure>

        <div className="products_details">
          <p className="subCategory-style">{subCategoryTitle}</p>
          <h3 className="products_title">
            <Link to={`${_id}`}>{title}</Link>
          </h3>
          <h5 className="products_desc">{description}</h5>
          <div className="separator"></div>
          <h4 className="products_follwers">{`${followers} Followers`}</h4>
          <br></br>
          <h3 className="products_price">
            {`${price}    `}
            <small>
              <del>{`${Number(price) + 100} PKR`}</del>
            </small>
          </h3>
          <button
            type="button"
            className={`btn products_btn ${activeClass(_id)}`}
            onClick={() => {
              handleAddItem();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default RelatedProductCard;
