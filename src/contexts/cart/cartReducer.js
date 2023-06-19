const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("action.payload.item", action.payload.item);
      return {
        ...state,
        cartItems: action.payload.item,
      };
    // console.log('action.payload',action.payload)
    // console.log('state.cartItems',state.cartItems)
    // const newItemId = action.payload.item._id;
    // console.log('newItemId',newItemId)
    // const itemExist = state.cartItems.some(item => item._id === newItemId);
    // console.log('itemExist',itemExist)

    // let updatedCartItems = null;

    // if (itemExist) {
    //     updatedCartItems = state.cartItems.map(item => {
    //         if (item._id === newItemId) {
    //             return {
    //                 ...item,
    //                 quantity: item.quantity + 1
    //             };
    //         }
    //         return item;
    //     });
    // } else {
    //     updatedCartItems = [...state.cartItems, action.payload.item];
    // }
    // return {
    //     ...state,
    //     cartItems: updatedCartItems
    // };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.itemId
        ),
      };

    case "EMPTY_CART":
      return {
        ...state,
        cartItems: [],
      };

    // case "DELETED_ITEM":
    //   return {
    //     ...state,
    //     deletedItem: action.payload.item,
    //   };

    case "CART_LENGTH":
      return {
        ...state,
        cartLength: action.payload.item,
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };

    case "DECREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) => {
            if (item.id === action.payload.itemId) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          })
          .filter((item) => item.quantity !== 0),
      };

    default:
      return state;
  }
};

export default cartReducer;
