import React, { useContext } from "react";
import { Link } from "react-router-dom";
import cartContext from "../../contexts/cart/cartContext";
import useActive from "../../hooks/useActive";
import commonContext from "../../contexts/common/commonContext";
import { Api } from "../../utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCartItem, showCarts } from "../../utils/Endpoint";

const ProductCard = (props) => {
  const { cartsLength } = useContext(cartContext);
  const { setProductID } = useContext(commonContext);
  const { name } = props;
  const {
    productID,
    productImage,
    productName,
    productFollowers,
    productDescription,
    productPrice,
  } = props.products;
  const { title } = props.products.subcategory;
  const { handleActive, activeClass } = useActive(false);

  const calculateCartItems = async () => {
    const { statusCode, data } = await Api.showCart(showCarts, {});
    if (statusCode === true) {
      cartsLength(data.cartCount);
    }
  };

  const handleAddItem = async (productID) => {
    if (!localStorage.getItem("E_COMMERCE_TOKEN")) {
      toast.error("please login to add item in cart");
      return;
    }
    handleActive(productID);
    setTimeout(() => {
      handleActive(false);
    }, 3000);

    const { statusCode } = await Api.addItemInCart(addCartItem, {
      productDetail: {
        _id: productID,
        price: productPrice,
        quantity: 1, // Set the desired quantity value
      },
    });
    if (statusCode === true) {
      calculateCartItems();
    }
  };
  
  const handleImageClick = () => {
    // Perform any action you want with the productID when the image is clicked
    setProductID(productID);
  };

  return (
    <>
      <div
        className={`card products_card social-account-color-hover ${name.toLowerCase()}`}
      >
        <figure
          className={`social-account-color ${name.toLowerCase()} products_img`}
          style={{ height: "180px" }}
          onClick={handleImageClick} // Add click event handler
        >
          <Link to={`/product-details/${productID}`}>
            <div>
              <img className="rounded-img" src={productImage[0]} alt="" />
            </div>
          </Link>
        </figure>

        <div className="products_details">
          <p className="subCategory-style link-color">#{title}</p>
          <h3 className="products_title">
            <Link to={`${productID}`}>{productName}</Link>
          </h3>
          <h5 className="products_desc">{productDescription}</h5>
          <div className="separator"></div>

          <h4 className="products_follwers">{`${
            productFollowers / 1000
          }K Followers`}</h4>
          <br></br>
          <h3 className="products_price">
            {`${productPrice}    `}
            <small className="del-text-color">
              <del className="del-text-color">{`${
                Number(productPrice) + 100
              }`}</del>
              {` PKR`}
            </small>
          </h3>
          <button
            type="button"
            className={`btn products_btn ${activeClass(productID)}`}
            onClick={() => {
              handleAddItem(productID);
            }}
          >
           
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
