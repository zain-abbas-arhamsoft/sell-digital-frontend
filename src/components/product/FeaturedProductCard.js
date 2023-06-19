import React, { useContext } from "react";
import { IoIosPricetags, IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import cartContext from "../../contexts/cart/cartContext";
import useActive from "../../hooks/useActive";

const FeaturedProductCard = (props) => {
  // console.log("props...");
  const { name } = props.categoryId;
  const { _id, image, title, followers, description, price } = props;
  const subcategoryTitle = props.subCategoryId.title;
  // console.log("props", props);
  const { active, handleActive, activeClass } = useActive(false);
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

  return (
    <>
      <div className="card products_card">
        <figure className="products_img" style={{ height: "160px" }}>
          {/* <Link to={`${productID}`}> */}
          <Link to={`/product-details/${_id}`}>
          <img src={`http://localhost:8083/images/${image[0]}`} />
          </Link>
        </figure>
        <div className="products_details">
          {/* <span className="rating_star">
                        {
                            [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                        }
                    </span> */}
          <p className="subCategory-style">{subcategoryTitle}</p>
          <h3 className="products_title">
            <Link to={`${_id}`}>{title}</Link>
          </h3>
          <h5 className="products_info">{description}</h5>
          <div className="separator"></div>
          <h4 className="products_follwers">{`${followers} Follwers`}</h4>
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

export default FeaturedProductCard;
