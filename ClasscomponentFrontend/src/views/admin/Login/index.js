import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Alert } from 'reactstrap';
import  { connect } from 'react-redux';
import { loginUser } from '../../../Reduxstate/Admin/action/auth';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password : "",
      // users : "",
      // errors : ""
      errorHidden : true,
      successHidden : true
    }
  }

  onChange = (e) => {
    this.setState({[e.target.id]:e.target.value})
  }
  submitForm = (e) =>{
    e.preventDefault();
    let requestBody = {
      email: this.state.email,
      password: this.state.password,
    }  
    console.log(requestBody);
    this.props.loginUser(requestBody);
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    setInterval(() => { 
      if(nextProps.users !== ""){
        this.setState({
          successHidden : false,
          errorHidden : true
        })
        window.location.href = "/admin/dashboard";
      }
    }, 1000);
    if(nextProps.errors !== ""){
      this.setState({
        successHidden : true,
        errorHidden : false
      })
    }
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit = {this.submitForm}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {
                        // console.log(this.props)
                        this.props.errors !=='' && <Alert color="danger" hidden = {this.state.errorHidden}>
                          {this.props.errors}
                        </Alert>
                      }
                      {
                        // console.log(this.props)
                        this.props.users !=='' && <Alert color="primary" hidden = {this.state.successHidden}>
                          {this.props.users}
                        </Alert>
                      }
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" id = "email" onChange = {this.onChange} placeholder="Email" autoComplete="username" required/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id = "password" onChange = {this.onChange} placeholder="Password" autoComplete="current-password" required/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type = "submit">Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>If you don't have any account please register now.</p>
                      <Link to="/admin/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
  auth: state.user,
  errors: state.user.error,
  users: state.user.user,
}};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);