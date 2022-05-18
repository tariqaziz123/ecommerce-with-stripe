import axios from 'axios';
import { type } from 'express/lib/response';
import {returnErrors} from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

export const  loadUser = () => (dispatch,getState) => {

    // usER lOADING
    dispatch({type:USER_LOADING});

    axios.get('/api/user', tokenConfig(getState))
    .then(res => dispatch({
        type:USER_LOADED,
        payload: res.data
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:AUTH_ERROR
        })
    })
}

export const register = ({name, email, password}) => dispatch =>{
    const config = {
        headers: {
            'CONTENT-TYPE': 'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('/api/login', body, config)
    .then(res => dispatch({
        type:LOGOUT_SUCCESS,
        payload: res.data
    }))
    .catch(err => {

        dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'));
        dispatch({
            type: 'LOGIN_FAIL'
        });
    }
    );
}

// logout user
export const logout = () => {
    return{
        type:LOGOUT_SUCCESS
    }
}


// Setup config/headers and token
export const tokenConfig = getState => {
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type":"application/json",
        }        
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}