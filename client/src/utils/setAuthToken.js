import axios from "axios";

/*
    Method Name:    setAuthToken
    Description:    sets default authorization header for future requests, 
                    as well as deletes current auth header
    Parameters:
                    1) token :  the passed token to set as header, 
                                if null will instead delete the current header
*/

const setAuthToken = token => {
    if(token) {
        // apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;