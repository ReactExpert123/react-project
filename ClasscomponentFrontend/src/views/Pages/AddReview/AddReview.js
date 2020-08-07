import React, { Component } from 'react';
import { Container,Form,FormGroup,Col,Label,Input } from 'reactstrap';

import Header from '../../../containers/Header/Header'
import Footer from '../../../containers/Footer/Footer'
import { connect } from "react-redux";
import { AddReviewWrite,getShippingInfo } from "../../../Reduxstate/Client/action/home";
import './style.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AddReview extends Component {
    constructor(props){
        super(props);
        this.state = {
            pup_name : "",
            owner_name : "",
            email : "",
            pup_pic : "/uploads/pups/pexels.jpeg",
            phone_num : "",
            location : "",
            pup_breed : "",
            story : "",
            Shipping : [],
            message : "",
            disabled : true
        }
    }

    onchange = (e) => {
        this.setState({[e.target.id]:e.target.value})
    }

    // onchangefile=(e)=>{
    //     this.setState({
    //         pup_pic: e.target.files[0],
    //         loaded: 0,
    //     })
    // }

    onsubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
            data.append('pup_name', this.state.pup_name) 
            data.append('owner_name', this.state.owner_name) 
            data.append('email', this.state.breed_id) 
            data.append('pup_pic', this.state.pup_pic) 
            data.append('phone_num', this.state.phone_num) 
            data.append('location', this.state.location) 
            data.append('pup_breed', this.state.pup_breed) 
            data.append('shipment_id', this.state.Shipping[0].shipments_id) 
            data.append('story', this.state.story) 
        this.props.AddReviewWrite( data );
    }

    onfocus = () => {
        let data = {
            email : this.state.email
        }
        this.props.getShippingInfo(data)
    }

    componentWillReceiveProps(nextProps){
       if (nextProps.addReviewStatus === "Successfully added your review about this puppy.") {
           this.setState({
                message : nextProps.addReviewStatus,
                disabled : true
           })
       } else if(nextProps.ShippingInfo.message === "success"){
            this.setState({
                Shipping : nextProps.ShippingInfo.data,
                disabled : false
            })
       }
        
    }
    render() {
        // console.log('>>>>>>>>>>>>',this.props.ShippingInfo)
        // const toast_message = this.state.message

        console.log(this.state.message);
        if(this.state.message === "Successfully added your review about this puppy."){
            toast.success("Successfully added your review about this puppy.")
            // this.props.getCard();
            this.state.message = null;
        }

        return (
        <div className = "home-width">
            <Header />
            <Container>
                <div className = "reviews-state">

                    <div className = "row">
                        <div className = "col-md-8 offset-md-2 title">
                            <label>Please fill out the information below. Your referall will be reveiewed  before it is posted</label>
                        </div>
                    </div>
                    <div className = "row addreview">
                        <Form onSubmit = {this.onsubmit} encType='multipart/form-data' className="col-md-12">
                            <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Owner Name</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <input type="text" id="owner_name" name="pup_name" placeholder="plase enter pup name" onChange = {this.onchange} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Email</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <input type="email" id="email" name="email" placeholder="plase enter your email" onChange = {this.onchange} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Phone number</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <input type="number" id="phone_num" name="phone_num" placeholder="plase enter your Phone number" onChange = {this.onchange} onFocus = {()=>this.onfocus()} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Location</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <input type="text" id="location" name="location" placeholder="plase enter your location" onChange = {this.onchange} required disabled = {this.state.disabled}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Pup Name</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <select onChange = {this.onchange} required disabled = {this.state.disabled}>
                                        <option></option>
                                        { this.state.Shipping.length === undefined ? 
                                            <option></option>  :
                                            this.state.Shipping.map((item,i)=>{
                                                return (
                                                    <option key = {i}>{item.pup_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Pup Breed</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <select onChange = {this.onchange} required disabled = {this.state.disabled}>
                                        <option></option>
                                        { this.state.Shipping.length === undefined ? 
                                            <option></option> :
                                            this.state.Shipping.map((item,i)=>{
                                                return (
                                                    <option key = {i}>{item.breed_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Col>
                            </FormGroup>
                            {/* <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Pup Picture</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <input type="file" id="pup_pic" name="pup_pic" placeholder="plase enter pup name" onChange = {this.onchangefile} required disabled = {this.state.disabled}/>
                                </Col>
                            </FormGroup> */}
                            <FormGroup row>
                                <Col md="3" className = "addreviewItem">
                                    <Label htmlFor="text-input">Your Story</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <textarea type="text" id="story" name="story" rows = "10" placeholder="plase enter pup name" onChange = {this.onchange} required disabled = {this.state.disabled}/>
                                </Col>
                            </FormGroup>
                            <div className = "row">
                                <div className = "col-md-4 offset-md-4 submit-button">
                                    <button className = "btn make-offer" disabled = {this.state.disabled}>submit</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                   
                </div>
                <ToastContainer />
            </Container>
            <Footer />
        </div>
        );
    }
}
const mapStateToProps = state => ({
    addReviewStatus : state.home.addReviewStatus,
    ShippingInfo : state.home.ShippingInfo
  });
  
  export default connect(
  mapStateToProps, {AddReviewWrite,getShippingInfo}
  )(AddReview);