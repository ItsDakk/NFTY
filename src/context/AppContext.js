import {createContext, useState} from 'react';


export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    
    const setUser = (user) => {
        // Storing our user in the users localStorage so we don't lose their information if they refresh the page 
        // Stringifying the object so we can store our user object in localStorage as a string, since we can't do that as an object
        localStorage.setItem('user', JSON.stringify(user))
        _setUser(user)
    }

    const getUserFromLS = () => {
        // This is how we are going to get the user information out from localStorage
        let user = localStorage.getItem('user')
        if (user) {
            // Since the user information is stored as an string, we need to convert it back to an object using JSON.parse
            return JSON.parse(user)
        }
    }

    // useState for our user
    const [user, _setUser] = useState(getUserFromLS())

    const values = {
        user,
        setUser
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider