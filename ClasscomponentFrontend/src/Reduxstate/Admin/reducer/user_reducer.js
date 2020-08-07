import { 
  REGISTER_SUCEESS, 
  REGISTER_ERRORS, 
  SET_USER,
  CHANGE_SUCCESS,
  CHANGE_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_ERRORS,
  PROFILE_REGISTER_SUCCESS,
  PROFILE_REGISTER_ERROR,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS
} from "../action/type";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated : false,
    user: "",
    status : "",
    logout : "",
    flag: {},
    error : "",
    profileData : {}
    
  };


  export default function(state = initialState, action) {
    switch (action.type) {
      case REGISTER_SUCEESS:
        return {
          ...state,
          flag: action.payload
        };
      case REGISTER_ERRORS:
        return {
          ...state,
          flag: action.payload
        };
      case LOGIN_ERRORS:
        console.log('Login errors',action.payload);
        return {
          ...state,
          error : action.payload
        };
      case SET_USER:
        console.log(action.payload);
        return {
          ...state,
          user: action.payload,
          isAuthenticated : true
        };
      case PROFILE_REGISTER_SUCCESS:
        return {
          ...state,
          status : action.payload
        };
      case LOGOUT_SUCCESS:
          return {
            ...state,
            logout : action.payload
          };
      case PROFILE_REGISTER_ERROR:
        return {
          ...state,
          status : action.payload
        };
      case GET_PROFILE_SUCCESS:
          return {
            ...state,
            profileData : action.payload
          };
      default:
        return state;
    }
  }