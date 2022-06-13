import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ItemForm from '../forms/ItemForm';
import useItems from '../hooks/useItems';

export default function AdminSelectItem() {

    // Since we are changing to objects to a string, we are setting the useState value to an empty string
    const [item, setItem] = useState('')

    // Pulling in items from hooks, which pulls from the apiItems
    // Also pulling error, just in case there is an error pulling the items, then the user would be able to see this
    const {items, error} = useItems()

    const handleChange = (event) => {
        console.log(event.target.value)
        if (event.target.value === 'default') {
            setItem('')
            return 
        }
        setItem(JSON.parse(event.target.value))
    }

    return (
        <>
            {/* fullWidth allows us to take up the whole screen similar to Bootstrap */}
            <FormControl fullWidth>
                <InputLabel id="item-label">Item</InputLabel>
                    <Select
                        labelId="item-label"
                        label="Item"
                        name="item_id"
                        placeholder="Item"
                        // Can't pass an object as a value in a dropdown form
                        value={item? JSON.stringify(item):'default'}
                        onChange={(event) => handleChange(event)}>

                    <MenuItem value="default"><em>Select Item to Edit</em></MenuItem>
                    {items?.map(
                        // Whatever is inside of the map function is where we need to assign a key prompt
                        // * Assign it to the outer most element!!
                        (item) => (
                            <MenuItem key={item.id} value={JSON.stringify(item)}>{item.name}</MenuItem>
                        )
                        
                    )}
                    </Select>
                <Error>{ error }</Error>
            </FormControl>

            {item ?
                <>
                    <Typography sx={{p:4}} variant="h5">
                        Edit {item.name}
                    </Typography>
                    <ItemForm item={item}/>
                </>
                :
                <>
                    <Typography sx={{p:4}} variant="h5">
                        Create {item.name}
                    </Typography>
                    <ItemForm/>
                </>
                }
        </>
  )
}
