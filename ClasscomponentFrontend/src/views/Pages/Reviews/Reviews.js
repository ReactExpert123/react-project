import React, { Component } from 'react';
import { Container } from 'reactstrap';

import Header from '../../../containers/Header/Header'
import Footer from '../../../containers/Footer/Footer'
// import './style.css';

// import Photo from '../../../assets/img/background/background.jpg';
import ClientReviews from '../../../containers/ClientReviews/ClientReviews'
import FadeLoader from 'react-spinners/FadeLoader'
import { connect } from "react-redux";
import { getAllReviewRead } from "../../../Reduxstate/Client/action/home";

import {IMAGE_PATH_UPLOAD} from '../../../Reduxstate/Admin/action/type'

// import { Item } from 'semantic-ui-react';
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Reviews extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true
    }
  }

  componentDidMount(){
    this.props.getAllReviewRead();
  }
  componentWillReceiveProps(aa){
    console.log("aaaaaaaaaaaaaa",aa);
  }
  render() {
    return (
      <div className = "home-width">
        <Header />
        <Container>
            <div className = "row reviews-state">
                <div className = "title">
                    <label>If you have purchased a dog from us, we would like to hear from you.</label>
                    <div><a href = "/addreview">Click here</a> to post a referall</div>
                </div>
                
                {
                  this.props.clientreviewdata.length === undefined ? <FadeLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} /> : 
                  this.props.clientreviewdata.map((item,i)=>{
                      return (
                        <ClientReviews 
                          key ={i}
                          img_url = {IMAGE_PATH_UPLOAD + item.photo_url}
                          content = {item.story}
                          name = {item.pup_name}
                          breed_name = {item.breed_name}
                          customer_name = {item.first_name}
                          date = {item.created_at.toString().substring(0,10)}
                        />
                      )
                    })
                }
               
            </div>
        </Container>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  clientreviewdata : state.home.clientreviewdata,
});

export default connect(
mapStateToProps, {getAllReviewRead}
)(Reviews);
