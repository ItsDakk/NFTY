import { createContext, useEffect, useReducer, useState } from "react";
// Since our reducers are named exports, we have to pull them out with braces
import { cartActions, shopReducer } from "../reducers/shopReducer";

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    
    const getUserFromLS = () => {
        // This is how we are going to get the user information out from localStorage
        let user = localStorage.getItem('user')
        if (user) {
            // Since the user information is stored as an string, we need to convert it back to an object using JSON.parse
            return JSON.parse(user)
        }
    };

    // useState for our user
    const [user, _setUser] = useState(getUserFromLS())
    // useState for our alerts, starting it as an empty dictionary
    const [alert, setAlert] = useState({})

    const setUser = (user) => {
        // Storing our user in the users localStorage so we don't lose their information if they refresh the page 
        // Stringifying the object so we can store our user object in localStorage as a string, since we can't do that as an object
        localStorage.setItem('user', JSON.stringify(user))
        _setUser(user)
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

  return(
  <AppContext.Provider value={values}>{children}</AppContext.Provider>
  )
};

export default AppContextProvider;
