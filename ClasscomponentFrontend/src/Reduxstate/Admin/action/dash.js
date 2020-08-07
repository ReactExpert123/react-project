import axios from 'axios';
import { 
    GET_DASH_DATA_SUCCESS,
    GET_DASH_DATA_ERROR, 
    Base_URL,
    
} from "./type";

export const getDashboardData = (userData,status) => dispatch => {
    console.log(status);
    if(status === "read"){
        axios.post(Base_URL + '/dash/read',{}, userData) 
    
        .then( res => {
            console.log(res);
            dispatch({
                type:GET_DASH_DATA_SUCCESS,
                payload:res.data
                })
            }
        )
        .catch(err=> dispatch({
        type:GET_DASH_DATA_ERROR,
        payload:"error"
        }))
    } else {
        axios.post(Base_URL + '/dash/read?status=key',{}, userData)
        .then( res => {
            console.log(res);
            dispatch({
                type:GET_DASH_DATA_SUCCESS,
                payload:res.data
                })
            }
        )
        .catch(err=> dispatch({
            type:GET_DASH_DATA_ERROR,
            payload:"error"
        }))
    }
}