export const initialState = {
  cart: [],
  total: 0,
};

export const actionType = {
  SET_CART: "SET_CART",
  SET_TOTAL: "SET_TOTAL",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_CART: {
      const totalPrice = action.cart.reduce((acc, item) => {
        return acc + parseFloat(item.price) * (item.quantity || 1);
      }, 0);
      return {
        ...state,
        cart: action.cart,
        total: totalPrice,
      };
    }

    default:
      return state;
  }
};

export default reducer;
