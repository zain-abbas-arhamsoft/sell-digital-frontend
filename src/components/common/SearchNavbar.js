import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import commonContext from "../../contexts/common/commonContext";
import cartContext from "../../contexts/cart/cartContext";
import "./SearchNavbar.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Api } from "../../utils/Api";
import { getToken } from "../../utils/localstorage"; // Import getToken function
import {
  dynamicCategoryEndpoint,
  searchedEndpoint,
  getAllProductEndpoint,
} from "../../utils/Endpoint";

const SearchNavbar = () => {
  const { cartLength } = useContext(cartContext);
  const token = getToken(); // Get the token from localStorage
  const { setSearchResults, toggleSearch } = useContext(commonContext);
  const [options, setOptions] = useState({
    category: [],
    subCategory: [],
    price: [],
    followers: [],
  });
  const searchInputRef = useRef(null);
  const searchTextRef = useRef("");
  const selectedOptionsRef = useRef({
    category: "Category",
    subCategory: "SubCategory",
    price: "Price",
    followers: "Followers",
  });
  const handleInputChange = (e) => {
    searchTextRef.current = e.target.value;
  };
  const handleClearSearch = async () => {
    selectedOptionsRef.current = {
      category: "Category",
      subCategory: "SubCategory",
      price: "Price",
      followers: "Followers",
    };
    searchInputRef.current.value = "";
    const { statusCode, data } = await Api.getAllProducts(
      getAllProductEndpoint,
      {}
    );
    if (statusCode === true) {
      setSearchResults(data);
      toggleSearch(false);
    }
  };
  const handleSearch = async () => {
    const parameters = {
      category:
        selectedOptionsRef.current.category !== "Category"
          ? selectedOptionsRef.current.category
          : null,
      subCategory:
        selectedOptionsRef.current.subCategory !== "SubCategory"
          ? selectedOptionsRef.current.subCategory
          : null,
      price:
        selectedOptionsRef.current.price !== "Price"
          ? selectedOptionsRef.current.price
          : null,
      followers:
        selectedOptionsRef.current.followers !== "Followers"
          ? selectedOptionsRef.current.followers
          : null,
      searchText: searchTextRef.current !== "" ? searchTextRef.current : null,
    };
    const queryParameters = new URLSearchParams(Object.entries(parameters));
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
    if (statusCode === true) {
      const categoryOpts = [
        "Category",
        ...data?.categoriesName.map((option) => option.name),
      ];
      const subCategoryOpts = [
        "SubCategory",
        ...data?.subCategoriesTitle.map((option) => option.title),
      ];
      const priceOpts = [
        "Price",
        "Under 1000",
        ...data?.priceRanges.map((option) => option),
      ];
      const followersOpts = [
        "Followers",
        "Under 1000",
        ...data?.followerRanges.map((option) => option),
      ];
      setOptions({
        category: categoryOpts,
        subCategory: subCategoryOpts,
        price: priceOpts,
        followers: followersOpts,
      });
    }
  };

  useEffect(() => {
    dynamicDropDown();
  }, []);

  return (
    <nav id="second-navbar">
      <header id="searchNavbar">
        <div className="container">
          <nav className="second-nav">
            <div className="small-portion"></div>
            <div className="big-potion">
              <div className="cart_action item-hover ">
                <Dropdown
                  options={options.category}
                  onChange={(option) =>
                    (selectedOptionsRef.current.category = option.value)
                  }
                  value={selectedOptionsRef.current.category}
                />
              </div>

              <div className="cart_action item-hover ">
                <Dropdown
                  options={options.subCategory}
                  onChange={(option) =>
                    (selectedOptionsRef.current.subCategory = option.value)
                  }
                  value={selectedOptionsRef.current.subCategory}
                />
              </div>

              <div className="cart_action item-hover ">
                <Dropdown
                  options={options.followers}
                  onChange={(option) =>
                    (selectedOptionsRef.current.followers = option.value)
                  }
                  value={selectedOptionsRef.current.followers}
                />
              </div>

              <div className="cart_action item-hover">
                <Dropdown
                  options={options.price}
                  onChange={(option) =>
                    (selectedOptionsRef.current.price = option.value)
                  }
                  value={selectedOptionsRef.current.price}
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
                  />
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
              {token && (
                <Link to="/cart">
                  <AiOutlineShoppingCart />
                  {cartLength > 0 && (
                    <span className="badge">{cartLength}</span>
                  )}
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </nav>
  );
};

export default SearchNavbar;
