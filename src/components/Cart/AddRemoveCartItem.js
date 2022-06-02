/*
  This is our lowest level component. 
  The flow of {item} is this . . .
    Index.js -> CartItem.js -> CartCard.js -> AddRemoveCartItem.js being the lowest level componenet
*/

import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';


export default function AddRemoveCartItem({item}) {
  return (
    <ButtonGroup sx={{margin:"auto"}}>

        <IconButton key="delete" onClick={() => {console.log(`Delete all ${item.name} from Cart`)}}>
            <DeleteForeverTwoToneIcon fontSize="small" />
        </IconButton>

        <IconButton key="remove" onClick={() => {console.log(`Remove ${item.name}from Cart`)}}>
            <RemoveCircleTwoToneIcon fontSize="small" />
        </IconButton>

        <IconButton key="add" onClick={() => {console.log(`Add ${item.name}to Cart`)}}>
            <AddCircleTwoToneIcon fontSize="small" />
        </IconButton>

    </ButtonGroup>
  )
};
