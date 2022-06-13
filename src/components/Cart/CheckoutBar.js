import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { AppContext } from '../../context/AppContext';
import Button from '../Button';

export default function CheckoutBar() {

    const { user, cart } = useContext(AppContext)

    /*
        We use to reduce function so that we can get 1 price back for our cart total        
    */
  return (
    <Box sx={{ position: 'fixed', right:'10px', bottom:'10px', p:2, display:'flex', alignContent:'center', backgroundColor:'#33333325', border:'1px solid black' }}>
        <Stack>
            <Typography variant="h6"> 
                Cart Total: ${ cart.reduce((total, nextItem) => ({"price":total.price + nextItem.price})).price.toFixed(2) }
            </Typography>
            <Button>Checkout</Button>
        </Stack>
    </Box>
  )
}
