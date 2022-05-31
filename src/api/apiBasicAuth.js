import apiClient from "./clientBasicAuth";

const endpoint = './api/login';

// Is taking in the same information that was needed in our clientBasicAuth file
// The order of the parameters does have to be the same
export const getUser = async (email, password, cancelToken) => {
    // Used to store the information that we are getting back
    let error;
    let user;

    const response = await apiClient(email, password, cancelToken).get(endpoint)
    if (response.ok) {
        user = response.data
        // error 401 means unauthorized meaning the user gave us an incorrect email or password
    } else if (response.status === 401) {
        error = "Invalid Email/Password Combo"
    } else {
        error = "An Unexpected Error has Occured. Please Try Again Later."
    }
    return {
        // This is returning a dictionary
        error, 
        user
    };
};