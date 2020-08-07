import axios from 'axios';
import { 
    REGISTER_SUCEESS,
    SET_USER, 
    LOGIN_ERRORS,
    Base_URL,
    LOGOUT_SUCCESS,
    GET_ERRORS,
    PROFILE_REGISTER_SUCCESS,
    PROFILE_REGISTER_ERROR,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR
} from "./type";

export const registerUser = (userData, history) => dispatch => {
    axios.post(Base_URL + '/auth/register', userData)
        .then( res => {
            dispatch({
                type:REGISTER_SUCEESS,
                payload:res.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_ERRORS,
        payload:"error"
    }))
}


export const loginUser = (userData, history) => dispatch => {
    axios.post(Base_URL + '/auth/login', userData)
         .then( res => {
             console.log(res);
            if(res.data.status == "success")
            {
                localStorage.setItem("id", res.data.data.id);
                localStorage.setItem("username", res.data.data.user_name);
                localStorage.setItem("api_token", res.data.data.api_token);
                localStorage.setItem("user_image", res.data.data.photo_url);
                localStorage.setItem("chatUid", res.data.data.chatUid);
                // window.location.href = "/admin/dashboard";
                // dispatch(setCurrentUser(res.data));
                dispatch({
                        type:SET_USER,
                        payload:res.data.message
                    })
            }
            
            else if(res.data.status == "errors") {
                dispatch({
                        type:LOGIN_ERRORS,
                        payload:res.data.message
                    })
                }
            }
        )
        .catch(err=> dispatch({
            type:GET_ERRORS,
            payload:"error"
        })
    )
}


export const setCurrentUser = data => {
    return {
      type: SET_USER,
      payload: data
    };
  };

export const Userprofile = (userData,headers) => dispatch => {
    console.log(headers);
    axios.post(Base_URL + '/auth/registerProfile', userData, headers)
        .then( res => {
            dispatch({
                type:PROFILE_REGISTER_SUCCESS,
                payload:res.data
            })
        }
    )
    .catch(err=> dispatch({
        type:PROFILE_REGISTER_ERROR,
        payload:"error"
    }))
}


export const getProfileData = (headers) => dispatch => {
    axios.post(Base_URL + '/auth/getProfileData', {}, headers)
        .then( res => {
            dispatch({
                type:GET_PROFILE_SUCCESS,
                payload:res.data.data
            })
        }
    )
    .catch(err=> dispatch({
        type:GET_PROFILE_ERROR,
        payload:"error"
    }))
}

export const logout = (history) => dispatch => {
    localStorage.removeItem("id");
    localStorage.removeItem("firstname");
    localStorage.removeItem("bank");
    localStorage.removeItem("balance");
    window.location.href = "/";

    dispatch({
        type:LOGOUT_SUCCESS,
        payload:"success"
    })

}


