import { 
  GET_CUSTOMER_SUCCESS,
  GET_DELETE_CUSTOMER_SUCCESS,
  GET_CREATE_CUSTOMER_SUCCESS,
  FIRE_REGISTER_SUCEESS  
} from "../action/type";

  const initialState = {
    isAuthenticated: false,
    customerData :{},
    flag : "",
    userUID : ""
  };


  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                customerData : action.payload
            };
        case GET_DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                flag : action.payload
            };    
        case GET_CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                flag : action.payload
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