import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdStar, IoMdCheckmark } from "react-icons/io";
import { calculateDiscount, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import useActive from "../hooks/useActive";
import cartContext from "../contexts/cart/cartContext";
import productsData from "../data/productsData";
import SectionsHead from "../components/common/SectionsHead";
import RelatedSlider from "../components/sliders/RelatedSlider";
import ProductSummary from "../components/product/ProductSummary";
import Services from "../components/common/Services";
import commonContext from "../contexts/common/commonContext";
import { Api } from "../utils/Api";
import ProductCard from "../components/product/ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  productDetailEndpoint,
  relatedProductDetailEndpoint,
  addCartItem,
  showCarts
} from "../utils/Endpoint";
import RelatedProductCard from "../components/product/RelatedProductCard";
import useForm from "../hooks/useForm";
const ProductDetails = () => {
  useDocTitle("Product Details");
  const [productDetail, setProductDetail] = useState({});
  const [relatedProductDetail, setRelatedProductDetail] = useState([]);

  const [image, setImage] = useState([]);
  const [productId, setProductId] = useState();
  const { cartsLength } = useContext(cartContext);

  //   const { productID } = useContext(commonContext);
  //   console.log("productID usecontext", productID);
  //   const { handleActive, activeClass } = useActive(0);

  const { addItem } = useContext(cartContext);
  // const { handleActive, activeClass } = useActive(0);
  const { active, handleActive, activeClass } = useActive(false);

  const { productID } = useParams();
  console.log("productID", productID);
  // here the 'id' received has 'string-type', so converting it to a 'Number'
  // const prodId = parseInt(productId);

  // // showing the Product based on the received 'id'
  // const product = productsData.find(item => item.id === prodId);

  //    const { image } = productDetail?.product;
  // , title, info, category, finalPrice, originalPrice, ratings, rateCount
  const [previewImg, setPreviewImg] = useState(image[0]);


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
  // // handling Add-to-cart
  const handleAddItem = async (productDetail) => {
    if (!localStorage.getItem('E_COMMERCE_TOKEN')) {
      toast.error("please login to add item in cart");
      return;
    }
    console.log('productDetail._id',productDetail._id)
    handleActive(productDetail._id);
    setTimeout(() => {
        handleActive(false);
    }, 3000);
   
    const { statusCode, data } = await Api.addItemInCart(addCartItem, {
      productDetail: {
        ...productDetail,
        quantity: 1 // Set the desired quantity value
      }
    });
    if (statusCode === true) {
      console.log('data.cart', data.data)
      calculateCartItems()
      // addItem(data.data);
    }
  };

  // setting the very-first image on re-render
  useEffect(() => {
    setPreviewImg(image[0]);
    handleActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  // // handling Preview image
  const handlePreviewImg = (i) => {
    setPreviewImg(image[i]);
    handleActive(i);
  };

  // // calculating Prices
  // const discountedPrice = originalPrice - finalPrice;
  // const newPrice = displayMoney(finalPrice);
  // const oldPrice = displayMoney(originalPrice);
  // const savedPrice = displayMoney(discountedPrice);
  // const savedDiscount = calculateDiscount(discountedPrice, originalPrice);
  const getProductDetails = async () => {
    const { statusCode, data } = await Api.getProductDetail(
      `${productDetailEndpoint}${productID}`,
      {}
    );
    console.log("ProductDetail", data);
    if (statusCode === true) {
      setProductDetail(data);
      setImage(data.image);
    }
  };
  const getRelatedProducts = async () => {
    console.log("categoryId", productDetail?.categoryId._id);
    console.log("productId", productDetail?._id);
    const categoryId = productDetail.categoryId._id;
    const productId = productDetail._id;
    const { statusCode, data } = await Api.getRelatedDetail(
      relatedProductDetailEndpoint,
      {
        categoryId,
        productId,
      }
    );
    console.log("Related Products", data);
    if (statusCode === true) {
      setRelatedProductDetail(data);
      // setImage(data.image)
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [productID]);
  useEffect(() => {
    // setProductId(productID);
    // console.log('relatedProductDetail', relatedProductDetail)
    // // console.log('productDetail.image',productDetail?.image)
    // console.log('productDetail?.product', productDetail?.product)
    // console.log("productDetail...", productDetail);
    getRelatedProducts();
  }, [productDetail]);
  return (
    <>
      <section id="product_details" >
        <div className="container">
          <div className="wrapper prod_details_wrapper">
            {/*=== Product Details Left-content ===*/}
            <div className="prod_details_left_col">
              <div className="prod_details_tabs">
                {image &&
                  image.map((img, i) => (
                    <div
                      key={i}
                      className={`tabs_item ${activeClass(i)}`}
                      onClick={() => handlePreviewImg(i)}
                    >
                      <img
                        src={img}
                        alt="product-img"
                      />
                    </div>
                  ))}
              </div>
              <figure className="prod_details_img">
                <img
                  src={previewImg}
                  alt="product-img"
                />
              </figure>
            </div>

            {/*=== Product Details Right-content ===*/}
            <div className="prod_details_right_col">
              <h1 className="prod_details_title">{productDetail.title}</h1>
              <p className="prod_details_info">{productDetail.description}</p>

              <div className="prod_details_ratings">
                <h3>{productDetail.followers / 1000}K Followers</h3>
              </div>

              <div className="separator"></div>

              <div className="prod_details_price">
                <div className="price_box">
                  <h2 className="price">
                    {productDetail.price} &nbsp;
                    <small className="del_price">
                      <del>{productDetail.price + 100}</del>
                      {` PKR`}
                    </small>
                  </h2>
                  {/* <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p> */}
                  <span className="tax_txt">(Inclusive of all taxes)</span>
                </div>

                <div className="badge">
                  <span>
                    <IoMdCheckmark /> In Stock
                  </span>
                </div>
              </div>

              <div className="separator"></div>

              <div className="prod_details_offers">
                <h4>Offers and Discounts</h4>
                <br />
                <small>100Rs Discount on this Product</small>
              </div>

              <div className="separator"></div>

              <div className="prod_details_buy_btn">
                <button
                  type="button"
                  // className="btn"
                  className={`btn products_btn ${activeClass(productDetail._id)}`}
                  onClick={() => { handleAddItem(productDetail) }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <ProductSummary {...product} /> */}

      <section id="related_products" className="section">
        <div className="container">
          <SectionsHead heading="Related Products" />
          <div className="wrapper products_wrapper">
            {/* <RelatedSlider /> */}
            {relatedProductDetail.length > 0 &&
              relatedProductDetail.map((item) => (
                //<SwiperSlide key={item.id}>
                <RelatedProductCard key={item.id} {...item} />
                //</SwiperSlide>
              ))}
          </div>
        </div>
      </section>

      <Services />
    </>
  );
};

export default ProductDetails;
