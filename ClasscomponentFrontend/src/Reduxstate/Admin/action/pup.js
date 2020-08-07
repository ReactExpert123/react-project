import axios from 'axios';
import { 
    GET_PUP_SUCCESS,
    GET_PUP_ERROR, 
    Base_URL,
    GET_PUP_SAVE_SUCCESS,
    GET_PUP_EDIT_SUCCESS,
    GET_PUP_EDIT_ERROR,
    GET_PUP_DETAIL_SUCCESS,
    GET_PUP_DETAIL_ERROR,
    GET_PUP_EDIT_DATA_SUCCESS,
    GET_PUP_EDIT_DATA_ERROR,
    PUP_DELETE_SUCCESS,
    PUP_STATUS_EDIT_SUCCESS,
    GET_BREED_DATA_SUCCESS,
    GET_BREED_DATA_ERROR,
} from "./type";

export const getAllStorePUP = (userData) => dispatch => {
    console.log(userData);
    axios.post(Base_URL + '/pup/read/store',{}, userData)
        .then( res => {
            dispatch({
                type:GET_PUP_SUCCESS,
                payload:res.data.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_ERROR,
        payload:"error"
    }))
}

export const getAllSoldPUP = (userData) => dispatch => {

    axios.post(Base_URL + '/pup/read/sold', {} , userData)
    .then( res => {
            dispatch({
                type:GET_PUP_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_ERROR,
        payload:"error"
    }))
}
export const getAllOrderdPUP = (userData) => dispatch => {

    axios.post(Base_URL + '/pup/read/ordered', {} , userData)
    .then( res => {
            dispatch({
                type:GET_PUP_SUCCESS,
                payload:res.data.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_ERROR,
        payload:"error"
    }))
}

export const Pupsave = (userData,headers) => dispatch => {
    axios.post(Base_URL + '/pup/create', userData , headers)
        .then( res => {
            dispatch(
                {
                    type:GET_PUP_SAVE_SUCCESS,
                    payload:res.data.message
                }
            )
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_ERROR,
        payload:"error"
    }))
}

export const PupdeleteData = (data) => dispatch => {
    axios.delete(Base_URL + '/pup/delete/' + data.id , data)
        .then( res => {
            dispatch(
                {
                    type:PUP_DELETE_SUCCESS,
                    payload:res.data.message
                }
            )
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_ERROR,
        payload:"error"
    }))
}

export const getPupEditData = (userData) => dispatch => {
    axios.get(Base_URL + '/pup/details/' + userData.id, userData)
        .then( res => {
            dispatch({
                type:GET_PUP_EDIT_DATA_SUCCESS,
                payload:res.data.data
                })
            }
        )
        .catch(err=> dispatch({
            type:GET_PUP_EDIT_DATA_ERROR,
            payload:"error"
        }))
}

export const PupEditSave = (header , userData ,id) => dispatch => {
    console.log(userData);
    axios.post(Base_URL + '/pup/update/'+ id , userData ,header)
        .then( res => {
            console.log(res);
            dispatch({
                type:GET_PUP_EDIT_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_EDIT_ERROR,
        payload:"error"
    }))
}

export const getDetailPUPData = (userData) => dispatch => {
    axios.get(Base_URL + '/pup/details/'+ userData.id, userData)
        .then( res => {
            dispatch({
                type:GET_PUP_DETAIL_SUCCESS,
                payload : res.data.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_DETAIL_ERROR,
        payload:"error"
    }))
}

export const editStatus = ( userData, id , header) => dispatch => {
    axios.post(Base_URL + '/pup/statusUpdate/'+ id, userData, header)
        .then( res => {
            dispatch({
                type:PUP_STATUS_EDIT_SUCCESS,
                payload : res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_PUP_DETAIL_ERROR,
        payload:"error"
    }))
}

export const GetAllBreed = ( header) => dispatch => {
    axios.post(Base_URL + '/breed/read', {}, header)
        .then( res => {
            dispatch({
                type:GET_BREED_DATA_SUCCESS,
                payload : res.data.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_BREED_DATA_ERROR,
        payload:"error"
    }))
}
