import React, { useEffect, useState } from 'react';
import apiCategory from '../api/apiCategory';
import { CancelToken } from 'apisauce';

export default function useCategories() {
    // Setting the default to an empty list 
    const [categories, setCategories] = useState([])

    useEffect(
        ()=>{
            const source = CancelToken.source();
            const getCategories = async() => {
                const response = await apiCategory.get(source.token)
                setCategories(response)
            }

            getCategories()
            return () => {source.cancel();}
        },
        []
    )

    return categories
  
}
