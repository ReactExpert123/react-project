import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem,Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup,Input,Label,Button,Form } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import {IMAGE_PATH,IMAGE_PATH_UPLOAD} from '../../Reduxstate/Admin/action/type'

import { connect } from "react-redux";
import { Userprofile,getProfileData } from "../../Reduxstate/Admin/action/auth";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class SellerHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal : false,
      first_name : "",
      last_name : "",
      country : "",
      state : "",
      city : "",
      address : "",
      phone_number : "",
      photo_url : null,
      profileData : {}
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    let headers = {
      headers : {
        Authorization : localStorage.getItem("api_token")
      }
    }
    this.props.getProfileData(headers);
  }
  onchange = (e) => {
    let profileData = {...this.state.profileData, [e.target.id]:e.target.value};
    this.setState({profileData:profileData});
  }

  onchangephoto = (e) =>{
    console.log(e.target.files[0]);
    this.setState({
      photo_url: e.target.files[0],
      loaded: 0,
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onsubmit = (e) => {
    e.preventDefault();
    let headers = {
      headers : {
        Authorization : localStorage.getItem("api_token"),
        'Content-Type': 'multipart/form-data'
      }
    }
    let data = new FormData();
        data.append('first_name', this.state.profileData.first_name) 
        data.append('last_name', this.state.profileData.last_name) 
        data.append('country', this.state.profileData.country) 
        data.append('state', this.state.profileData.state) 
        data.append('city', this.state.profileData.city) 
        data.append('address', this.state.profileData.address) 
        data.append('phone_number', this.state.profileData.phone_number) 
        data.append('photo_url', this.state.photo_url) 
     this.props.Userprofile( data, headers );
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.status.message == "Successfully added your profile informations.") {
      this.setState({
        profileData : nextProps.status.data
      })
    }
    else {
      this.setState({
        profileData : nextProps.ProfileData
      })
    }
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
            <AppNavbarBrand
            href = "/admin/dashboard"
            full={{ src: IMAGE_PATH + 'logo-color.png', width: 70, height: 70, alt: 'PupCommerce Logo' }}
            minimized={{ src: IMAGE_PATH + 'logo.png', width: 30, height: 30, alt: 'PupCommerce Logo' }}
            />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto">
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              {this.state.profileData.photo_url !== null ? <img src={IMAGE_PATH_UPLOAD + this.state.profileData.photo_url} className="img-avatar" alt="" /> : <img src={IMAGE_PATH + 'default.png'} className="img-avatar" alt="" />}
              {/* <img src={IMAGE_PATH + 'default.png'} className="img-avatar" alt="" /> */}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem  onClick={this.toggle}><i className="fa fa-paw"></i> User Profile</DropdownItem>
              <DropdownItem onClick = { e => this.props.onLogout(e) }><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>ADD USER PROFILE</ModalHeader>
            {/* {this.state.profileData.email == undefined ? <font>Just a minute</font>:} */}
            <Form onSubmit = {this.onsubmit} encType = "multipart/form-data">
              <ModalBody>
                  <FormGroup>
                    <Label htmlFor="company">First Name</Label>
                    {/* <Input type="text" id="first_name" placeholder="Enter Your First Name" /> */}
                    <Input type="text" id="first_name" placeholder="Enter Your First Name" value = {this.state.profileData.first_name} onChange = {this.onchange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="company">Last Name</Label>
                    {/* <Input type="text" id="last_name" placeholder="Enter Your Last Name" /> */}
                    <Input type="text" id="last_name" placeholder="Enter Your Last Name" value = {this.state.profileData.last_name} onChange = {this.onchange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="vat">Country</Label>
                    {/* <Input type="text" id="country" placeholder="Enter Your Country Name"/> */}
                    <Input type="text" id="country" placeholder="Enter Your Country Name" value = {this.state.profileData.country} onChange = {this.onchange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="street">State</Label>
                    {/* <Input type="text" id="state" placeholder="Enter Your State Name" /> */}
                    <Input type="text" id="state" placeholder="Enter Your State Name" value = {this.state.profileData.state} onChange = {this.onchange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="city">City</Label>
                    {/* <Input type="text" id="city" placeholder="Enter Your City Name" /> */}
                    <Input type="text" id="city" placeholder="Enter Your City Name" value = {this.state.profileData.city} onChange = {this.onchange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="company">Address</Label>
                    {/* <Input type="text" id="address" placeholder="Enter Your Address Name" /> */}
                    <Input type="text" id="address" placeholder="Enter Your Address Name" value = {this.state.profileData.address} onChange = {this.onchange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="company">Phone Number</Label>
                    {/* <Input type="number" id="phone_number" placeholder="Enter Your Phone Number" /> */}
                    <Input type="number" id="phone_number" placeholder="Enter Your Phone Number" value = {this.state.profileData.phone_number} onChange = {this.onchange} required/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="company">Photo</Label>
                    <Input type="file" id="photo_url" name = "photo_url" onChange = {this.onchangephoto}/>
                  </FormGroup>
                
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle} type = "submit">Save</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
              </Form>
          </Modal>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
      </React.Fragment>
    );
  }
}

SellerHeader.propTypes = propTypes;
SellerHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  auth: state.auth,
  status : state.user.status,
  ProfileData : state.user.profileData
});

export default connect(
mapStateToProps, {Userprofile,getProfileData}
)(SellerHeader);
