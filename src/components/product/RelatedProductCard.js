import React, { useContext } from "react";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import useActive from "../../hooks/useActive";
import { FaFacebook } from "react-icons/fa";
import commonContext from "../../contexts/common/commonContext";
import { Api } from "../../utils/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
addCartItem,showCarts
} from "../../utils/Endpoint";

const RelatedProductCard = (props) => {
  const { cartsLength } = useContext(cartContext);

  const { name } = props.category[0];
  const {
    _id,
    image,
    title,
    followers,
    description,
    price,
  } = props;
  const subCategoryTitle = props.subcategory[0]?.title;
  // console.log("props", props);
  // console.log("+++++++++++++++++++++++++++(((((( Category )))))+++++++++++++++++++++++++++++", name);

  const { active, handleActive, activeClass } = useActive(false);

  const calculateCartItems = async () => {
    const { statusCode, data } = await Api.showCart(
      showCarts,
      {}
    );
    if (statusCode === true) {
      console.log('data cart count',data)
      console.log('data.cartsCount',data.cartCount)
    //   setCartQuantity(data.cartCount)
      cartsLength(data.cartCount)
    }
  }


  const handleAddItem = async () => {
    if (!localStorage.getItem('E_COMMERCE_TOKEN')) {
      toast.error("please login to add item in cart");
      return;
    }
    console.log('_id',_id)
    handleActive(_id);
      setTimeout(() => {
          handleActive(false);
      }, 3000);
    const { statusCode, data } = await Api.addItemInCart(addCartItem, {
      productDetail: {
        _id,
        price,
        quantity: 1 // Set the desired quantity value
      }
    });
    if (statusCode === true) {
      console.log('data.cart', data.data)
      calculateCartItems()

      // addItem(data.data);
    }
  };

  // // handling Add-to-cart
  // const handleAddItem = () => {
  //     const item = { ...props };
  //     addItem(item);

  //     handleActive(id);

  //     setTimeout(() => {
  //         handleActive(false);
  //     }, 3000);
  // };

  // const newPrice = displayMoney(finalPrice);
  // const oldPrice = displayMoney(originalPrice);
  //   const handleImageClick = () => {
  //     // Perform any action you want with the productID when the image is clicked
  //     console.log('Product ID:', _id);
  //     setProductID(_id)
  //   };

  return (
    <>
      <div className={`card products_card social-account-color-hover ${name.toLowerCase()}`}>
        {/* <div className="social-media-icon">
          <span className="social-icon-style"><FaFacebook/></span>
        </div> */}
        <figure className={`social-account-color ${name.toLowerCase()} products_img`} style={{ height: "180px" }}  // Add click event handler
        >
          <Link to={`/product-details/${_id}`}>
            <div>
              <img className="rounded-img" src={image[0]} />
            </div>
          </Link>
        </figure>

        <div className="products_details">
          {/* <span className="rating_star">
                        {
                            [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                        }
                    </span> */}
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
            onClick={() => { handleAddItem() }}
          // onClick={handleAddItem}
          >
            {/* {active ? 'Added' : 'Add to cart'} */}
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default RelatedProductCard;
