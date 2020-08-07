import React, { Component } from 'react';

class OrderSummary extends Component {

    render() {
        return (
            <div className = "shipping-summary">
                <div className = "summary-header">
                    <font>ORDER SUMMARY</font>
                </div>
                <hr />
                <div className = "summary-body">
                    <div className = "row">
                        <label className = "text-left">Adoption Fee</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Prevent Meds</label>
                        <span className = "text-right">0</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Adoption Fee</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Puppy transition Essentials</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">FRONTLINE Flea & Tick</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Microchip</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Petkev</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Roval Canin Mini Food(Required)</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Complete comport Insurance</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Puppy Play Pen</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Vet inspection Fee(Required)</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Comfv Travel Package</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Plastic Travel Crate</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Perfect Acceesory Package</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Shipping Method</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Tax(Local pick-up)</label>
                        <span className = "text-right">$4000</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Discount</label>
                        <span className = "text-right">$4000</span>
                    </div>                    
                </div>
                <hr />
                <div className = "summary-footer">
                    <div className = "row">
                        <label className = "text-left">Order Total</label>
                        <label className = "text-right">$4000</label>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Amount Due Now</label>
                        <label className = "text-right">$4000</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderSummary;
