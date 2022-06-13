/*
  This is the mid-level componenet. 
  The flow of {item} is this . . .
    Index.js -> CartItem.js -> CartCard.js -> AddRemoveCartItem.js being the lowest level componenet
*/

import React, {useContext, useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CartCard from './CartCard';
import ChangeCartItemQuanitity from './ChangeCartItemQuanitity';
import { AppContext } from '../../context/AppContext';

// This is just giving us some styling for the items in the cart

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function CartItem({item}) {

  // useEffect is when we want to do something when something else happens 
  useEffect(
    () => {
      // Any time we make a change to our cart, we will recount the cart and reset our qty and will update the page
      setQty(cart.filter((cartItem) => cartItem.id === item.id).length)
    },
    // Dependency Array (where we want to watch for changes)
    [cart, item]
  )

  // Taking in item which comes from the Index.js file (line 18 & 19)
  //* const [qty, setQty] -> This is a useState function
  const [qty, setQty] = useState(cart.filter((cartItem) => cartItem.id === item.id).length)
  /* 
    * Setting the state in this file because we can only pass data down. Since ChangeCartItem is the lower than this level, 
    * we need to use the setState above that level, so we can pass that data down to ChangeCartItem
    
    This useState is going to give us back an array of items in our cart. We use the .length() method to determine how many
    items are in the cart.
    
    We have to pass in setQty because React is going to handle the state change for us, since this is what was used to change the quantity

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
}; 

