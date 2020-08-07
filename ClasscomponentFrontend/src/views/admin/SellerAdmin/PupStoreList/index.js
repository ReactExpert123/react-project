import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Button, Table, Row,Alert } from 'reactstrap';
import '../style.css'
import { connect } from "react-redux";
import { getAllStorePUP, PupdeleteData } from "../../../../Reduxstate/Admin/action/pup";

import {IMAGE_PATH_UPLOAD} from '../../../../Reduxstate/Admin/action/type'
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PupStoreList extends Component {
 
  constructor(props){
    super(props);
    this.state = {
      Authorization : localStorage.getItem("api_token"),
      alert : "",
      pupData : {},
      message : ""
    }
  }

 
  componentDidMount() {
    let data = {
      headers : {
        "Authorization" : this.state.Authorization
      }
    }
    this.props.getAllStorePUP(data);
  }

  handleAddPup = () => {
    this.props.history.push('/admin/pup/add');
  }

  handleDetailPup = (id) => {
    this.props.history.push('/admin/pup/detail/' + id);
  }

  PupDelete = (id,i) => {
    let pupData = [...this.state.pupData]
    pupData.splice(i, 1)
    this.setState({ 
      pupData: pupData
    });

    let data = {
      headers : {
        "Authorization" : this.state.Authorization
      },
      id : id
    }
    this.props.PupdeleteData(data);
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.flag === "Successfully deleted.") {
      this.setState({
        message : nextProps.flag
      })
      setInterval(() => { 
        this.setState({
          message : ""
        })
        
      }, 2000);
    }
    else {
      this.setState({
        pupData : nextProps.pupData
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
                  <i className="fa fa-align-justify"></i> Pups on Hand
                  </Col>
                  <Col className="col-1 right">
                    <Button  size="sm" color="primary" onClick={this.handleAddPup}> Add Pup </Button>
                  </Col>
                </Row>
                
              </CardHeader>
                {
                  this.state.message !== "" && <Alert>{this.state.message}</Alert>
                }
              <CardBody>
                  {
                    
                    this.state.pupData.length === undefined? <FadeLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />:
                    <Table hover bordered striped responsive id = "myTable">              
                      <thead>
                          <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Gender</th>
                            <th>Birth</th>
                            <th>Current <br/> Weight</th>
                            <th>Adult <br/> Weight</th>
                            <th>Regsitered  <br/> Date</th>
                            <th>Breed  <br/> Name</th>
                            <th>Seller <br/> Name</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Delete</th>
                          </tr>
                      </thead>
                      <tbody >
                          {
                            this.state.pupData.map((item,i)=>{
                              return (
                                <tr key={i} data-id = {item.id}>
                                  <td >
                                      <img src={IMAGE_PATH_UPLOAD + item.photo_url}  className="d-block"  alt="pup photo" />
                                  </td>
                                  <td>{item.pup_name}</td>
                                  <td>{item.price}</td>
                                  <td>{item.gender}</td>
                                  <td>{item.birth}</td>
                                  <td>{item.current_weight}</td>
                                  <td>{item.adult_weight}</td>
                                  <td>{item.created_at.toString().substring(0,10)}</td>
                                  <td>{item.breed_name}</td>
                                  <td>{item.user_name}</td>
                                  <td>
                                    <Badge color="success">{item.status}</Badge>
                                  </td>
                                  <td>
                                    <Button color="primary" size="sm" onClick={()=>this.handleDetailPup(item.id)}>
                                     Detail
                                    </Button>
                                  </td>
                                  <td>
                                    <Button color="danger" size="sm" onClick = {() => {if(window.confirm('Delete the item?')){this.PupDelete(item.id,i)};}}>
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
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    {/* <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem> */}
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.user,
  pupData : state.pup.pupdata,
  flag : state.pup.flag
});

export default connect(
mapStateToProps, {getAllStorePUP,PupdeleteData}
)(PupStoreList);
