import axios from 'axios';
import {returnErrors} from './errorActions';
import {ORDERS_LOADING, GET_ORDERS, CHECKOUT, GET_CART} from './types';

export const getOrders = (id) => dispatch =>{
    dispatch(setOrdersLoading());
    axios.get(`/api/orders/${id}`)
    .then(res => dispatch({
        type:GET_CART,
        payload:res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const checkout = (id, source) => {
    axios.post(`/api/orders/${id}`,{source})
    .then(res => dispatch({
        type:CHECKOUT,
        payload:res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setOrdersLoading = () => {
    return {
        type:ORDERS_LOADING
    }
}