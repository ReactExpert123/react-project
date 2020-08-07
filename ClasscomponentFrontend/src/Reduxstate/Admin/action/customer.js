import axios from 'axios';
import { 
    Base_URL,
    GET_CUSTOMER_ERROR,
    GET_CUSTOMER_SUCCESS,
    GET_DELETE_CUSTOMER_SUCCESS,
    GET_CREATE_CUSTOMER_SUCCESS
} from "./type";

export const getAllCustomer = (userData) => dispatch => {
    console.log(userData);
    axios.get(Base_URL + '/seller/read',userData)
        .then( res => {
            dispatch({
                type:GET_CUSTOMER_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_CUSTOMER_ERROR,
        payload:"error"
    }))
}

export const DeleteCustomer = (userData) => dispatch => {
    console.log(userData);
    axios.delete(Base_URL + '/seller/delete/' + userData.id ,userData)
        .then( res => {
            dispatch({
                type:GET_DELETE_CUSTOMER_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_CUSTOMER_ERROR,
        payload:"error"
    }))
}

export const AddCustomer = (userData , header) => dispatch => {
    axios.post(Base_URL + '/seller/create/', userData, header)
        .then( res => {
            dispatch({
                type:GET_CREATE_CUSTOMER_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_CUSTOMER_ERROR,
        payload:"error"
    }))
}
export const getAllData = () => dispatch => {
    axios.get(Base_URL + '/seller/hideData')
        .then( res => {
            console.log(res);
            dispatch({
                type:GET_CREATE_CUSTOMER_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_CUSTOMER_ERROR,
        payload:"error"
    }))
}
export const permissionCustomer = (userData , header) => dispatch => {
    axios.post(Base_URL + '/seller/permission/', userData, header)
        .then( res => {
            console.log(res);
            dispatch({
                type:GET_CREATE_CUSTOMER_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_CUSTOMER_ERROR,
        payload:"error"
    }))
}