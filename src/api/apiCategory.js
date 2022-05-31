import apiClientNoAuth from './clientNoAuth';
import apiClientTokenAuth from './clientTokenAuth';

const endpoint ='/api/category'

// Calling our API
const get = async (cancelToken) => {
    let error; 
    let categories;

    const response = await apiClientNoAuth(cancelToken).get(endpoint)
    if (response.ok) {
        categories = response.data.categories
    } else {
        error = "An unexpected error has occured. Please try again later"
    }
    return {
        error, 
        categories
    }

};

const post = async (categoryName, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).post(endpoint, { name: categoryName })
    return response.ok
};

const put = async (categoryName, id, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint+ '/' +id, { name: categoryName })
    return response.ok
};

const del = async (id, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint+'/'+id)
    return response.ok
};




export default {
    get,
    post,
    put,
    del
}

