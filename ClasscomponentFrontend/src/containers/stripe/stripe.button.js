// stripe.button.component.jsx
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price,name}) => {
    // alert(price);
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H4UySI3bvdrWcvM2uNpt5RZU5WTvczIMpDez7L94bCHX8bgktuGIVsqCoEHOEkCf3aEQpsVRIhWi5SLmLpVAXe200sJAWLTsO';

    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
    };
    
    return (
        <StripeCheckout
            label='Check Out'
            name={name}
            billingAddress
            // shippingAddress
            // image='https://www.freakyjolly.com/wp-content/uploads/2020/04/fj-logo.png'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;