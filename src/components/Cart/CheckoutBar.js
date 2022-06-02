import React from 'react'
import CartCard from './CartCard'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function CheckoutBar() {
  return (
    <Box sx={{position: 'fixed', right:'10px', bottom:'10px', p:2, display:'flex', alignContent:'center', backgroundColor:'#33333325', border:'1px solid black'}}>
        <Stack>
            <Typography variant="h6">
                Cart Total: ${cart.reduce((total, nextItem) => {"price":total.price + nextItem.price}).price.toFixed(2) )}
            </Typography>
            <Button>Checkout</Button>
        </Stack>
    </Box>
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

const items = [item1, item2, item2, item3, item3]
