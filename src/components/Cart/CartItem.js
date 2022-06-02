/*
  This is the mid-level componenet. 
  The flow of {item} is this . . .
    Index.js -> CartItem.js -> CartCard.js -> AddRemoveCartItem.js being the lowest level componenet
*/

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CartCard from './CartCard';
import ChangeCartItemQuantity from './ChangeCartItemQuantity';

// This is just giving us some styling for the items in the cart

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function CartItem({item}) {
  // Taking in item which comes from the Index.js file (line 18 & 19)
  //* const [qty, setQty] -> This is a useState function
  const [qty, setQty] = useState(cart.filter((cartItem) => cartItem.id === item.id).length())
  /* 
    * Setting the state in this file because we can only pass data down. Since ChangeCartItem is the lower than this level, 
    * we need to use the setState above that level, so we can pass that data down to ChangeCartItem
    
    This useState is going to give us back an array of items in our cart. We use the .length() method to determine how many
    items are in the cart.

  */

  return (
      <Grid container spacing={2} sx={{m:1, pr:2, borderRadius:1, alignItems:"stretch"}}>

        <Grid item xs={12} sm={6} md={4}>
          <Item sx={{height:"100%"}}>
              <Avatar alt={item.name} variant="rounded" src={item.img} sx={{height:'100%', width:"100%"}} />
          </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
            <Item sx={{height:"100%"}}>
              <CartCard item={item}/>
            </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Item sx={{height:"100%"}}>
            // We have to pass in setQty because React is going to handle the state change for us, since this is what was used to change the quantity
            <ChangeCartItemQuantity qty={qty} item={item} setQty={setQty} />
          </Item>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Item sx={{height:"100%"}}>
              <strong>Item Subtotal</strong>
              <br />
              ${(item.price*qty).toFixed(2)}
            </Item>
        </Grid>

      </Grid>
  );
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
