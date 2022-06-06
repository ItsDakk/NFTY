// Hooks have to be named with a lowercase use and then whatever that hook is (e.g. useLogin)
import React, { useEffect } from 'react'
import { getUser } from '../api/apiBasicAuth';
import { CancelToken } from 'apisauce';

// Proper practice would be to use something called callBacks
export default function useLogin(loginCreds, setLoginCreds, setError, setUser) {
    // get navigate

    const login = async (cancelToken) => {
        const response = await getUser(loginCreds.email, loginCreds.password, cancelToken)
        console.log(response)
        if (response.user?.token) {
            console.log('Logged In');
            setUser(response.user);
            setError(response.error);    
            setLoginCreds({})
        }
    }
    
    useEffect(
        () => {
            // This is where we write the code for our API call. This function though cannot be an async function, it has to be synchronous
            const source = CancelToken.source()
            // Will only run the login if the user gives us both email and password
            if(loginCreds.email && login)
            login(source.token)
            return () => {source.cancel()}
        },
        // We have to subscribe to all of the parameters
        [loginCreds, setLoginCreds, setError, setUser]
    )
}
