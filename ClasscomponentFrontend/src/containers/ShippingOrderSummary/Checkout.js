import React, { Component } from 'react';

import ShippingInput from './ShippingInput'

class CheckOut extends Component {

    render() {
        return (
            <div className = "billing">
                <div className = "billing-header">
                    <font>Shipping - NO PO BOX</font>
                    <div className = "samebilling">
                        
                    </div>
                </div>
                <div className = "billing-body">
                    
                    <div className = "term-service">
                        <label>Terms of sale - Customer is resposible for understanding our health gurantee in its entirty.The puppy will neeed picked up within 7 days of the availabilty data. For all deposits full payment is due within 7 days of when the deposit is made. In order for us to hold puppy outside of 7days we charge a $30 per days kennel fedd as well as we require that it is paid in full a head of pick up, All kenneling request must be approved by management prior to approval. All deposit are non-refundable/non-transferable.All sales are final once order is submitted it can not be cancelled. A 3% processing fee will be applied to all tracsactions using PayPal.</label>
                        <div>
                            <input type = "checkbox" />
                            <span>By checking this box I understand that my $800.00 deposit is non-refundable/non-transferable and will hold the puppy for 7days</span>
                        </div>
                        <div>
                            <input type = "checkbox" />
                            <span>By checking this box I understand that my $800.00 deposit is non-refundable/non-transferable and will hold the puppy for 7days</span>
                        </div>
                        <div className = "col-md-4 offset-md-8">
                            <button className = "btn make-offer">Check Out</button>
                        </div>
                    </div>
                    
                    <ShippingInput 
                        name = "Card Number :"
                    />
                    <ShippingInput 
                        name = "CCV :"
                    />
                    <ShippingInput 
                        name = "Card Type :"
                    />
                    <ShippingInput 
                        name = "Expiration :"
                    />
                    <div className = "row place-order">
                        <div className = "col-md-3">
                            <button className = "btn make-offer">Place Order</button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default CheckOut;