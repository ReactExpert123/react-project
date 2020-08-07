

import { 
    GET_DASH_DATA_SUCCESS,
    GET_DASH_DATA_ERROR, 
    } from "../action/type";
    
    const initialState = {
        dashData :{},
    };
    
    
    export default function(state = initialState, action) {
        switch (action.type) {
            case GET_DASH_DATA_SUCCESS:
                return {
                    ...state,
                    dashData : action.payload
                };
            case GET_DASH_DATA_ERROR:
                return {
                    ...state,
                    flag : action.payload
                }; 
            default:
                return state;
        }
    }