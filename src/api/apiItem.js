import apiClientNoAuth from './clientNoAuth';
import apiClientTokenAuth from './clientTokenAuth';

const endpoint = '/api/item'

const getItems = async (cancelToken) => {
    let error;
    let items;

    const response = await apiClientTokenAuth(cancelToken).get(endpoint)
    if (response.ok) {
        items = response.data.items
    } else {
        error = "An unexpected error has occured. Please try again later"
    }
    return {
        error,
        items
    }
}

const getByCategory = async (categoryID, cancelToken) => {
    const response = await apiClientTokenAuth(cancelToken).get(endpoint+ '/category/' + categoryID)
    if (response.ok) {
        items = response.data.item
    } else {
        error = "An unexpected error has occured. Please try again later"
    }
    return {
        error,
        items
    }
    
};

const postItem = async (data, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint)
    return response.ok
};

const putItem = async (categoryID, data, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+'/'+categoryID, data)
    return response.ok
};

const delItem = async (categoryID, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+categoryID)
    return response.ok
};

export default {
    getItems,
    getByCategory,
    postItem,
    putItem,
    delItem
}