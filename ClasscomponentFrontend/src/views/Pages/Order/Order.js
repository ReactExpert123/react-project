import React, { Component } from 'react';
import { Container,Input,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap';

import Header from '../../../containers/Header/Header'
import Footer from '../../../containers/Footer/Footer'
import img from '../../../assets/img/background/review.jpg'

import OrderSummary from '../../../containers/OrderComponent/OrderSummary';
import Introduction from '../../../containers/OrderComponent/Introduction';
import './style.css';

class Order extends Component {

    render() {
        return (
            <div className = "home-width">
                <Header />
                <Container>
                    <div className = "reviews-state">

                        <div className = "row">
                            <div className = "col-md-12 shipping-title">
                                <label>ADOPTION ESSENTIALS AND OTHER OPTIONAL PRODUCTS FOR YOUR NEW FAMILY MEMBER!</label>
                            </div>
                        </div>
                        <div className = "row shipping-order">
                            <div className = "col-md-4">
                                <img src = {img} alt = "photo" />
                                <div className = "shipping-pup">
                                    <font>TASHA</font>
                                </div>
                                <OrderSummary />
                                
                                <div className = "shipping-arrival">
                                    <div className = "summary-header">
                                        <font>ARRIVIAL METHOD</font>
                                    </div>
                                    <hr />
                                    <div className = "summary-body">
                                        <div className = "row">
                                            <input type = "radio" name = "pickup" />
                                            <label className = "text-left">Adoption Fee</label>
                                            <span className = "text-right">$4000</span>
                                        </div>
                                        <div className = "row">
                                            <input type = "radio" name = "pickup" />
                                            <label className = "text-left">Prevent Meds</label>
                                            <span className = "text-right">0</span>
                                        </div>
                                    </div>
                                </div>
                                <div className = "shipping-arrival">
                                    <div className = "summary-header">
                                        <font>REDEEM GIFT CARD OR COUPON</font>
                                    </div>
                                    <hr />
                                    <div className = "summary-body">
                                    <InputGroup>
                                        <Input placeholder="Enter Code" />
                                        <InputGroupAddon addonType="append">
                                        <InputGroupText>Apply</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    </div>
                                </div>

                                <div className = "shipping-arrival">
                                    <div className = "summary-body">
                                        <InputGroup>
                                            <Input placeholder="Pay In Full" />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                            <div className = "col-md-8">
                                <Introduction />
                                <Introduction />
                                <Introduction />
                                <Introduction />
                                <Introduction />
                                <Introduction />
                                <Introduction />
                                <Introduction />
                            </div>
                        </div>

                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Order;
