/*
  This is our lowest level component. 
  The flow of {item} is this . . .
    Index.js -> CartItem.js -> CartCard.js -> AddRemoveCartItem.js being the lowest level componenet
*/

import React, { useContext } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { AppContext } from '../../context/AppContext';


export default function AddRemoveCartItem({ item }) {

  // To get something out of context we have to use useContext
  const { addToCart, removeFromCart, removeAllFromCart } = useContext(AppContext)

  return (
    <ButtonGroup sx={{margin:"auto"}}>

        <IconButton key="delete" onClick={() => { removeAllFromCart(item) }}>
            <DeleteForeverTwoToneIcon fontSize="small" />
        </IconButton>

        <IconButton key="remove" onClick={() => { removeFromCart(item) }}>
            <RemoveCircleTwoToneIcon fontSize="small" />
        </IconButton>

        <IconButton key="add" onClick={() => { addToCart(item) }}>
            <AddCircleTwoToneIcon fontSize="small" />
        </IconButton>

    </ButtonGroup>
  )
};
