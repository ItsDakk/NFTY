import { Typography } from '@mui/material'
import {useContext} from 'react'
import Cart from '../components/Cart/Index'
import { AppContext } from '../context/AppContext'

export default function CartPage() {    

    const {cart} = useContext(AppContext)

    // If there is nothing in the cart - then we will return some text
    if (cart.length <= 0){
        return(
            // Returning text if there is nothing in the cart
            <Typography variant="h3">Your Cart Is Empty</Typography>
        )
    }
  return (
    <>
        <Typography variant="h3">Your Cart</Typography>
        <Cart/>

    </>
  )
};