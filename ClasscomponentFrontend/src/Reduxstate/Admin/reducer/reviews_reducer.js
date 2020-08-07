import { GET_REVIEWS_SUCCESS} from "../action/type";

  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    reviewsData :{}
  };


  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                reviewsData : action.payload
            };
        // case GET_PUP_SAVE_SUCCESS:
        //     return {
        //         ...state,
        //         pupSave : action.payload
        //     };    
        default:
            return state;
    }
  }