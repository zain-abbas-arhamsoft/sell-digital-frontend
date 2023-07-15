import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineDown,
  AiOutlineCaretDown,
  AiOutlineSearch,
  AiOutlineDelete,
} from "react-icons/ai";
import commonContext from "../../contexts/common/commonContext";
import cartContext from "../../contexts/cart/cartContext";
import Select from "react-select";

import "./SearchNavbar.css";
// import Dropdown from "react-dropdown";
// import "react-dropdown/style.css";
import { Api } from "../../utils/Api";
import { getToken } from "../../utils/localstorage"; // Import getToken function
import {
  dynamicCategoryEndpoint,
  searchedEndpoint,
  getAllProductEndpoint,
} from "../../utils/Endpoint";

// const options = [
//   { value: "option1", label: "Option 1 options of the year" },
//   { value: "option2", label: "Option 2" },
//   { value: "option3", label: "Option 3" },
// ];

const SearchNavbar = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedFollowers, setSelectedFollowers] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(item); // Replace with your desired action
    setIsOpen(false);
  };
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
    console.log('searchInputRef',searchInputRef.current)
    searchTextRef.current = ""; // Update the ref value directly
    searchInputRef.current.value = "";
    console.log('searchInputRef...',searchInputRef.current)
    const { statusCode, data } = await Api.getAllProducts(
      getAllProductEndpoint,
      {}
    );
    if (statusCode === true) {
      setSearchResults(data);
      toggleSearch(false);
    }
  };

  useEffect(() => {
    // Update selectedCategory state when selectedOptionsRef.current.category changes
    setSelectedCategory(selectedOptionsRef.current.category);
  }, [selectedOptionsRef.current.category]);

  useEffect(() => {
    // Update selectedSubCategory state when selectedOptionsRef.current.subCategory changes
    setSelectedSubCategory(selectedOptionsRef.current.subCategory);
  }, [selectedOptionsRef.current.subCategory]);

  useEffect(() => {
    // Update selectedFollowers state when selectedOptionsRef.current.followers changes
    setSelectedFollowers(selectedOptionsRef.current.followers);
  }, [selectedOptionsRef.current.followers]);

  useEffect(() => {
    // Update selectedPrice state when selectedOptionsRef.current.price changes
    setSelectedPrice(selectedOptionsRef.current.price);
  }, [selectedOptionsRef.current.price]);
  const handleSearch = async () => {
    console.log(
      "selectedOptionsRef.current.category",
      selectedOptionsRef.current.category
    );
    console.log('searchTextRef.current',searchTextRef.current)
    const parameters = {
      category:
        selectedOptionsRef.current.category.value !== "Category"
          ? selectedOptionsRef.current.category.value
          : null,
      subCategory:
        selectedOptionsRef.current.subCategory.value !== "SubCategory"
          ? selectedOptionsRef.current.subCategory.value
          : null,
      price:
        selectedOptionsRef.current.price.value !== "Price"
          ? selectedOptionsRef.current.price.value
          : null,
      followers:
        selectedOptionsRef.current.followers.value !== "Followers"
          ? selectedOptionsRef.current.followers.value
          : null,
      searchText: searchTextRef.current !== "" ? searchTextRef.current : null,
    };
    console.log("parameters", parameters);
    const queryParameters = new URLSearchParams(Object.entries(parameters));
    const { statusCode, data } = await Api.getSearchProducts(
      `${searchedEndpoint}?${queryParameters}`,
      {}
    );
    if (statusCode === true) {
      console.log("data.products", data.products);
      setSearchResults(data.products);
      toggleSearch(data.allProductsFetched);
    }
  };
  const dynamicDropDown = async () => {
    const { statusCode, data } = await Api.getDynamicList(
      dynamicCategoryEndpoint,
      {}
    );
    console.log("data", data);
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
      console.log("categoryOpts", categoryOpts);
      console.log("subCategoryOpts", subCategoryOpts);
      console.log("priceOpts", priceOpts);
      console.log("followersOpts", followersOpts);
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

  const dropdownStyles = {
    control: (provided) => ({
      ...provided,
      height: "45px",
      borderRadius: 0,
      boxShadow: "none",
      border: "1px solid #ccc",
      borderRadius: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      width: "max-content",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const [btnSt, setBtnSt] = useState(true);

  const handleClick = () => {
    console.log("ia m in handle toggle click");
    if (btnSt) {
      document.querySelector(".side_toggle span").classList.add("toggle");
      document.getElementById("side_sidebar").classList.add("side_sidebarshow");
      setBtnSt(false);
    } else {
      document.querySelector(".side_toggle span").classList.remove("toggle");
      document
        .getElementById("side_sidebar")
        .classList.remove("side_sidebarshow");
      setBtnSt(true);
    }
  };

  return (
    <>
      <nav id="second-navbar">
        <header id="searchNavbar">
          <div className="outer-padding">
            <nav className="second-nav">
              {/* <div className="small-portion1 site-title">
                {" "}
                <Link to="/">Sell Digital</Link>
              </div> */}
              <header style={{ display: "none" }}>
                <div>
                  <button
                    type="button"
                    className="side_toggle"
                    id="toggle"
                    onClick={handleClick}
                  >
                    <span></span>
                  </button>
                </div>
              </header>
              <div className="big-potion">
                <div className=" site-title">
                  {" "}
                  <Link to="/">Sell Digital</Link>
                </div>

                {/* <div className="cart_action item-hover ">
                <Dropdown
                  options={options.category}
                  onChange={(option) =>
                    (selectedOptionsRef.current.category = option.value)
                  }
                  value={selectedOptionsRef.current.category}
                />
              </div> */}

                {/* <div className="cart_action item-hover ">
                <Dropdown
                  options={options.subCategory}
                  onChange={(option) =>
                    (selectedOptionsRef.current.subCategory = option.value)
                  }
                  value={selectedOptionsRef.current.subCategory}
                />
              </div> */}

                {/* <div className="cart_action item-hover ">
                <Dropdown
                  options={options.followers}
                  onChange={(option) =>
                    (selectedOptionsRef.current.followers = option.value)
                  }
                  value={selectedOptionsRef.current.followers}
                />
              </div> */}
                {/* 
                <div className="cart_action item-hover">
                <Dropdown
                  options={options.price}
                  onChange={(option) =>
                    (selectedOptionsRef.current.price = option.value)
                  }
                  value={selectedOptionsRef.current.price}
                />
              </div> */}

                {/* <div style={{ width: "123px" }} className="display-none">
                  <Select
                  //  options={options.category}
                      options={options.category.map((value) => ({ value, label: value }))}
    onChange={(option) =>
      (selectedOptionsRef.current.category = option)
    }
                    // placeholder="Category"
                    isSearchable={false}
                    styles={dropdownStyles}
                    value={selectedOptionsRef.current.category}
                  />
                </div>

                <div style={{ width: "167px" }} className="display-none">
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    placeholder="SubCategory"
                    isSearchable={false}
                    styles={dropdownStyles}
                  />
                </div>

                <div style={{ width: "125px" }} className="display-none">
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    placeholder="Followers"
                    isSearchable={false}
                    styles={dropdownStyles}
                  />
                </div>

                <div style={{ width: "88px" }} className="display-none">
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    placeholder="Price"
                    isSearchable={false}
                    styles={dropdownStyles}
                  />
                </div>

                <div className="search-bar display-none">
                  <div className="search-bar-wrapper">
                    <input
                      type="text"
                      placeholder="Search here"
                      defaultValue={searchTextRef.current}
                      onChange={handleInputChange}
                      ref={searchInputRef}
                    />
                  </div>
                </div> */}

                <div style={{ width: "123px" }} className="display-none">
                  <Select
                    //  options={options.category}
                    options={options.category.map((value) => ({
                      value,
                      label: value,
                    }))}
                    // onChange={(option) =>
                    //   (selectedOptionsRef.current.category = option);
                    //   setSelectedCategory(option); // Update the selected category directly
                    // }
                    onChange={(option) => {
                      selectedOptionsRef.current.category = option;
                      setSelectedCategory(option); // Update the selected category directly
                    }}
                    placeholder="Category"
                    isSearchable={false}
                    styles={dropdownStyles}
                  
                    value={selectedOptionsRef.current.category}
                  />
                </div>
                <div style={{ width: "167px" }} className="display-none">
                  <Select
                    options={options.subCategory.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={(option) => {
                      selectedOptionsRef.current.subCategory = option;
                      setSelectedSubCategory(option);
                    }}
                    placeholder="SubCategory"
                    isSearchable={false}
                    styles={dropdownStyles}
                    value={options.subCategory.find(
                      (value) =>
                        value === selectedOptionsRef.current.subCategory
                    )}
                  />
                </div>

                <div style={{ width: "125px" }} className="display-none">
                  <Select
                    options={options.price.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={(option) => {
                      selectedOptionsRef.current.price = option;
                      setSelectedFollowers(option)
                    }}
                    placeholder="Price"
                    isSearchable={false}
                    styles={dropdownStyles}
                    value={options.price.find(
                      (value) => value === selectedOptionsRef.current.price
                    )}
                  />
                </div>

                <div style={{ width: "88px" }} className="display-none">
                  <Select
                    options={options.followers.map((value) => ({
                      value,
                      label: value,
                    }))}
                    onChange={(option) => {
                      selectedOptionsRef.current.followers = option;
                      setSelectedPrice(option);
                    }}
                    placeholder="Followers"
                    isSearchable={false}
                    styles={dropdownStyles}
                    value={options.followers.find(
                      (value) => value === selectedOptionsRef.current.followers
                    )}
                  />
                </div>

                <div className="search-bar display-none">
                  <div className="search-bar-wrapper">
                    <input
                      type="text"
                      placeholder="Search here"
                      value={searchTextRef.current}
                      onChange={handleInputChange}
                      ref={searchInputRef}
                    />
                  </div>
                </div>

                <div className="display-none">
                  <button className="search-button" onClick={handleSearch}>
                    Search
                  </button>
                </div>

                <div className="display-none">
                  <button
                    type="submit"
                    className="btn"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div
                className="cart_action Icon-props item-hover small-portion2 icon-hover-color"
                style={{ "font-size": "2rem" }}
              >
                <div
                  className="display-visible toggle-btn"
                  style={{ marginRight: "25px" }}
                  onClick={handleClick}
                >
                  <AiOutlineSearch />
                </div>

                {token && (
                  <Link to="/cart">
                    <div className="cart-hover-color">
                      <AiOutlineShoppingCart />
                    </div>
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

      <div>
        <div className="side_sidebar" id="side_sidebar">
          <div className="side_cancel_btn" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>

          <div style={{ padding: "20px", width: "100px" }}>
            <div style={{ width: "120px" }} className="display-none">
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Category"
                isSearchable={false}
                styles={dropdownStyles}
              />
            </div>

            <div style={{ width: "167px" }} className="display-none">
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Sub Category"
                isSearchable={false}
                styles={dropdownStyles}
              />
            </div>

            <div style={{ width: "125px" }} className="display-none">
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Followers"
                isSearchable={false}
                styles={dropdownStyles}
              />
            </div>

            <div style={{ width: "88px" }} className="display-none">
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Price"
                isSearchable={false}
                styles={dropdownStyles}
              />
            </div>

            <div className="search-bar display-none">
              <div className="search-bar-wrapper">
                <input
                  type="text"
                  placeholder="Search here"
                  defaultValue={searchTextRef.current}
                  onChange={handleInputChange}
                  ref={searchInputRef}
                />
              </div>
            </div>

            <div className="display-none">
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>

            <div className="display-none">
              <button type="submit" className="btn" onClick={handleClearSearch}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchNavbar;
