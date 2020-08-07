import React, { Component } from 'react';

import ShippingInput from './ShippingInput'

class Billing extends Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }

    onchange = (e) => {
        console.log(e.target.value);
    }
    render() {
        return (
            <div className = "billing">
                <div className = "billing-header">
                    <font>Billing</font>
                </div>
                <div className = "billing-body">
                    <ShippingInput 
                        name = "First Name :"
                        id = "first_name"
                        onChange = {this.onchange}
                    />
                    <ShippingInput 
                        name = "Last Name :"
                        id = "last_name"
                    />
                    <ShippingInput 
                        name = "Address :"
                        id = "address"
                    />
                    <ShippingInput 
                        name = "City :"
                        id = "city"
                    />
                    <ShippingInput 
                        name = "State :"
                        id = "state"
                    />
                    <ShippingInput 
                        name = "Zip Code :"
                        id = "zip_code"
                    />
                    <ShippingInput 
                        name = "Cell Phone :"
                        id = "phone_number"
                    />
                    <ShippingInput 
                        name = "Repeat Cell Phone :"
                        id = "repeat_phone_number"
                    />
                    <ShippingInput 
                        name = "Email :"
                        id = "email"
                    />
                    <ShippingInput 
                        name = "Repeat Email :"
                        id = "repeat_email"
                    />
                </div>
            </div>
        );
    }
}

export default Billing;