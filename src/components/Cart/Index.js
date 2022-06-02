// This is where the final product will be coming out of
// * Objects may have to the same property but they are not the same object. 
// * Objects in JS are stored by reference not by value 
// * JSON.stringify(b) === JSON.stringify(a) would be true because we are checking the value

/*
  This is the top level componenet. 
  The flow of {item} is this . . .
    Index.js -> CartItem.js -> CartCard.js -> AddRemoveCartItem.js being the lowest level componenet
*/

import React from 'react';
import Box from '@mui/material/Box';
import CartItem from './CartItem';
import CheckoutBar from './CheckoutBar'

export default function Index() {
  return (
    <>
            <Box sx={{ mb: 15 }}>
                {
                        // * cart.map(JSON.stringify) -> This is going to stringify everything that is in the cart instead of it being an object
                        // Converting this to a set will prevent any ducplicate items in the cart
                        // Once the cart duplicates have been removed and turned into a string, now we need to convert back to an obejct by using JSON.parse
                        // * item={item} -> Inside of cart item, we are going to need to access the item
                    [...new Set(cart.map(JSON.stringify))].map(JSON.parse)?.map(
                        (item) =>< CartItem key={item.id} item={item} />
                    )
                }
            </Box>
        <CheckoutBar/>
    </>
  )
}

const item1 = {
    "id": 1,
    "name": "ItemA",
    "desc": "ItemA is good",
    "price": 12.99,
    "img": "https://res.cloudinary.com/cae67/image/upload/v1651792721/kanye_jvbkns.png",
    "category_id": 1
}

const item2 = {
    "id": 2,
    "name": "ItemB",
    "desc": "ItemB is good",
    "price": 19.99,
    "img": "https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
    "category_id": 2
}

const item3 = {
    "id": 3,
    "name": "ItemC",
    "desc": "ItemC is good",
    "price": 29.99,
    "img": "https://res.cloudinary.com/cae67/image/upload/v1652982371/cow_gkvuce.jpg",
    "category_id": 1
}

const cart = [item1, item2, item2, item3, item3]