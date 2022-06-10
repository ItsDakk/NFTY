import { useEffect, useContext } from 'react';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';
import apiCategory from '../api/apiCategory'


export default function useEditCategory(category, categoryID) {

    const {user, setAlert} = useContext(AppContext)

    useEffect(
        /*
            Self-executing arrow function
        */
        () => {
            let response

            const source = CancelToken.source()

            if (category) {
                (async ()=>{
                    /* 
                        This is our API call. This function is pulled from the apiCategory file in the api's folder. We have to check to see what this response
                        needs to take in. 
                        From the apiCategory, it takes in the user.token, categoryID, category.name & source.token (cancelToken)(Must be in the order they are in 
                            inside of the apiCategory file). 
                        We get the user from the useState function that we built inside of our AppContext, which pulls the user from useState that was set 
                        to the getUserFromLS() function. Then we passed the user value into the const values variable that was built. 
                        Since this was built with AppContext, that means we can pull this information into anywhere needed by importing 
                        the AppContext. dot.notation is used because user is a dictionary with values. 
                    */
                    response = await apiCategory.put(user.token, categoryID, category.name ,source.token)
                    if (response) {
                        setAlert({msg:`Category: ${category.name} edited`, cat: 'success'})
                    } else if(response === false && response !== undefined) {
                        setAlert({msg:`Please reauthorize you account`, cat:'warning'})
                    }
                })()
                return () => {source.cancel()}
            }
        },
        [category, user.token]
    )
  
};
