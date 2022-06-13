// This is from the post function that we created inside of apiItem.
// This hook needs to be ran inside of the createItemForm inside of the forms folder

import { CancelToken } from 'apisauce';
import { useContext, useEffect } from 'react';
import apiItem from '../api/apiItem';
import { AppContext } from '../context/AppContext';

// In order to get the item, we need to pass it in as a parameter from the apiItem file
export default function useCreateItem(item) {

    // This is being pulled from the AppContext file, under the const values function. {} are used because it's an object that we are pulling 
    // Also have to grab the setAlert which we also returned the value for in the AppContext file
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        // This outer most function cannot be an async function
        () => {
            // The body of this function is what will run once the page loads
            // The variable response is where we will put the response that we get back from out API
            let response

            const source = CancelToken.source()

            // We only want to run this if there is an item
            // Because item is a dictionary, we can't just say "if item" because this will crash, so we need to search by name
            if (item?.name) {
                // This is a self-executing arrow function, meaning that it will immediately run itself 
                // The reason we use a self-executing arrow function is because the outer most function cannot be Async. It can be async inside of the function
                (async ()=>{
                     /* 
                        This is our API call. This function is pulled from the apiItem file in the api's folder. We have to check to see what this response
                        needs to take in. From the apiItem, it takes in the data, user.token & source.token (cancelToken). We get the user from the useState
                        function that we built inside of our AppContext, which pulls the user from useState that was set to the getUserFromLS() function. Then we passed the 
                        user value into the const values variable that was built. Since this was built with AppContext, that means we can pull this information into anywhere
                        needed by importing the AppContext. dot.notation is used because user is a dictionary with values. 
                        This also has to match whatever name you gave the export e.g "postItem"
                    */
                    response = await apiItem.postItem(user.token, item, source.token)
                    if (response) {
                        // console.logging that the created item was successful
                        setAlert({msg:`Item: ${item}.name} created`, cat: 'success'})
                    } else if(response === false && response !== undefined) {
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
            are changes to an item.
        */
        [item, user.token]
    )
  
}
