

import React from 'react'
// {useTheme} will give us access to our theme
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const range = (x) => [...Array(x).keys()]
/* 
    * This is us making our own range method
    We want this to take in a list of numbers
    ...Array(x) will take in a list
    .keys() will give us a count of everything that is in the array
*/

export default function ChangeCartItemQuantity({item, qty, setQty}) {
    const theme = useTheme();

    const handleChange = (event, item) => {
        // Here we are setting the qty to the setQty state that we created
        setQty(event.target.value)
        console.log('Changing cart either adding or removing')
    }

            // theme.palette.background.default will give us our default background color
  return (
    <FormControl fullWidth sx={{backgroundColor: theme.palette.background.default}}>
        <InputLabel id="qty-select">Qty {qty}</InputLabel>
            <Select
                labelId="qty-select"
                id="qty-select-select"
                value={qty}
                onChange={event => handleChange(event, item)} >

                    {range(qty+100).map(
                        /* 
                            We are making an item menu for just certin quantity of number options that the user can pick 
                            qtySelect is coming out of our map. 
                            if qtySelect is less than or equal to the qty, then we will make an item sign for anything less than the qty 
                                (e.g if they have 10 we will do everything up to 10)
                            if qtySelect is less than 10, then we won't make anything for it 
                            if qtySelect is divisible by 10
                            if qtySelect is divisible by 25 then increment by 25?
                            if all these things are true then we will make a MenuItem
                        */
                        (qtySelect) => qtySelect <= qty || qtySelect <10 || qtySelect %10 === 0 || qtySelect %25 === 0
                        ?
                        // If the above is true then we will make a MenuItem and show the qty to the user
                        <MenuItem key={qtySelect} value={qtySelect}>{qtySelect}</MenuItem>
                        : // Else if not then we will do nothing ''
                        ''
                        )
                    }
            </Select>
    </FormControl>
  )
}
