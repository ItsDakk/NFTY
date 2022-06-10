// This is from the post function that we created inside of apiCategory.
// This hook needs to be ran inside of the createCategoryForm inside of the forms folder

import { CancelToken } from 'apisauce';
import { useContext, useEffect } from 'react';
import apiCategory from '../api/apiCategory';
import { AppContext } from '../context/AppContext';

// In order to get the category, we need to pass it in as a parameter from the apiCategory file
export default function useCreateCategory(category) {

    // This is being pulled from the AppContext file, under the const values function. {} are used because it's an object that we are pulling 
    // Also have to grab the setAlert which we also returned the value for in the AppContext file
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        () => {
            // The body of this function is what will run once the page loads
            // The variable response is where we will put the response that we get back from out API
            let response

            const source = CancelToken.source()

            // We only want to run this if there is a category
            if (category) {
                // This is a self-executing arrow function, meaning that it will immediately run itself 
                // The reason we use a self-executing arrow function is because the outer most function cannot be Async. It can be async inside of the function
                (async ()=>{
                    /* 
                        This is our API call. This function is pulled from the apiCategory file in the api's folder. We have to check to see what this response
                        needs to take in. From the apiCategory, it takes in the user.token, category.name & source.token (cancelToken). We get the user from the useState
                        function that we built inside of our AppContext, which pulls the user from useState that was set to the getUserFromLS() function. Then we passed the 
                        user value into the const values variable that was built. Since this was built with AppContext, that means we can pull this information into anywhere
                        needed by importing the AppContext. dot.notation is used because user is a dictionary with values. 
                    */
                    response = await apiCategory.post(user.token, category.name, source.token)
                    if (response) {
                        // console.logging that the created category was successful
                        setAlert({msg:`Category: ${category.name} created`, cat: 'success'})
                    } else if (response === false && response !== undefined) {
                        // this is in case it didn't work
                        setAlert({msg:`Please reauthorize you account`, cat:'warning'})
                    }
                })()
                // The return of this is what will run when the page exits or dismounts itself
                return () => {source.cancel()}
            }
        },
        /* 
            This the Dependency Array
            Anything that comes from outside of the effect must be inserted here into the dependency array, plus what we want to subscribe to. 
            We want this to rerun this effect when a specific variable changes. In this instance, we want to run this effect everytime there
            are changes to the category.
        */
        [category, user.token]
    )
  
}
