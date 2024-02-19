export const GroceryReducer = (state, action) => {
  switch (action.type) {
    case "GET_GROCERY":
      return {
        ...state,
        grocery: action.payload,
      };

    case "USER_GROCERY":
      return {
        ...state,
        userGrocery: action.payload,
      };

    case "CLEAR_GROCERY":
      return {
        grocery: action.payload,
        userGrocery: action.payload,
      };

    default:
      return state;
  }
};
