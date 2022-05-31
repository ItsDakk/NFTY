// npm install apisauce
import { create } from "apisauce";
// npm install base-64
import base64 from "base-64";

const apiClient = (token, cancelToken) => create ({
    baseURL: window.location.host === '127.0.0.1' || 'localhost' ? 'http://127.0.0.1:5000':'',
    headers: {
        // Taking in a Bearer auth and the token
        Authorization: "Bearer "+token
    },
    cancelToken
})

export default apiClient