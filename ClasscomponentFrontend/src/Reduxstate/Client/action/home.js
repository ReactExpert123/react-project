import axios from 'axios';
import { 
    Base_URL,
    GET_CLIENT_PUP_READ_SUCCESS,
    GET_CLIENT_PUP_READ_ERROR,
    GET_CLIENT_REVIEW_READ_SUCCESS,
    GET_CLIENT_REVIEW_READ_ERROR,
    GET_CLIENT_REVIEW_ADD_SUCCESS,
    GET_CLIENT_REVIEW_ADD_ERROR,
    GET_CLIENT_DETAIL_SUCCESS,
    GET_CLIENT_DETAIL_ERROR,
    GET_ORDER_SUCCESS,
    GET_SHIPPING_INFO_SUCCESS,
    GET_SHIPPING_INFO_ERROR
} from "../../Admin/action/type";

export const getAllPupClientRead = () => dispatch => {
    axios.get(Base_URL + '/client/read')
        .then( res => {
            console.log(res.data.data);
            dispatch({
                type:GET_CLIENT_PUP_READ_SUCCESS,
                payload:res.data.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_CLIENT_PUP_READ_ERROR,
        payload:"error"
    }))
}

export const getstatusPupClientRead = (param) => dispatch => {
    axios.get(Base_URL + '/client/getPupSpec/'+ param)
        .then( res => {
            console.log(res.data.data);
            dispatch({
                type:GET_CLIENT_PUP_READ_SUCCESS,
                payload:res.data.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_CLIENT_PUP_READ_ERROR,
        payload:"error"
    }))
}

export const getBreedFilter = (id) => dispatch => {
    axios.get(Base_URL + '/client/getPupBreed/'+ id)
        .then( res => {
            console.log(res.data.data);
            dispatch({
                type:GET_CLIENT_PUP_READ_SUCCESS,
                payload:res.data.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_CLIENT_PUP_READ_ERROR,
        payload:"error"
    }))
}


export const getAllReviewRead = () => dispatch => {
    axios.get(Base_URL + '/client/readReviews')
        .then( res => {
            console.log(res.data.data);
            dispatch({
                type:GET_CLIENT_REVIEW_READ_SUCCESS,
                payload:res.data.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_CLIENT_REVIEW_READ_ERROR,
        payload:"error"
    }))
}

export const AddReviewWrite = (data) => dispatch => {
    console.log(data);
    axios.post(Base_URL + '/client/addReviews',data)
        .then( res => {
            console.log(res.data);
            dispatch({
                type:GET_CLIENT_REVIEW_ADD_SUCCESS,
                payload:res.data.message
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_CLIENT_REVIEW_ADD_ERROR,
        payload:"error"
    }))
}

export const getPupDetailData = (id) => dispatch => {
    axios.get(Base_URL + '/client/pupDetail/'+id)
        .then( res => {
            console.log(res.data.data);
            dispatch({
                type:GET_CLIENT_DETAIL_SUCCESS,
                payload:res.data.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_CLIENT_DETAIL_ERROR,
        payload:"error"
    }))
}

export const placeOrderData = (data) => dispatch => {
    console.log(data);
    axios.post(Base_URL + '/buyer/create',data)
        .then( res => {
            console.log(res);
            dispatch({
                type:GET_ORDER_SUCCESS,
                payload:res.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_CLIENT_DETAIL_ERROR,
        payload:"error"
    }))
}

export const getShippingInfo = (data) => dispatch => {
    axios.post(Base_URL + '/client/shipInfo',data)
        .then( res => {
            console.log(res.data);
            dispatch({
                type:GET_SHIPPING_INFO_SUCCESS,
                payload:res.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_SHIPPING_INFO_ERROR,
        payload:"error"
    }))
}

export const stripetest = (data) => dispatch => {
    axios.post(Base_URL + '/stripe-subscribe',data)
        .then( res => {
            console.log(res);
        }
    )
    .catch(err=> dispatch({
        type:GET_SHIPPING_INFO_ERROR,
        payload:"error"
    }))
}