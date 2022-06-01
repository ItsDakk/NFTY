import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CategoryForm from '../forms/CategoryForm';

const categories = [{id: 1, name:"Shoes"},{id: 2, name:"Pants"},{id: 3, name:"Shirts"}]

export default function AdminSelectCategory() {

    // Since we are changing to objects to a string, we are setting the useState value to an empty string
    const [category, setCategory] = useState('')

    const handleChange = (event) => {
        console.log(event.target.value)
        if (event.target.value === 'default') {
            setCategory('')
            return 
        }
        setCategory(JSON.parse(event.target.value))
    }

    return (
        <>
            {/* fullWidth allows us to take up the whole screen similar to Bootstrap */}
            <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        label="Category"
                        name="category_id"
                        placeholder="category"
                        // Can't pass an object as a value in a dropdown form
                        value={category? JSON.stringify(category):'default'}
                        onChange={(event) => handleChange(event)} >

                    <MenuItem value="default"><em>Select Category to Edit</em></MenuItem>
                    {categories.map(
                        // Whatever is inside of the map function is where we need to assign a key prompt
                        // * Assign it to the outer most element!!
                        (category) => (
                            <MenuItem key={category.id} value={JSON.stringify(category)}>{category.name}</MenuItem>
                        )
                        
                    )}
                    </Select>

            </FormControl>

            {category ?
                <>
                    <Typography sx={{p:4}} variant="h5">
                        Edit {category.name}
                    </Typography>
                    <CategoryForm category={category}/>
                </>
                :
                <>
                    <Typography sx={{p:4}} variant="h5">
                        Create
                    </Typography>
                    <CategoryForm/>
                </>
                }
        </>
  )
}
