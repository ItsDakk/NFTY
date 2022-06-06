import {useEffect, useEffectm, useState} from 'react';
import apiItem from '../api/apiItem';
import { CancelToken } from 'apisauce';
import { Source } from '@mui/icons-material';

export default function useItems(categoryID=null){
    const [items, setItems] = useState({});

    useEffect(
        ()=>{
            const source = CancelToken.source()
            categoryID ?
                (async() => {
                    const response = await apiItem.getByCategory(categoryID, source.token);
                    setItems(response)
                }) ()
            :
                (async() => {
                    const response = await apiItem.get(source.token)
                    setItems(response)

                }) ()
            return () => {source.cancel()}
        },
        [categoryID]
    )

    return items
}