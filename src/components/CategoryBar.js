import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Error from './Error';
import Box from '@mui/system/Box';
import { CircularProgress } from '@mui/material';

/* 
* useState:
    Whenever you want to change a variable and want that variable to update with that change on your site, you have to store it in State
    State is what regulates components that get reran, anytime you change the state, the component that uses that state will rerun
*/

// const categories = [{id: 1, name:"Shoes"},{id: 2, name:"Pants"},{id: 3, name:"Shirts"}]

export default function CategoryBar({handleClick=() =>{}}) {

    /* 
     * Information on useState
      We use the default state object here as an empty object to prevent errors or other issues
      The first item put inside of here is a new memeber of State and will be initialized to the value you have set
      The second item will give you a way to set this item and change it
     * Follow format of [name, setName] to prevent confusion
    */

    const [activeCategory, setActiveCategory] = useState({});

    // Have to have this in the function because we are going to use the state
    // Passing in the category because we are trying to use that category for setActiveCategory
    const handleActiveCategory = (category) => {
        if (activeCategory === category) {
          // You can never mutate states directly in React which is why we use setActiveCategory to reset it
            setActiveCategory({})
        } else {
            setActiveCategory(category)
        }
    }
    
    if (!categories) {
      return (
        <Box sx={{display: "flex"}}>
          <CircularProgress/>
        </Box>
      )
    }

    if (error) {
      return (
        <Box sx={{display: "flex"}}>
          <Error>{error}</Error>
        </Box>
      )
    }


  return (
    // Have to use map function for every item in list!
    <Stack direction="row" spacing={1}>
      {categories.map((category) => (
        category === activeCategory?
        <Chip 
          // When mapping over a list, we have to give a key prop to make this one item unique from the other items
          key={category.id} 
          size="small"
          color="primary"
          label={category.name} 
          onClick={ ()=>{ handleActiveCategory(category); handleClick() }}/>
      :
        <Chip 
          // Variant will allow us to pull in MUI properties 
          variant="outlined" 
          size="small" 
          color="primary" 
          // When mapping over a list, we have to give a key prop to make this one item unique from the other items
          key={category.id} 
          label={category.name} 
          onClick={ ()=>{ handleActiveCategory(category); handleClick() }}/>
      )) }

    </Stack>
  )
};

// Whenever you want to change a variable and want it to update it on the page, you have to store it in the state


