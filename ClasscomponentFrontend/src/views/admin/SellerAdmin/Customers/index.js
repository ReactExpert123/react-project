import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Button, Table, Row,Alert,Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup,Input,Label
} from 'reactstrap';
// import OnOff from 'react-onoff-switch'
import '../style.css';
import { signup } from "../../../config/auth";
import { db } from "../../../config/config";
import { connect } from "react-redux";
import { getAllCustomer,DeleteCustomer,AddCustomer,permissionCustomer } from "../../../../Reduxstate/Admin/action/customer";
import RingLoader from 'react-spinners/RingLoader'
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Customers extends Component {

  constructor(props){
    super(props);
    this.state = {
      Authorization : localStorage.getItem("api_token"),
      modal : false,
      user_name : "",
      email : "",
      password : "",
      password_confirmation : "",
      customerData : {},
      message : "",
      errormessageEmail : "",
      errormessagePassword : "",
      errormessageUsername : "",
      emailError : true,
      passwordError : true,
      usernameError : true,
      ClientUID : "",
      // checked : false  
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    let data = {
      headers : {
        "Authorization" : this.state.Authorization
      }
    }
    this.props.getAllCustomer(data);
  }

 
  handleDeleteUser = (id,i,Uid) => {

    let customerData = [...this.state.customerData]
    customerData.splice(i, 1)
    this.setState({ 
      customerData: customerData
    });

    let data = {
      headers : {
        Authorization : localStorage.getItem("api_token")
      },
      id : id
    }
    this.props.DeleteCustomer(data);
    db.ref("users").child(Uid).remove();
    
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onchange = (e) => {
    this.setState({[e.target.id]:e.target.value})
  }

  onsubmit = (e) => {
    e.preventDefault();
    try {
      // let data = signup();
      this.props.signup(this.state.email, this.state.password);

      setTimeout(() => {
        let headers = {
          headers : {
            Authorization : localStorage.getItem("api_token"),
          }
        }
        
        let data = {
          user_name: this.state.user_name,
          email: this.state.email,
          role : this.state.role,
          password: this.state.password,
          password_confirmation : this.state.password_confirmation,
          chatUid : this.state.ClientUID
        }
        this.props.AddCustomer( data, headers );
      }, 2000);
    } catch (error) {
      this.setState({ error: error.message });
    }
    
  }

  onpermission = (id) => {
    let header = {
      headers : {
        "Authorization" : this.state.Authorization
      },
    }
    let data = {
      id : id
    }
    this.props.permissionCustomer(data,header)
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if (nextProps.message.message === "Successfully deleted.") {
       this.setState({
        customerData: nextProps.message.data,
        message : nextProps.message.message
       })
       setInterval(() => { 
        this.setState({
          message : ""
        })
      }, 2000);
    } 
    else if(nextProps.message.message === "Successfully registered."){
        this.setState({ 
          customerData: nextProps.message.data,
          message : nextProps.message.message,
          modal: !this.state.modal,
        });
        setInterval(() => { 
          this.setState({
            message : ""
          })
        }, 2000);
    } 
    else if(nextProps.message.message === "Successfully updated."){
      this.setState({ 
        message : nextProps.message.message
      });
      setInterval(() => { 
        this.setState({
          message : ""
        })
      }, 2000);
    } 
    
    else if(nextProps.message.status === "errors"){
      if(nextProps.message.message.email){
        this.setState({
          errormessageEmail : nextProps.message.message.email[0],
          emailError : false
        })
      }
      if(nextProps.message.message.password){
        this.setState({
          errormessagePassword : nextProps.message.message.password[0],
          passwordError : false
        })
      }
      if(nextProps.message.message.user_name){
        this.setState({
          errormessageUsername : nextProps.message.message.user_name[0],
          usernameError : false
        })
      }
    }
    else if (nextProps.userUID !== "") {
      this.setState({
        ClientUID : nextProps.userUID,
      })
    }
    else {
      this.setState({
        customerData : nextProps.customerData.data,
      })
    }
  }
    
  render() {
    if (localStorage.getItem("api_token") === null) {
      window.location.href = "/admin";
    }
    
    return (
      <div className="animated fadeIn">
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col className="col-11">
                  <i className="fa fa-align-justify"></i> User
                  </Col>
                  <Col className="col-1 right">
                    <Button  size="sm" color="primary" onClick={this.toggle}> Add User </Button>
                  </Col>
                </Row>
                
              </CardHeader>
                {
                  this.state.message !== "" && <Alert color = "success">{this.state.message}</Alert>
                }
              <CardBody>
                  {
                    this.state.customerData.length === undefined?<RingLoader  css={override} size={150} color={"#123abc"} loading={this.state.loading} />:
                    <Table hover bordered striped responsive >              
                      <thead>
                          <tr>
                            <th>No</th>
                            <th>User name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Permission</th>
                            <th>Delete</th>
                          </tr>
                      </thead>
                      <tbody >
                          {
                            this.state.customerData.map((item,i)=>{
                              return (
                                <tr key={i}>
                                  <td>{i+1}</td>
                                  <td>{item.user_name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.created_at.toString().substring(0,10)}</td>
                                  <td>
                                  {item.permission === 1 ? <input type = "checkbox" checked onChange = {()=>this.onpermission(item.id)}/> :<input type = "checkbox" onChange = {()=>this.onpermission(item.id)}/>}  
                                  </td>
                                  <td>
                                    <Button color="danger" size="sm" onClick={() => {if(window.confirm('Delete the item?')){ this.handleDeleteUser(item.id ,i, item.chatUid)}}}>
                                      Delete
                                    </Button>
                                  </td>
                              </tr>
                              )
                            })
                          }
                      </tbody>
                      </Table>
                  }
               
              </CardBody>
            </Card>
          </Col>

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>ADD USER</ModalHeader>
            <form onSubmit = {this.onsubmit}>
              <ModalBody>
                <FormGroup>
                  <Label htmlFor="company">User Name</Label>
                  <Input type="text" id="user_name" placeholder="Enter your User name" onChange = {this.onchange} required/>
                  {this.state.errormessageUsername !='' && <Alert color="danger" hidden = {this.state.usernameError}>{this.state.errormessageUsername}</Alert>}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="vat">Email</Label>
                  <Input type="email" id="email" placeholder="your@gmail.com" onChange = {this.onchange} required/>
                  {this.state.errormessageEmail !='' && <Alert color="danger" hidden = {this.state.emailError}>{this.state.errormessageEmail}</Alert>}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" minLength = "6" onChange = {this.onchange} required/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="city">Confrim Password</Label>
                  <Input type="password" id="password_confirmation" placeholder="Enter your confrim password" minLength = "6" onChange = {this.onchange} required/>
                  {this.state.errormessagePassword !='' && <Alert color="danger" hidden = {this.state.passwordError}>{this.state.errormessagePassword}</Alert>}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type = "submit">Save</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </form>
          </Modal>
        
      </div>
    );
  }
}


// export default Customers
const mapStateToProps = state => ({
  auth: state.auth,
  customerData : state.customer.customerData,
  message : state.customer.flag,
  userUID : state.customer.userUID
});

export default connect(
  mapStateToProps, {getAllCustomer,DeleteCustomer,AddCustomer,permissionCustomer,signup}
)(Customers);
