import { createContext, useEffect, useReducer, useState } from "react";
// Since our reducers are named exports, we have to pull them out with braces
import { cartActions, shopReducer } from "../reducers/shopReducer";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  
  const getUserFromLS = () => {
    // This is how we are going to get the user information out from localStorage
    let user = localStorage.getItem("user");

    if (user) {
      // Since the user information is stored as an string, we need to convert it back to an object using JSON.parse

      return JSON.parse(user);
    }
  };
  
  const getCartFromLS = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.stringify(cart);
    }
  };

  // useState for our user
  const [user, _setUser] = useState(getUserFromLS());

  // useState for the alerts
  const [alert, setAlert] = useState({});

    /* 
        useState for user carts. 
        The first thing we are getting is our state item, which is our cart
        keyword dispatch: 
            dispatch is the setter for a Reducer.
        Once we set that, we import our reducer hook, just as we did with all of the other ones
        We have to tell it what our reducer is, which is the one we just created 
    */
  const [cart, dispatch] = useReducer(shopReducer, getCartFromLS() ?? []);

  useEffect(
    () => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },
  // Putting cart in the dependency array so we can listen for any changes that occur inside of it 
   [cart]);

  const setUser = (user) => {
    // Storing our user in the users localStorage so we don't lose their information if they refresh the page
    // Stringifying the object so we can store our user object in localStorage as a string, since we can't do that as an object
    localStorage.setItem("user", JSON.stringify(user));
    _setUser(user);
  };

  const values = {
    alert,
    setAlert,

    user,
    setUser,

    cart,
    addToCart: (item) => {
      dispatch({ type: cartActions.addToCart, item });
    },

    addBulkToCart: (item) => {
      dispatch({ type: cartActions.addBulkToCart, item });
    },

    removeFromCart: (item) => {
      dispatch({ type: cartActions.removeFromCart, item });
    },

    removeAllFromCart: (item) => {
      dispatch({ type: cartActions.removeAllFromCart, item });
    },
    emptyCart: () => {
        // Don't need to pass in the item here because we don't need. We are just returning and empty cart
      dispatch({ type: cartActions.emptyCart });
    },
  };

  return;
  <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
