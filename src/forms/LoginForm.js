import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from "yup";
import Button from '../components/Button';
import { AppContext } from '../context/AppContext';
import useLogin from '../hooks/useLogin';


// Defining our yup validation
const FormSchema = Yup.object(
    {
        email: Yup.string().email("Must be a valid e-mail format").required(),
        password: Yup.string().required()
    }
)

const initialValues = {
    email: '',
    password: ''
};


export default function LoginForm(){
    
    // This is retrieving our setUser function so we can set the user
    const {setUser} = useContext(AppContext)

    // This is what we are going to be watching for changes in. When the loginCred changes, then we are going to go out to our API
    // check to make sure that they logged in properly and get the user info back
    const [loginCreds, setLoginCreds] = useState({});

    // This is just to deal with our errors
    const [error, setError] = useState('')
    
    // Order does matter here. Have to import them in the order that we exported them
    useLogin(loginCreds, setLoginCreds, setError, setUser)
    
    const handleSubmit = (values) => {
        console.log(values)
        setLoginCreds(values)
    };

    useLogin(loginCreds, setLoginCreds, setError, setUser)



    const formik = useFormik({
        // This is a dictionary that takes in the initial values
        initialValues: initialValues,
        validationSchema: FormSchema,
        onSubmit: (values) => { handleSubmit(values) }
    })

    return(
    <form onSubmit={ formik.handleSubmit }>
        <TextField
            id='email'
            name='email'
            fullWidth
            sx = { {mb:2, mt:2 }}
            label = 'email'
            placeholder = 'email'
            value = { formik.values.email }
            onChange = { formik.handleChange }
            error = { formik.touched.email && Boolean(formik.errors.email) }
            helperText = { formik.touched.email && formik.errors.email }
        />

        <TextField
            id='password'
            name='password'
            type='password'
            fullWidth
            sx={{mb:2}}
            label='password'
            placeholder='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
        />

        <Button type="submit" sx = {{ width: "100%" }}>Login</Button>

    </form>
    )
}