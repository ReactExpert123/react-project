import React, { Component } from 'react';
import {
   Container,
   Card, 
   CardImg,  
   CardBody, 
   Dropdown, 
   DropdownToggle, 
   DropdownMenu, 
   DropdownItem
} from 'reactstrap';

import Header from '../../../containers/Header/Header'
import Footer from '../../../containers/Footer/Footer'
import './style.css';

import {IMAGE_PATH_UPLOAD} from '../../../Reduxstate/Admin/action/type'

import Photo from '../../../assets/img/background/background.jpg';
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";

import { connect } from "react-redux";
import { getAllPupClientRead ,getstatusPupClientRead , getBreedFilter} from "../../../Reduxstate/Client/action/home";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true,
      dropdownOpen : false,
      pupData : [],
      BreedData : [],
      result : ""
    }
    this.breedfilter = this.breedfilter.bind(this);
  }

  toggle =() => {
    this.setState({
      dropdownOpen : !this.state.dropdownOpen
    })
  }

  componentDidMount(){
    this.props.getAllPupClientRead();
  }

  selectStatus = (param) => {
    console.log(param);
    this.props.getstatusPupClientRead(param);
  }

  ongoingDetail = (id) => {
    this.props.history.push('/detail/' + id);
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    this.setState({
      pupData : nextProps.clientpupdata.pups,
      BreedData : nextProps.clientpupdata.breeds
    })
  }

  breedfilter = (event) =>{
    // alert(event.target.value);
    this.props.getBreedFilter(event.target.value);
  }

  // breedfilter = (event) => {
  //   this.setState({
  //     result: event.target.value
  //   })
  // }

  render() {
    return (
      <div className = "home-width">
        <Header />
        <div className = "landing-img">
          <img src = {Photo} alt = "Dogs" className = "img-responsive"/>
        </div>
        <Container>
          <hr />
          <div className = "row border-status">
            <div className = "col-md-4">
              <button className = "btn-round mr-1 btn btn-outline-warning" onClick = { ()=>this.selectStatus("view_all")}>View All</button>
            </div>
            <div className = "col-md-4">
              <button className = "btn-round mr-1 btn btn-outline-warning" onClick = {()=>this.selectStatus("available_now")}>Available Now</button>
            </div>
            <div className = "col-md-4">
              <button className = "btn-round mr-1 btn btn-outline-warning" onClick = {()=>this.selectStatus("under")}>Under $1000</button>
            </div>
          </div>
          <div className = "row border-status">
            
            <div className = "col-md-4 offset-md-2">
              <button className = "btn-round mr-1 btn btn-outline-warning" onClick = {()=>this.selectStatus("recently_add")}>Recently Added</button>
            </div>
            <div className = "col-md-4">
              <select className = "btn-round mr-1 btn-outline-warning select_option" onChange = {this.breedfilter}>
                <option value = {0}> ALL Breed</option>
                {
                  this.state.BreedData === undefined ? <option>" "</option> : this.state.BreedData.map((item,i) => {
                    return (
                      <option key = {i}  value = {item.id}>{item.breed_name}</option>
                      
                    )
                  })
                }
              </select>
            </div>
            
          </div>
          <hr />
          {
            this.state.pupData === undefined? <FadeLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} /> :
            this.state.pupData.map((item,i)=>{
              return (
                <Card className = " home-card" key = {i}>
                  <CardImg top  src={IMAGE_PATH_UPLOAD + item.photo_url} alt="Card image cap" onClick = {()=>this.ongoingDetail(item.id)}/>
                  <CardBody>
                    <div className = "row card-header-title">
                      <div className = "card-name">{item.pup_name}</div>
                      <div className = "card-price">Available {item.created_at.toString().substring(0,10)}</div>
                    </div>
                    <div className = "row card-content">
                      <label className = "card-name">{item.breed_name}</label>
                      <label className = "card-price">{item.current_weight}lb oz</label>
                    </div>
                    <div className="puppy-price">${item.price}</div>
                  </CardBody>
                </Card>
              )
            })
          }
              

        </Container>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  clientpupdata : state.home.clientpupdata,
});

export default connect(
mapStateToProps, {getAllPupClientRead,getstatusPupClientRead,getBreedFilter}
)(Home);
