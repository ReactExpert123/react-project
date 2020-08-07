import axios from 'axios';
import { GET_REVIEWS_SUCCESS, Base_URL,GET_REVIEWS_ERROR} from "./type";

export const getAllReviews = (userData) => dispatch => {
    console.log(userData);
    axios.get(Base_URL + '/seller/review/details/' + userData.id , userData)
        .then( res => {
            dispatch({
                type:GET_REVIEWS_SUCCESS,
                payload:res.data
              })
        }
    )
    .catch(err=> dispatch({
        type:GET_REVIEWS_ERROR,
        payload:"error"
    }))
}
