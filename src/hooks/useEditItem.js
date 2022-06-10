import { CancelToken } from 'apisauce';
import { useContext, useEffect } from 'react';
import apiItem from '../api/apiItem';
import { AppContext } from '../context/AppContext';


export default function useEditItem(itemID, item) {

    const {user} = useContext(AppContext)

    useEffect(
        /*
            Self-executing arrow function
        */
        () => {
            let response

            const source = CancelToken.source()
            if (item?.name) {
                /* 
                    This is our API call. This function is pulled from the apiItem file in the api's folder. We have to check to see what this response
                    needs to take in. 
                    From the apiItem, it takes in the user.token, ItemID, Item.name & source.token (cancelToken)(Must be in the order they are in 
                        inside of the apiItem file). 
                    We get the user from the useState function that we built inside of our AppContext, which pulls the user from useState that was set 
                    to the getUserFromLS() function. Then we passed the user value into the const values variable that was built. 
                    Since this was built with AppContext, that means we can pull this information into anywhere needed by importing 
                    the AppContext. dot.notation is used because user is a dictionary with values. 
                */
                (async ()=>{
                    response = await apiItem.putItem(itemID, item, user.token, source.token)
                    if (response) {
                        setAlert({msg:`Item: ${item.name} has been edited`,'cat':'success'})
                    } else if(response === false && response !== undefined) {
                        setAlert({msg:`Please reauthorize you account`,'cat':'warning'})
                    }
                })()
                return () => {source.cancel()}
            }
        },
        [item, itemID, user.token]
    )
  
};
