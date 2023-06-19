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
const SocialAccountsColors = Object.freeze({
  Youtube: '#FF0000',
  Facebook: '#3b5998',
  Twitter: '#00acee',
  Instagram: 'linear-gradient(-45deg, #FEDA77,#F58529, #DD2A7B,  #8134AF, #515DB4)',
  Tiktok: 'linear-gradient(-45deg, #010101, #514848, #62bac1, #EE1d52, rgb(219, 161, 161))',
  SnackVideo: ''
});

const ProductCard = (props) => {
  //  console.log("myprops......", props);
  const { cartsLength } = useContext(cartContext);
  const {setProductID} = useContext(commonContext)
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
  console.log('productImage?',productImage)
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

  const handleAddItem = async (productID) => {
    if (!localStorage.getItem('E_COMMERCE_TOKEN')) {
      toast.error("please login to add item in cart");
      return;
    }
    console.log('productID',productID)
    handleActive(productID);
    setTimeout(() => {
        handleActive(false);
    }, 3000);
   
    const { statusCode, data } = await Api.addItemInCart(addCartItem, {
      productDetail: {
        _id:productID,
        price:productPrice,
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
  const handleImageClick = () => {
    // Perform any action you want with the productID when the image is clicked
    console.log('Product ID:', productID);
    setProductID(productID)
  };

  return (
    <>
      <div className={`card products_card social-account-color-hover ${name.toLowerCase()}`}>
        {/* <div className="social-media-icon">
          <span className="social-icon-style"><FaFacebook/></span>
        </div> */}
        <figure className={`social-account-color ${name.toLowerCase()} products_img`} style={{ height: "180px"}} onClick={handleImageClick} // Add click event handler
>
          <Link to={`/product-details/${productID}`}>
          <div>
          <img className="rounded-img" src={productImage[0]} />
          </div>
          </Link>
        </figure>

        <div className="products_details">
          {/* <span className="rating_star">
                        {
                            [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                        }
                    </span> */}
          <p className="subCategory-style link-color">#{title}</p>
          <h3 className="products_title">
            <Link to={`${productID}`}>{productName}</Link>
          </h3>
          <h5 className="products_desc">{productDescription}</h5>
          <div className="separator"></div>
          
          <h4 className="products_follwers">{`${productFollowers/1000}K Followers`}</h4>
          <br></br>
          <h3 className="products_price">
            {`${productPrice}    `}
            <small className="del-text-color">
              <del className="del-text-color">{`${Number(productPrice) + 100}`}</del>
              {` PKR`}
            </small>
          </h3>
          <button
            type="button"
            className={`btn products_btn ${activeClass(productID)}`}
            onClick={() => { handleAddItem(productID) }}
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

export default ProductCard;
