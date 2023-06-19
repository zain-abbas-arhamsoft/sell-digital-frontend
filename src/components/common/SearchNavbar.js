import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiFillCheckCircle,
  AiFillCheckSquare,
  AiOutlineCheckCircle,
  AiOutlineCheckSquare,
  AiOutlineCheck,
  AiTwotoneCheckCircle,
  AiTwotoneCheckSquare,
  AiOutlineDelete,
  AiOutlineClear,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { dropdownMenu } from "../../data/headerData";
import commonContext from "../../contexts/common/commonContext";
import cartContext from "../../contexts/cart/cartContext";
import AccountForm from "../form/AccountForm";
import SearchBar from "./SearchBar";
import "./SearchNavbar.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Api } from "../../utils/Api";
import {
  dynamicCategoryEndpoint,
  searchedEndpoint,
  getAllProductEndpoint,
} from "../../utils/Endpoint";
// import commonContext from "../../contexts/common/commonContext";
const SearchNavbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { cartItems } = useContext(cartContext);
  const { cartLength } = useContext(cartContext);
  console.log('cartLength...', cartLength)
  const cartQuantity = cartItems.length;
  console.log('cartQuantity', cartQuantity)
  const { setSearchResults, toggleSearch } = useContext(commonContext);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [followersOptions, setFollowersOptions] = useState([]);
  const searchInputRef = useRef(null);
  const [searchedProduct, setSearchedProduct] = useState([]);

  const searchTextRef = useRef("");
  const selectedCategoryRef = useRef("Category");
  const selectedSubCategoryRef = useRef("SubCategory");
  const selectedPriceRef = useRef("Price");
  const selectedFollowersRef = useRef("Followers");
  // const [searchText, setSearchText] = useState("");
  const [checkSearch, setCheckSearch] = useState();

  const handleInputChange = (e) => {
    console.log("e.target.value", e.target.value);
    searchTextRef.current = e.target.value;
  };

  const handleClearSearch = async () => {
    console.log("handleClearSearch");
    selectedCategoryRef.current = "Category";
    selectedSubCategoryRef.current = "SubCategory";
    selectedPriceRef.current = "Price";
    selectedFollowersRef.current = "Followers";
    searchInputRef.current.value = "";
    const { statusCode, data } = await Api.getAllProducts(
      getAllProductEndpoint,
      {}
    );
    console.log("View handle clear search data", data);
    if (statusCode === true) {
      setSearchResults(data);
      toggleSearch(false);
    }
  };

  const handleSearch = async () => {
    // console.log("selectedCategory", selectedCategoryRef.current);
    // console.log("selectedSubCategory", selectedSubCategoryRef.current);
    // console.log("selectedPrice", selectedPriceRef.current);
    // console.log("selectedFollowers", selectedFollowersRef.current);
    console.log("searchTextRef.current", searchTextRef.current);
    if (
      selectedCategoryRef.current === "Category" &&
      selectedSubCategoryRef === "SubCategory" &&
      selectedPriceRef === "Price" &&
      selectedFollowersRef === "Followers"
    ) {
      return;
    }

    let lowPrice = null;
    let highPrice = null;
    let lowRange = null;
    let highRange = null;
    if (selectedPriceRef.current === "Under 1000") {
      highPrice = 1000;
      lowPrice = 0;
    } else if (selectedPriceRef.current) {
      const priceRange = selectedPriceRef.current.split("-");
      if (priceRange.length === 2) {
        lowPrice = priceRange[0];
        highPrice = priceRange[1];
      }
    }

    if (selectedFollowersRef.current === "Under 1000") {
      highRange = 1000;
      lowRange = 0;
    } else if (selectedFollowersRef.current) {
      const followerRange = selectedFollowersRef.current.split("-");
      if (followerRange.length === 2) {
        lowRange = followerRange[0];
        highRange = followerRange[1];
      }
    }

    const parameters = {
      category:
        selectedCategoryRef.current !== null &&
          selectedCategoryRef.current !== "Category"
          ? selectedCategoryRef.current
          : null,
      subCategory:
        selectedSubCategoryRef.current !== null &&
          selectedSubCategoryRef.current !== "SubCategory"
          ? selectedSubCategoryRef.current
          : null,
      lowPrice: lowPrice !== null && lowPrice !== "Price" ? lowPrice : null,
      highPrice: highPrice !== null && highPrice !== "Price" ? highPrice : null,

      lowRange: lowRange !== null && lowRange !== "Followers" ? lowRange : null,
      highRange: highRange !== null && highRange !== "Followers" ? highRange : null,
      // followers:
      //   selectedFollowersRef.current !== null &&
      //   selectedFollowersRef.current !== "Followers"
      //     ? selectedFollowersRef.current
      //     : null,
      searchText:
        searchTextRef.current !== null && searchTextRef.current !== ""
          ? searchTextRef.current
          : null,
    };
    const queryParameters = new URLSearchParams(Object.entries(parameters));
    // console.log("queryParameters", queryParameters);
    console.log("api called", `${searchedEndpoint}?${queryParameters}`);
    const { statusCode, data } = await Api.getSearchProducts(
      `${searchedEndpoint}?${queryParameters}`,
      {}
    );

    if (statusCode === true) {
      setSearchResults(data.products);
      toggleSearch(data.allProductsFetched);
    }
  };

  const dynamicDropDown = async () => {
    const { statusCode, data } = await Api.getDynamicList(
      dynamicCategoryEndpoint,
      {}
    );
    // console.log("Dynamic Category data", data);
    if (statusCode === true) {
      const categoryOpts = [
        "Category",
        ...data?.categoriesName.map((option) => option.name),
      ];
      // console.log("categoryOptions", categoryOptions);
      const subCategoryOpts = [
        "SubCategory",
        ...data?.subCategoriesTitle.map((option) => option.title),
      ];
      // console.log("subCategoryOptions", subCategoryOptions);
      const priceOpts = [
        "Price",
        "Under 1000",
        ...data?.priceRanges.map((option) => option),
        // "Price",
        // ...data?.priceRanges
        // .map((option) => option.price),
      ];
      // console.log("priceOptions", priceOptions);
      const followersOpts = [
        "Followers",
        "Under 1000",
        ...data?.followerRanges.map((option) => option),
      ];
      // console.log("followersOptions", followersOptions);
      setCategoryOptions(categoryOpts);
      setSubCategoryOptions(subCategoryOpts);
      setPriceOptions(priceOpts);
      setFollowersOptions(followersOpts);
    }
  };
  useEffect(() => {
    dynamicDropDown();
    const handleScroll = () => {
      const navbar = document.getElementById("second-navbar");
      const navbarOffsetTop = navbar.offsetTop;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > navbarOffsetTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const categoryDefaultOption =
  //   categoryOptions.length > 0 ? categoryOptions[0] : null;
  // console.log("categoryDefaultOption", categoryDefaultOption);
  // console.log("selectedCategoryRef.current", selectedCategoryRef.current);
  // const subCategoryDefaultOption =
  //   subCategoryOptions.length > 0 ? subCategoryOptions[0] : null;
  // const priceDefaultOption = priceOptions.length > 0 ? priceOptions[0] : null;
  // const followersDefaultOption =
  //   followersOptions.length > 0 ? followersOptions[0] : null;

  return (
    <nav id="second-navbar" className={`${isSticky ? "sticky" : ""}`}>
      <header id="searchNavbar">
        <div className="container">
          <nav className="second-nav">
            <div className="small-portion"></div>
            <div className="big-potion">
              <div className="cart_action item-hover ">
                <Dropdown
                  options={categoryOptions}
                  onChange={(option) =>
                    (selectedCategoryRef.current = option.value)
                  }
                  value={selectedCategoryRef.current} // selectedCategoryRef.current
                // placeholder="Select an option"
                />
              </div>

              <div className="cart_action item-hover ">
                <Dropdown
                  options={subCategoryOptions}
                  onChange={(option) =>
                    (selectedSubCategoryRef.current = option.value)
                  }
                  value={selectedSubCategoryRef.current} // selectedSubCategoryRef.current
                // placeholder="Select an option"
                />
              </div>

              <div className="cart_action item-hover ">
                <Dropdown
                  options={followersOptions}
                  onChange={(option) =>
                    (selectedFollowersRef.current = option.value)
                  }
                  value={selectedFollowersRef.current} // selectedFollowersRef.current
                // placeholder="Select an option"
                />
              </div>

              <div className="cart_action item-hover">
                <Dropdown
                  options={priceOptions}
                  onChange={(option) =>
                    (selectedPriceRef.current = option.value)
                  }
                  value={selectedPriceRef.current} // selectedFollowersRef.current
                // placeholder="Select an option"
                />
              </div>

              <div className="search-bar">
                <div className="search-bar-wrapper">
                  <input
                    type="text"
                    placeholder="Search here"
                    defaultValue={searchTextRef.current}
                    onChange={handleInputChange}
                    ref={searchInputRef}
                  // type="text"
                  // placeholder="Search here"
                  // value={searchText}
                  //  ref={searchTextRef}
                  // onChange={(option) =>
                  //   (searchTextRef.current = option.value)
                  // }
                  // defaultValue={searchTextRef.current}
                  // onChange={handleInputChange}
                  />
                  {/* {searchText && (
                    <button
                      className="clear-button"
                      // onClick={handleClearSearch}
                    >
                      <AiOutlineDelete />
                    </button>
                  )} */}
                </div>
                <button className="search-button" onClick={handleSearch}>
                  Search
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn"
                  onClick={handleClearSearch}
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div
              className="cart_action Icon-props item-hover small-portion"
              style={{ "font-size": "2rem" }}
            >
              {/* <Link to="/cart">
                <AiOutlineShoppingCart />
                {cartQuantity > 0 && (
                  <span className="badge">{cartQuantity}</span>
                )}
              </Link> */}
              {localStorage.getItem('E_COMMERCE_TOKEN') && (
                <Link to="/cart">
                  <AiOutlineShoppingCart />
                  {cartLength > 0 && (
                    <span className="badge">{cartLength}</span>
                  )}
                </Link>
              )}

              {/* <div className="tooltip">Cart</div> */}
            </div>
          </nav>
        </div>
      </header>
    </nav>
  );
};

export default SearchNavbar;
