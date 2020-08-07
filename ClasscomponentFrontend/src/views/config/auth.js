import { auth } from "./config";
import {
  FIRE_REGISTER_SUCEESS,
  GET_ERRORS
} from '../../Reduxstate/Admin/action/type'

// export function signup(email, password) {
//   return auth().createUserWithEmailAndPassword(email, password)
//         // .then(data => {  
//         //   var UID = data.user.uid;
//         //   console.log(UID);
//         //   return UID;

//         // })
//         // .catch(error => {
//         //   console.log(error);
//         // });
// }

export const signup = (email, password) => dispatch => {
  auth().createUserWithEmailAndPassword(email, password)
      .then( res => {
          dispatch({
              type:FIRE_REGISTER_SUCEESS,
              payload:res.user.uid
          })
      }
  )
  .catch(err=> dispatch({
      type:GET_ERRORS,
      payload:"error"
  }))
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}

export function logout() {
  return auth().signOut();
}
