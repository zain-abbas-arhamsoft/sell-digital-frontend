// user endpoints

export const signupEndpoint = "/v1/front/users/register"
export const loginEndpoint = "/v1/front/users/login"
export const forgotPasswordEndpoint = "/v1/front/users/forgot-password"
export const linkExpiredEndpoint = "/v1/front/users/link-expired"
export const verifyTokenEndpoint = "/v1/front/users/verify-token"
export const resetPasswordEndpoint = "/v1/front/users/reset-password"
export const updateProfileEndpoint = "/v1/front/users/update-profile"
export const getProfileDataEndpoint = "/v1/front/users/get-profile-data"
export const sessionManagementEndpoint= "/v1/front/users/reset-session-timer"

// category endpoints

export const dynamicCategoryEndpoint = "/v1/admin/category/get-data"
export const featuredProductEndpoint = "/v1/admin/category/get-featured-products"
export const getAllProductEndpoint = "/v1/admin/category/list"
export const searchedEndpoint = "/v1/admin/category/filter"
export const productDetailEndpoint = "/v1/admin/category/product-detail/"
export const relatedProductDetailEndpoint = "/v1/admin/category/get-related-products"
export const recentlyAddedProducts = "/v1/admin/category/recently-added-products"

// cart endpoints
export const addCartItem = "/v1/front/cart/addItem"
export const showCarts = "/v1/front/cart/get-cart-item"
export const removeCart = "/v1/front/cart/remove-cart-item"
// export const calculateCart = "/v1/front/cart/get-cart-length"
