import { useState } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextField from '@mui/material/TextField';
// Below are the hooks that we created
import useCreateCategory from '../hooks/useCreateCategory';
import useEditCategory from '../hooks/useEditCategory';
import useDeleteCategory from '../hooks/useDeleteCategory';

// Defining our yup validation
const FormSchema = Yup.object(
    {
        name: Yup.string().required()
    }
)


export default function CategoryForm({ category }){

    // This useState is to check for changes in newCategory - once initialized, then setNewCategory defaults to an empty value
    const [newCategory, setNewCategory] = useState('')
    // This useState is to check for changes in editCategory - once initialized, then setEditCategory defaults to an empty value
    const [editCategory, setEditCategory] = useState('')
    // This useState is to check for changes in deleteCategory - once initialized, then setDeleteCategory defaults the ID to 0
    const [deleteCategory, setDeleteCategory] = useState(0)

    // This is for when the user creates a category, this will run and execute that post function inside of the useCreateCategory hook we created
    useCreateCategory(newCategory)
    // This is for when the user edits a category, this will run and execute that post function inside of the useEditCategory hook we created
    // This needs to take in the category ID since it is a put request 
    useEditCategory(editCategory, category?.id)
    // This is for when the user deletes a category, this will run and execute that post function inside of the useDeleteCategory hook we created
    useDeleteCategory(deleteCategory)
    
    const initialValues = {
        name: category?.name ?? '',
    };
    
    const handleSubmit = (values, resetForm) => {
        if (category) {
            setEditCategory(values)
        } else {
            // Now we are setting the initializing setNewCategory to the values which is just a dictionary of what the user typed in 
            setNewCategory(values)
        }
        console.log(values)
        resetForm(initialValues)
    };

    const handleDelete = () => {
        // This category is coming in from the category that we passed into this form (ln 19) 
        setDeleteCategory(category?.id)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values, { resetForm }) => { handleSubmit(values, resetForm) },
        enableReinitialize: true
    })

    return(
        <form onSubmit={ formik.handleSubmit }>
            <TextField
                id = 'name'
                name = 'name'
                fullWidth
                sx = {{mb:2, mt:2}}
                label = 'name'
                placeholder = 'name'
                value = { formik.values.name }
                onChange = { formik.handleChange }
                error = {formik.touched.name && Boolean(formik.errors.name) }
                helperText = { formik.touched.name && formik.errors.name }
            />

            <Button type="submit" sx={{width: "100%", my: 1}}>{category? "Edit Category":"Create Category"}</Button>
            <Button color="error" onClick={ () => handleDelete() } sx={{width: "100%", my:1}}>Delete</Button>

        </form>
    )
}
