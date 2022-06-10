import apiClientNoAuth from './clientNoAuth';
import apiClientTokenAuth from './clientTokenAuth';

const endpoint = '/api/item'

const getItems = async (cancelToken) => {
    let error;
    let items;

    const response = await apiClientNoAuth(cancelToken).get(endpoint);
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

const getByCategory = async (id, cancelToken) => {
    let error;
    let items; 

    const response = await apiClientTokenAuth(cancelToken).get(endpoint+ '/category/' + id);
    if (response.ok) {
        items = response.data.items
    } else {
        error = "An unexpected error has occured. Please try again later"
    }
    return {
        error,
        items
    }
    
};

const postItem = async (data, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, data)
    return response.ok
};

const putItem = async (id, data, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+'/'+id, data)
    return response.ok
};

const delItem = async (id, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id)
    return response.ok
};

export default {
    getItems,
    getByCategory,
    postItem,
    putItem,
    delItem
}