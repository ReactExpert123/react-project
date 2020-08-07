import { 
  GET_PUP_SUCCESS,
  GET_PUP_ERROR,
  GET_PUP_SAVE_SUCCESS,
  GET_PUP_DETAIL_SUCCESS,
  GET_PUP_EDIT_DATA_SUCCESS,
  PUP_DELETE_SUCCESS,
  GET_PUP_EDIT_SUCCESS,
  PUP_STATUS_EDIT_SUCCESS,
  GET_BREED_DATA_SUCCESS,
  GET_BREED_DATA_ERROR
} from "../action/type";

  const isEmpty = require("is-empty");

  const initialState = {
    pupdata :{},
    DetailpupData : [],
    EditpupData : {},
    pupSave : "",
    flag : "",
    editnotification : {},
    breedData : {},
    EditStatus : {}
  };


  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PUP_SUCCESS:
            return {
                ...state,
                pupdata : action.payload
            };
        case GET_PUP_SAVE_SUCCESS:
            return {
                ...state,
                pupSave : action.payload
            };
        case GET_PUP_DETAIL_SUCCESS:
          return {
              ...state,
              DetailpupData : action.payload
          };     
        case GET_PUP_EDIT_DATA_SUCCESS:
          return {
              ...state,
              EditpupData : action.payload
          };
        case PUP_DELETE_SUCCESS:
          return {
              ...state,
              flag : action.payload
          };     
        case PUP_STATUS_EDIT_SUCCESS:
          return {
              ...state,
              editnotification : action.payload
          }; 
        case GET_BREED_DATA_SUCCESS:
            return {
                ...state,
                breedData : action.payload
            };     
        case GET_PUP_EDIT_SUCCESS:
            return {
                ...state,
                EditStatus : action.payload
            };     
        default:
            return state;
    }
  }