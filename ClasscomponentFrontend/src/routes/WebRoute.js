import React from 'react';

import { BrowserRouter as Router, Route} from "react-router-dom";


import store from '../Reduxstate/Client/store';
import {Provider} from 'react-redux';
import Home from '../views/Pages/Home';
import Detail from '../views/Pages/Detail/Detail';
import Reviews from '../views/Pages/Reviews/Reviews';
import AddReviews from '../views/Pages/AddReview/AddReview';
import Shipping from '../views/Pages/Shipping/ShippingOrder';
import Order from '../views/Pages/Order/Order';
import Faq from '../views/Pages/Faqpage';


class WebRoute extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Router>
                <Provider store={store} >
                    <Route exact path="/" render={props => <Home {...props}/>}/>
                    
                    <Route exact path="/home" name="Home" render={props => <Home {...props}/>} />
                    <Route exact path="/detail/:id" name="detail" render={props => <Detail {...props}/>} />
                    <Route exact path="/reviews" name="detail" render={props => <Reviews {...props}/>} />
                    <Route exact path="/addreview" name="detail" render={props => <AddReviews {...props}/>} />
                    <Route exact path="/shipping/:id" name="shipping" render={props => <Shipping {...props}/>} />
                    <Route exact path="/order" name="detail" render={props => <Order {...props}/>} />
                    <Route exact path="/faq" name="faq" render={props => <Faq {...props}/>} />

                </Provider>
            </Router> 
        );
    }
}

export default WebRoute;