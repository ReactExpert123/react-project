import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PaypalBtn from 'react-paypal-checkout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import stripe 
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement,
    injectStripe,
    StripeProvider,
    Elements,
} from 'react-stripe-elements';

import Header from '../../../containers/Header/Header'
import Footer from '../../../containers/Footer/Footer'
import {IMAGE_PATH_UPLOAD} from '../../../Reduxstate/Admin/action/type'

import ShipSummary from '../../../containers/ShippingOrderSummary/ShipSummary';
import ShippingInput from '../../../containers/ShippingOrderSummary/ShippingInput';
import './style.css';

import StripeCheckoutButton from '../../../containers/stripe/stripe.button';

import { connect } from "react-redux";
import { getPupDetailData ,placeOrderData,stripetest } from "../../../Reduxstate/Client/action/home";
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const stripePublicKey = "pk_test_51H4UySI3bvdrWcvM2uNpt5RZU5WTvczIMpDez7L94bCHX8bgktuGIVsqCoEHOEkCf3aEQpsVRIhWi5SLmLpVAXe200sJAWLTsO";

const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          letterSpacing: '0.025em',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#c23d4b',
        },
      },
    };
  };
  
class _SplitFieldsForm extends Component {
    state = {
      errorMessage: '',
    };
  
    handleChange = ({error}) => {
      if (error) {
        this.setState({errorMessage: error.message});
      }
    };
  
    handleSubmit = (evt) => {
      evt.preventDefault();
      if (this.props.stripe) {
        this.props.stripe.createToken().then(this.props.handleResult);
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };
    
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)} className = "caard-form">
          <div className="split-form">
            <div className = "row shipping-item">
                <div className = "col-md-3 shipping-left">
                    <label>Card number : </label>
                </div>
                <div className = "col-md-9">
                    <CardNumberElement
                    {...createOptions()}
                    onChange={this.handleChange}
                    />
                </div>
            </div>
            <div className = "row shipping-item">
                <div className = "col-md-3 shipping-left">
                    <label>Expiration date: </label>
                </div>
                <div className = "col-md-9">
                    <CardExpiryElement
                        {...createOptions()}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
            <div className = "row shipping-item">
                <div className = "col-md-3 shipping-left">
                    <label>CVC : </label>
                </div>
                <div className = "col-md-9">
                    <CardCVCElement {...createOptions()} onChange={this.handleChange} />
                </div>
            </div>
            <input type = "email" value = {this.state.buyer_email} hidden = {true}/>
            <input type = "text" value = {this.state.buyer_zip_code} hidden = {true}/>
            {/* <div className = "row shipping-item">
                <div className = "col-md-3 shipping-left">
                    <label>Postal code : </label>
                </div>
                <div className = "col-md-9">
                    <input
                        name="name"
                        type="text"
                        placeholder="94115"
                        className="StripeElement"
                        required
                    />
                </div>
            </div> */}
          </div>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
          <button className = "btn make-offer">Place Order</button>
        </form>
      );
    }
}
  
const SplitFieldsForm = injectStripe(_SplitFieldsForm);

class ShippingOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name : "",
            last_name : "",
            address : "",
            city : "",
            state : "",
            zip_code : "",
            phone_number : "",
            email : "",
            same_first_name : "",
            same_last_name : "",
            same_address : "",
            same_city : "",
            same_state : "",
            same_zip_code : "",
            same_phone_number : "",
            same_email : "",
            repeat_phone_number : "",
            repeat_email : "",
            hidden : false,
            disabled : false,
            shippingDogData : {},
            checkoutdisabled : false,
            classtab : "tab-checkout",
            message : "",
            className : "",
            classNamePhone : "",
            errors : {
                repeat_phone : "",
                repeat_email : ""
            }
        }
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getPupDetailData(id);
    }

    onchange = (e) => {
        this.setState({[e.target.id]:e.target.value})
    }

    onrepeat = (e) => {
        if (e.target.id === "repeat_phone_number") {
            if (this.state.phone_number != e.target.value) {
                this.setState({
                    classNamePhone : "empty-error"
                })
            } else {
                this.setState({
                    classNamePhone : ""
                })
            }
        }
        if (e.target.id === "repeat_email") {
            if (this.state.phone_number != e.target.value) {
                this.setState({
                    className : "empty-error"
                })
            } else {
                console.log(1);
                this.setState({
                    className : ""
                })
            }
        }
    }

    SameBilling(){
        this.setState({
            disabled : !this.state.disabled,
            same_first_name : this.state.first_name,
            same_last_name : this.state.last_name,
            same_address : this.state.address,
            same_city : this.state.city,
            same_state : this.state.state,
            same_zip_code : this.state.zip_code,
            same_phone_number : this.state.phone_number,
            same_email : this.state.email,
        })
    }

    componentWillReceiveProps(next){
        if (next.orderStatus.message === "Successfully ordered.") {
            this.setState({
                message : 'Successfully ordered.'
            });

            setInterval(() => { 
                this.setState({
                  message : ""
                })
                window.location.href = "/home"
              }, 3000);
        }
        this.setState({
            shippingDogData : next.clientdetaildata
        })
    }    

    tabCheckout = () =>{
        this.setState({
            classtab : "tab-checkout-true"
        })
    }

    handleResult = (tokendata) => {
        console.log(tokendata)
        this.props.stripetest({
            token: tokendata.token.id,
            price: this.state.shippingDogData[0].price,
            description : "It is the order of "+this.state.email+"for pup id " + this.state.shippingDogData[0].pup_id
        });

        let data = {
            delivery_first_name : this.state.same_first_name,
            delivery_last_name : this.state.same_last_name,
            delivery_address : this.state.same_address,
            delivery_city : this.state.same_city,
            delivery_state : this.state.same_state,
            delivery_zip_code : this.state.same_zip_code,
            delivery_phone_number : this.state.same_phone_number,
            buyer_first_name : this.state.first_name,
            buyer_last_name : this.state.last_name,
            buyer_address : this.state.address,
            buyer_city : this.state.city,
            buyer_state : this.state.state,
            buyer_zip_code : this.state.zip_code,
            buyer_phone_number : this.state.phone_number,
            buyer_email : this.state.email,
            pup_id : this.state.shippingDogData[0].pup_id,
            user_id : this.state.shippingDogData[0].user_id,
            price : this.state.shippingDogData[0].price,
            final_price : this.state.shippingDogData[0].price,
            discount : '0',
        }
        this.props.placeOrderData(data);
    }

    // placeOrder = () =>{
    //     console.log("__________",this.state.shippingDogData);
        
    // }
    render() {
        
        if(this.state.message === "Successfully ordered."){
            toast.success("Successfully ordered.!")
            // this.props.getCard();
            this.state.message = null;
          }
        

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

                        <ToastContainer />
                        <div className = "row shipping-order">
                                {
                                    this.state.shippingDogData.length == undefined ?
                                    <FadeLoader
                                      css={override}
                                      size={150}
                                      color={"#123abc"}
                                      loading={this.state.loading}
                                    /> : this.state.shippingDogData.map((item,i)=>{
                                        return (
                                        <div className = "col-md-3" key = {i}>
                                            <img src = {IMAGE_PATH_UPLOAD + item.photo_url} alt = "photo" />
                                            <div className = "shipping-pup">
                                                <font>{ item.pup_name}</font>
                                            </div>
                                            <ShipSummary 
                                                price = {item.price}
                                                total = {item.price}
                                            /> 
                                        </div>
                                        )
                                    })
                                }
                                
                            <div className = "col-md-9">
                                <div className = "billing">
                                    <div className = "billing-header">
                                        <font>Billing</font>
                                    </div>
                                    <div className = "billing-body">
                                        <ShippingInput 
                                            type = "text"
                                            name = "First Name :"
                                            id = "first_name"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Last Name :"
                                            id = "last_name"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Address :"
                                            id = "address"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "City :"
                                            id = "city"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "State :"
                                            id = "state"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "number"
                                            name = "Zip Code :"
                                            id = "zip_code"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Cell Phone :"
                                            id = "phone_number"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Repeat Cell Phone :"
                                            id = "repeat_phone_number"
                                            onChange = {this.onrepeat}
                                            className = {this.state.classNamePhone}
                                        />
                                        <ShippingInput 
                                            type = "email"
                                            name = "Email :"
                                            id = "email"
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "email"
                                            name = "Repeat Email :"
                                            id = "repeat_email"
                                            onChange = {this.onrepeat}
                                            className = {this.state.className}
                                        />
                                    </div>
                                </div>
                                <div className = "billing">
                                    <div className = "billing-header">
                                        <font>Shipping - NO PO BOX</font>
                                        <div className = "samebilling">
                                            <input type = "checkbox" onChange = {()=>this.SameBilling()}/>
                                            <font>Same as Billing</font>
                                        </div>
                                    </div>
                                    <div className = "billing-body">
                                        <ShippingInput 
                                            type = "text"
                                            name = "First Name :"
                                            id = "same_first_name"
                                            value = {this.state.same_first_name}
                                            hidden = {this.state.hidden}
                                            disabled = {this.state.disabled}
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Last Name :"
                                            id = "same_last_name"
                                            value = {this.state.same_last_name}
                                            hidden = {this.state.hidden}
                                            disabled = {this.state.disabled}
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Address :"
                                            id = "same_address"
                                            value = {this.state.same_address}
                                            hidden = {this.state.hidden}
                                            disabled = {this.state.disabled}
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "City :"
                                            id = "same_city"
                                            value = {this.state.same_city}
                                            hidden = {this.state.hidden}
                                            disabled = {this.state.disabled}
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "State :"
                                            id = "same_state"
                                            value = {this.state.same_state}
                                            hidden = {this.state.hidden}
                                            disabled = {this.state.disabled}
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Zip Code :"
                                            same = "same_zip_code"
                                            value = {this.state.same_zip_code}
                                            hidden = {this.state.hidden}
                                            disabled = {this.state.disabled}
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Cell Phone :"
                                            id = "same_phone"
                                            value = {this.state.same_phone_number}
                                            hidden = {this.state.hidden}
                                            disabled = {this.state.disabled}
                                            onChange = {this.onchange}
                                        />
                                        <ShippingInput 
                                            type = "text"
                                            name = "Prefered Airport :"
                                            id = "airport"
                                            onChange = {this.onchange}
                                        />
                                    </div>
                                </div>
                                <div className = "billing">
                                    <div className = "billing-header">
                                        <font>Shipping - NO PO BOX</font>
                                        <div className = "samebilling">
                                            
                                        </div>
                                    </div>
                                    <div className = "billing-body">
                                        
                                        <div className = "term-service">
                                            <label>Terms of sale - Customer is responsible for understanding our health guarantee in its entirety. The puppy will need to be picked up within 7 days of the availability data. For all deposits, full payment is due within 7 days of when the deposit is made. In order for us to hold puppy outside of 7days we charge a $30 per day kennel feed as well as we require that it is paid in full ahead of pick up, All kenneling requests must be approved by management prior to approval. All deposit are non-refundable/non-transferable.All sales are final once the order is submitted it can not be canceled. A 3% processing fee will be applied to all transactions using PayPal.</label>
                                            <div>
                                                <input type = "checkbox" onChange = {this.termsOfService}/>
                                                <span>By checking this box I understand that my $800.00 deposit is non-refundable/non-transferable and will hold the puppy for 7days</span>
                                            </div>
                                            <div>
                                                <input type = "checkbox" onChange = {this.termsOfService}/>
                                                <span>By checking this box I agree to the terms of the sale.</span>
                                            </div>
                                        </div>
                                        <div className = "row paypal-checkout">
                                                <div className = "col-md-4 offset-md-2">
                                                    {/* <button className = "btn make-offer" disabled = {this.state.checkoutdisabled} >PayPal</button> */}

                                                    {/* <PaypalBtn client={client} currency={'USD'} total={1.00}/> */}
                                                </div>
                                                <div className = "col-md-4">
                                                    {/* <StripeCheckoutButton
                                                        name = {this.state.first_name} 
                                                        price={this.state.shippingDogData.length == undefined? 0 :this.state.shippingDogData[0].price}
                                                        
                                                    /> */}
                                                    <button className = "btn make-offer" disabled = {this.state.checkoutdisabled} onClick = {()=>this.tabCheckout()}>Check Out</button>
                                                </div>
                                            </div>
                                        <div className = {this.state.classtab} >
                                            <StripeProvider apiKey={stripePublicKey}>
                                                <Elements>
                                                    <SplitFieldsForm handleResult={this.handleResult} />
                                                </Elements>
                                            </StripeProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
                <div className="App">
                    <header className="App-header">
                        
                        
                    </header>
                </div>
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    clientdetaildata : state.home.clientdetaildata,
    orderStatus : state.home.orderStatus
  });
  
  export default connect(
  mapStateToProps, {getPupDetailData,placeOrderData,stripetest}
  )(ShippingOrder);