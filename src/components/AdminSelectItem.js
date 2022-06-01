import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ItemForm from '../forms/ItemForm';


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

const items = [item1, item2, item3]

export default function AdminSelectItem() {

    // Since we are changing to objects to a string, we are setting the useState value to an empty string
    const [item, setItem] = useState('')

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
                    {items.map(
                        // Whatever is inside of the map function is where we need to assign a key prompt
                        // * Assign it to the outer most element!!
                        (item) => (
                            <MenuItem key={item.id} value={JSON.stringify(item)}>{item.name}</MenuItem>
                        )
                        
                    )}
                    </Select>

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
