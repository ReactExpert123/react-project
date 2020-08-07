import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Alert } from 'reactstrap';
import { signup } from "../../config/auth";
import { db } from "../../config/config";
import  { connect } from 'react-redux';
import { registerUser } from '../../../Reduxstate/Admin/action/auth';
import { ToastContainer, toast } from 'react-toastify';
import '../SellerAdmin/style.css'
class Register extends Component {
    constructor(props){
      super(props);
      this.state = {
        user_name : "",
        email : "",
        password : "",
        role : "seller",
        password_confirmation : "",
        ClientUID : "",
        message : ""
      }
    }

    onChange = (e) => {
      this.setState({[e.target.id]:e.target.value})
    }
    submitForm = (e) =>{
      e.preventDefault();
      try {
        // let data = signup();
        this.props.signup(this.state.email, this.state.password);
  
        setTimeout(() => {
          let defineRoom = this.state.ClientUID;
          var push = db.ref('users/' + defineRoom);
          var userInfo = {
            user_name: this.state.user_name,
            email: this.state.email,
          }
          var key = push.key;
          console.log(key);
          db.ref('users').child(key).set(userInfo);

          let requestBody = {
            user_name: this.state.user_name,
            email: this.state.email,
            role : this.state.role,
            password: this.state.password,
            password_confirmation : this.state.password_confirmation,
            chatUid : this.state.ClientUID
          }  
          this.props.registerUser(requestBody);
        }, 3000);
      } catch (error) {
        this.setState({ error: error.message });
      }
      
    }

    componentWillReceiveProps(nextProps){
      console.log(nextProps);
      if (nextProps.userUID !== "") {
        this.setState({
          ClientUID : nextProps.userUID,
        })
      }
      if(nextProps.errors.message === "Successfully registered."){
        this.setState({
          message : nextProps.errors.message
        })
        setTimeout(() => {
          window.location.href = "/admin"
        }, 2000);
      }
    }

  render() {
    if(this.state.message === "Successfully registered."){
        toast.success(this.state.message);
        // this.props.getCard();
        this.state.message = null;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.submitForm}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                      {/* {
                        this.props.errors !='' && <Alert color="danger">
                          {this.props.errors}
                        </Alert>
                      } */}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" id = "user_name" autoComplete="username" onChange = {this.onChange} required/>
                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" id = "email" autoComplete="email" onChange = {this.onChange} required/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" id = "password" autoComplete="new-password" onChange = {this.onChange} minLength = "6" required/>
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" id = "password_confirmation" autoComplete="new-password" minLength = "6" onChange = {this.onChange} required/>
                    </InputGroup>
                    <a href = "/admin/" type = "button" className = "btn btn-primary">Back</a>
                    <Button type = "submit" color="success" className = "creat-btn">Create Account</Button>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.user.flag,
  userUID : state.customer.userUID,
});

export default connect(
  mapStateToProps,
  { registerUser,signup }
)(Register);
