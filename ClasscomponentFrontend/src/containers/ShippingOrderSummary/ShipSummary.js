import React, { Component } from 'react';

class ShipSummary extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className = "shipping-summary">
                <div className = "summary-header">
                    <font>ORDER SUMMARY</font>
                </div>
                <hr />
                <div className = "summary-body">
                    <div className = "row">
                        <label className = "text-left">Sub Total</label>
                        <span className = "text-right">{this.props.price}</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Discount</label>
                        <span className = "text-right">0</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Tax</label>
                        <span className = "text-right">0</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Balance Owend</label>
                        <span className = "text-right">0</span>
                    </div>
                    <div className = "row">
                        <label className = "text-left">Total Due Now</label>
                        <span className = "text-right">0</span>
                    </div>
                </div>
                <hr />
                <div className = "summary-footer">
                    <div className = "row">
                        <label className = "text-left">Order Total</label>
                        <label className = "text-right">${this.props.total}</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShipSummary;
