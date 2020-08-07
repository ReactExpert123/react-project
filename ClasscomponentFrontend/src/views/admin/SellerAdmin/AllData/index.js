import React, { Component } from 'react';

import { connect } from "react-redux";
import { getAllData } from "../../../../Reduxstate/Admin/action/customer";

class AllData extends Component {

    componentDidMount() {
   
        this.props.getAllData();
    }

 
  
    render() {
        return (
            <div className="animated fadeIn">
          
            </div>

        );
    }
}


// export default Customers
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
mapStateToProps, {getAllData}
)(AllData);
