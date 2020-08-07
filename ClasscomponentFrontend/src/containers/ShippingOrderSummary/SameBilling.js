import React, { Component } from 'react';

import ShippingInput from './ShippingInput'

class SameBilling extends Component {
    
    render() {
        return (
            <div className = "billing">
                <div className = "billing-header">
                    <font>Shipping - NO PO BOX</font>
                    <div className = "samebilling">
                        <input type = "checkbox" />
                        <font>Same as Billing</font>
                    </div>
                </div>
                <div className = "billing-body">
                    <ShippingInput 
                        name = "First Name :"
                    />
                    <ShippingInput 
                        name = "Last Name :"
                    />
                    <ShippingInput 
                        name = "Address :"
                    />
                    <ShippingInput 
                        name = "City :"
                    />
                    <ShippingInput 
                        name = "State :"
                    />
                    <ShippingInput 
                        name = "Zip Code :"
                    />
                    <ShippingInput 
                        name = "Cell Phone :"
                    />
                    <ShippingInput 
                        name = "Email :"
                    />
                </div>
            </div>
        );
    }
}

export default SameBilling;