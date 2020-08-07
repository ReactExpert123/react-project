import { 
    GET_CLIENT_PUP_READ_SUCCESS,
    GET_CLIENT_PUP_READ_ERROR,
    GET_CLIENT_REVIEW_READ_SUCCESS,
    GET_CLIENT_REVIEW_READ_ERROR,
    GET_CLIENT_REVIEW_ADD_SUCCESS,
    GET_CLIENT_REVIEW_ADD_ERROR,
    GET_CLIENT_DETAIL_SUCCESS,
    GET_ORDER_SUCCESS,
    GET_SHIPPING_INFO_SUCCESS,
    FIRE_REGISTER_SUCEESS
} from "../../Admin/action/type";

    const initialState = {
        isAuthenticated: false,
        clientpupdata :{},
        clientreviewdata : {},
        clientdetaildata : {},
        orderStatus : "",
        ShippingInfo : {},
        addReviewStatus : "",
        userUID : ""
    };


export default function(state = initialState, action) 
{
    switch (action.type) {
        case GET_CLIENT_PUP_READ_SUCCESS:
            return {
                ...state,
                clientpupdata : action.payload
            };
        case GET_CLIENT_REVIEW_READ_SUCCESS:
            return {
                ...state,
                clientreviewdata : action.payload
            };
        case GET_CLIENT_DETAIL_SUCCESS:
            return {
                ...state,
                clientdetaildata : action.payload
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderStatus : action.payload
            };
        case GET_SHIPPING_INFO_SUCCESS:
            return {
                ...state,
                ShippingInfo : action.payload
            };    
        case GET_CLIENT_REVIEW_ADD_SUCCESS:
            return {
                ...state,
                addReviewStatus : action.payload
            };    
        case FIRE_REGISTER_SUCEESS:
            return {
                ...state,
                userUID : action.payload
            };    
        default:
            return state;
    }
}