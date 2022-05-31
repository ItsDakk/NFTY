// npm install apisauce in order to install apisauce
import { create } from "apisauce";

//
const apiClient = (cancelToken) => create ({
    // This takes in an object
    // Always use triple === in React
    // If it's not equal to locahost, then we are going to make it eqaul to nothing, because we are going to run our React app at the same time
    baseURL: window.location.host === '127.0.0.1' || 'localhost' ? 'http://127.0.0.1:5000':'',
    cancelToken
})

export default apiClient