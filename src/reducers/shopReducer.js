const cartActions = {
    addToCart:'addToCart',
    removeFromCart: 'removeFromCart',
    emptyCart: 'emptyCart',
    removeAllFromCart: 'removeAllFromCart',
    addBulkToCart: 'addBulkToCart'
};

function shopReducer(cart = [], {type, item}) {
    /* 
    Reducers take in the exact same 2 things no matter what it is. 
        1) The initialState of the object that we want to manipulate
        2) action. This will be a dictionary of 2 or more values. At least 1 value
            2a) One value that you will always have is {type}
            2b) This will be the payload, or any of the parameters that you passed to it.
            2c) If they bring in the object it would be 'action' but in this application we are destructuring it
                so this will be {type, item}
*/
    switch(type) {

        case cartActions.addToCart:
            return [...cart, item];
            /* 
                If they want to add something to the cart, means that the type that gave us is the same thing as the addToCart, the string
                that was passed in. If they did that means we need to add something to the cart, which is going to be the item
                We are going to return the newCart with the item added to it. We can't do cart.push(item) because this does it in-state
                and we can NEVER mutate state directly. Anything that has to do with state has to be done out-of-place
                Item here is just 1 item object 
             */

        case cartActions.addBulkToCart:
            console.log(item)
            return [...cart, ...item];
            /* 
                This is if we wanted to add multiple of something to a cart
                The object item being passed in here is a list of item objects
            */
            
        case cartActions.removeFromCart:
            let newCart = cart.slice()
             // This is going to give us a new copy of the cart, and not the old one, so now we have a brand new cart.
            for (let cartItem of newCart) {
                if (cartItem.id === item.id) {
                    // They are passing us the item that we want to remove. If the cartItem.id is the same as the item.id that
                    // they want to remove then we will remove it witht the following code below
                    newCart.splice(newCart.indexOf(cartItem), 1)
                    // We don't want to remove all of them so we are adding the 1 to ensure that we only remove 1 of the item
                    return newCart
                }
            }
            return newCart
            // Always returning the newCart with the changes

        case cartActions.removeAllFromCart:
            return cart.filter((cartItem) => item.id !== cartItem.id)
            // They are going to pass us the item obeject they want to remove, but this time we are going to remove all of those item objects from the
            // We are using a filter for this, because this works out-of-place

        case cartActions.emptyCart:
            // This is just us returning an empty list 
            return []
        default:
            // This is how we show an error. Teapot meaning you are trying to do something that I am not suppose to be doing
            throw new Error('I am not a teapot')           
    }
};

export {
    shopReducer,
    cartActions
}