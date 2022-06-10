import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import Button from '../components/Button';
import useCategories from '../hooks/useCategories';
import useCreateItem from '../hooks/useCreateItem';
import useDeleteItem from '../hooks/useDeleteItem';
import useEditItem from '../hooks/useEditItem';


// let categories = [{ id:1, name:"Shirts"}, {id:2, name:"Shoes"}, {id:3, name:"Hats"}]

// Defining our yup validation
const FormSchema = Yup.object(
    {
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.string().matches(/^\d+(\.\d{1,2})?$/, "Must Be A Valid Price").required(),
        image: Yup.string().required(),
        category_id: Yup.number().integer().required()
    }
)

export default function ItemForm({ item }) {

        /* 
            This is a dictionary now, which is why we need to use {} to pull out the values. useCategories() in the hook folder, doesn't need anything passed through
            useCategories was that dictionary that was definied in apiCategory, underneath of the get function that was created. Then we used the get function
            inside of the hook useCategories, which returns the response, which is just the categories. We are getting out an object so that we can destructure our object
            using our {} and not brackets. They do need to match when we pull them out.
                code path: 
                    apis: apiCategory > hooks: useCategories > forms: ItemForm
        */
    const {categories, error} = useCategories()
        /* 
            We need to show the error somewhere on the page in case something goes wrong
            useCategories is an API Call and sense it is ansynchronous. We don't know when categories is going to be defined as something because it 
            hasn't gone out and found any categories yet. Once it retrieves those categories and brings them in, that causes a state change, which causes us to
            rerender our page. This time it will know the value of categories. The first time our page loads, categories is undefined which means we cannot map over 
            it because it doesn't have a value
        */

    // This useState is to check for changes in newItem - once initialized, then setNewItem defaults to an empty object
    const[newItem, setNewItem] = useState({})

    // This useState is to check for changes in editItem - once initialized, then setEditItem defaults to an empty object
    const[editItem, setEditItem] = useState({})

    // This useState is to check for changes in deleteItem - once initialized, then setDeleteItem defaults to an empty object
    const[deleteItem, setDeleteItem] = useState({})

    // This is for when the user creates an item, this will run and execute that post function inside of the useCreateItem hook we created
    useCreateItem(newItem)

    // This is for when the user edits an item, this will run and execute that post function inside of the useEditItem hook we created
    // This needs to take in the itemID since it is a put request 
    useEditItem(editItem, item?.id)

    // This is for when the user deletes an item, this will run and execute that post function inside of the useDeleteItem hook we created
    useDeleteItem(deleteItem)


    const initialValues = {
        name: item?.name ?? '',
        desc: item?.desc ?? '',
        category: item?.category ?? '',
        price: item?.price ?? '',
        image: item?.image?? '',
        category_id: item?.category_id??0
    };
    
    const handleSubmit = (values, resetForm) => {
        if ( item ) {
            setEditItem(values)
        } else {
            // This will use setCreateItem for us 
            setNewItem(values)
        }
        console.log(values)
        resetForm(initialValues)
    };

    const handleDelete = () => {
        // Passed in the full item here because that full item dictionary is what is passed into setDeleteItem
        setDeleteItem(item)
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, { resetForm }) => { handleSubmit(values, resetForm) },
        enableReinitialize: true
    })

    return(
        <form onSubmit={formik.handleSubmit}>
            <TextField
                id = "name"
                name = "name"
                fullWidth
                sx = {{mb:2, mt:2}}
                label = "name" 
                 placeholder = "Name"
                value = {formik.values.name}
                onChange = {formik.handleChange}
                error = { formik.touched.name && Boolean(formik.errors.name) }
                helperText = { formik.touched.name && formik.errors.name }            
            />

            <TextField
                id = "description"
                name = "description"
                fullWidth
                sx = {{mb:2}}
                label = "description"
                placeholder = "Description"
                value = {formik.values.desc}
                onChange = {formik.handleChange}
                error = {formik.touched.desc && Boolean(formik.errors.desc)}
                helperText = {formik.touched.desc && formik.errors.desc}
            />

            <TextField
                id = "price"
                name = "price"
                fullWidth
                sx = {{mb:2}}
                label = "price"
                placeholder = "Price"
                value = {formik.values.price}
                onChange = {formik.handleChange}
                error = {formik.touched.price && Boolean(formik.errors.price)}
                helperText = {formik.touched.price && formik.errors.price}
            />

            <TextField
                id = "image"
                name = "image"
                fullWidth
                sx = {{mb:2}}
                label = "Image URL"
                placeholder = "img"
                value = {formik.values.img}
                onChange = {formik.handleChange}
                error = {formik.touched.img && Boolean(formik.errors.img)}
                helperText = {formik.touched.img && formik.errors.img}
            />
            
            <FormControl fullWidth>
                <InputLabel id="category-label-id">Category</InputLabel>
                <Select
                    labelId = "category-label-id"
                    id = "category-id"
                    value = {formik.values.category_id}
                    name = "category_id"
                    placeholder = "Category"
                    label = "Category"
                    onChange = { formik.handleChange }
                    error = { formik.touched.category_id && Boolean(formik.errors.category_id) }
                    >
                    <MenuItem value = {0}><em>None</em></MenuItem>
                        
                        {categories?.map((category)=>(
                        /* 
                            When we are in React and we want to do something for everything in a list, USE MAP!!
                            When ever you map using a list inside of React you have to use keys.
                            A key is a variable that is unique to this item that you're looping over

                            When the page first loads, there won't be any category values for map over, so we add in an option
                            that if categories, then map, if not, do nothing. 
                        */
                    <MenuItem key = {category.id} value={category.id}>{category.name} | {category.id}</MenuItem>
                )
                )}
                </Select>
                 {/* This error is coming from the useCategories function */}
                { error }
                <FormHelperText>{ formik.touched.category_id && formik.errors.category_id }</FormHelperText>
            </FormControl>
            <Button type="submit" sx = {{ width:"100%", my:1 }}>{item?"Edit Item":"Create Item"}</Button>
            <Button onClick={ () => {handleDelete} } sx = {{ width:"100%", my:1 }}>Delete</Button>
        </form>
    )

}

