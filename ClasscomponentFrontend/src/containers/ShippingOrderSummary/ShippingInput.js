import React, { Component } from 'react';

class ShippingInput extends Component {
    constructor(props){
        super(props);
    }
    
    onchange = (e) => {
        console.log(e.target.value);
    }

    render() {
        return (
            <div className = "row shipping-item">
                <div className = "col-md-3 shipping-left">
                    <label>{this.props.name}</label>
                </div>
                <div className = "col-md-9">
                    <input 
                        type = {this.props.type} 
                        id = {this.props.id} 
                        onChange ={this.props.onChange} 
                        value = {this.props.value} 
                        hidden = {this.props.hidden}
                        disabled = {this.props.disabled}
                        required = {true}
                        select = {this.props.select}
                        className = {this.props.className}
                    />
                </div>
            </div>
        );
    }
}

export default ShippingInput;