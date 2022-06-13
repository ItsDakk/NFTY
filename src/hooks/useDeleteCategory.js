import { CancelToken } from 'apisauce';
import { useContext, useEffect } from 'react';
import apiCategory from '../api/apiCategory';
import { AppContext } from '../context/AppContext';


export default function useDeleteCategory(categoryID) {

    const {user, setAlert} = useContext(AppContext)

    useEffect(
        /*
            Self-executing arrow function
        */
        () => {
            let response

            const source = CancelToken.source()

            if (categoryID) {
                (async ()=>{
                     /* 
                        This is our API call. This function is pulled from the apiCategory file in the api's folder. We have to check to see what this response
                        needs to take in. 
                        From the apiCategory del func, it takes in the user.token, categoryID & source.token (cancelToken)(Must be in the order they are in 
                            inside of the apiCategory file). 
                        We get the user from the useState function that we built inside of our AppContext, which pulls the user from useState that was set 
                        to the getUserFromLS() function. Then we passed the user value into the const values variable that was built. 
                        Since this was built with AppContext, that means we can pull this information into anywhere needed by importing 
                        the AppContext. dot.notation is used because user is a dictionary with values. 
                    */
                    response = await apiCategory.del(user.token, categoryID,source.token)
                    if (response) {
                        setAlert({msg:`Category: ${categoryID} deleted`, cat:'success'})
                    } else if (response === false && response !== undefined) {
                        setAlert({msg:`Please reauthorize your account`, cat:'warning'})
                    }
                })()
                return () => {source.cancel()}
            }
        },
        [categoryID, user.token]
    )
}
