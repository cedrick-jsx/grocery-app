import { useReducer } from "react";
import { GroceryContext } from "./CreatedContext";
import { GroceryReducer } from "../hooks/GroceryReducer";

export const GroceryProvider = (props) => {
  const groceryStatus = {
    GET_GROCERY: "GET_GROCERY",
    USER_GROCERY: "USER_GROCERY",
    CLEAR_GROCERY: "CLEAR_GROCERY",
  };

  const [state, dispatch] = useReducer(GroceryReducer, {
    grocery: null,
    userGrocery: null,
  });

  return (
    <GroceryContext.Provider value={{ ...state, dispatch, groceryStatus }}>
      {props.children}
    </GroceryContext.Provider>
  );
};
