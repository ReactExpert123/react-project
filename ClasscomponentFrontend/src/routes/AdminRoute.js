import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";


import store from '../Reduxstate/Admin/store';
import {Provider} from 'react-redux';


const Login = React.lazy(() => import('../views/admin/Login'));
const Register = React.lazy(() => import('../views/admin/Register'));
// Containers
const SellerAdminLayout = React.lazy(() => import('./../containers/SellerAdminLayout'));

class AdminRoute extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Router>
                <Provider store={store} >
                    <Route exact path="/admin" name="Home" render={props => <Login {...props}/>}/>
                    <Route exact path="/admin/register" name="Register" render={props => <Register {...props}/>} />
                    <Route exact path="/admin/dashboard" name="dashboard" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/dashboard?status=key" name="dashboard" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/pup/store" name="store" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/pup/sold" name="sold" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/pup/ordered" name="Ordered" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/customer" name="customer" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/review" name="review" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/pup/add" name="add" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/pup/detail/:id" name="detail" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/pup/edit/:id" name="edit" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/reviewData/:id" name="review" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/message" name="message" render={props => <SellerAdminLayout {...props}/>} />
                    <Route exact path="/admin/hideData" name="hide" render={props => <SellerAdminLayout {...props}/>} />
                </Provider>
            </Router> 
        );
    }
}

export default AdminRoute;