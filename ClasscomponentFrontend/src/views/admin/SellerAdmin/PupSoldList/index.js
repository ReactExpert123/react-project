import React, { Component } from 'react';
import { 
  Badge, 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Button, 
  Table, 
  Row,
  Alert,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from 'reactstrap';
import '../style.css'
import { connect } from "react-redux";
import { getAllSoldPUP,PupdeleteData } from "../../../../Reduxstate/Admin/action/pup";
import { getAllReviews } from "../../../../Reduxstate/Admin/action/reviews";
import {IMAGE_PATH_UPLOAD} from '../../../../Reduxstate/Admin/action/type'
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PupSoldList extends Component {

  constructor(props){
    super(props);
    this.state = {
      Authorization : localStorage.getItem("api_token"),
      pupData : {},
      message : "",
      modal : false,
      reviewData : {}
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    let data = {
        headers : {
            "Authorization" : this.state.Authorization
        }
    }
    this.props.getAllSoldPUP(data);
  }

  handleAddPup = () => {
    this.props.history.push('/admin/pup/add');
  }

  handleDetailPup = (id) => {
    this.props.history.push('/admin/pup/detail/' + id);
  }

  PupDelete = (id,i) => {
    // this.props.history.push('/admin/pup/add');

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

  reviewView = (shipmentId) => {
    let data = {
      headers : {
        Authorization : this.state.Authorization
      },
      id : shipmentId
    }
    this.props.getAllReviews(data);
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.flag === "Successfully deleted.") {
      this.setState({
        message : nextProps.flag
      })
      setTimeout(() => {
        this.setState({
          message : ""
        })
      }, 2000);
    }
    else if(nextProps.pupData.message === "success"){
      console.log("+++++++++++++++++++++++");
      this.setState({
        modal : false,
        pupData : nextProps.pupData.data,
      })
    }
    if (nextProps.reviewsData.message === "success"){
      console.log("______________");
      this.setState({
        modal : !this.state.modal,
        reviewData : nextProps.reviewsData.data
      })
    }
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
                </Row>
              </CardHeader>
                {
                  this.state.message !== "" && <Alert>{this.state.message}</Alert>
                }
              <CardBody>
                  {
                    this.state.pupData.length === undefined?
                      <FadeLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />:
                    <Table hover bordered striped responsive >              
                      <thead>
                          <tr>
                            <th >Photo</th>
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
                            <th>Detail</th>
                            <th>Review</th>
                            <th>Delete</th>
                          </tr>
                      </thead>
                      <tbody >
                          {
                            this.state.pupData.map((item,i)=>{
                              return (
                                <tr key={i}>
                                  <td >
                                    <div>
                                      <img src={IMAGE_PATH_UPLOAD + item.photo_url}  className="d-block"  alt="pup photo" />
                                    </div>
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
                                      <i className="fa fa-eye"></i> Detail
                                    </Button>
                                  </td>
                                  <td className = "reveiew_button"><a onClick = {()=>this.reviewView(item.shipment_id)}>Review <br/> View</a></td>
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
                    
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
                {
                this.state.reviewData.length === null ?<font>NO data</font>: this.state.reviewData.map((item,i)=>{
                  return  (
                      <Modal isOpen={this.state.modal} toggle={this.toggle} key = {i}>
                        <ModalHeader>{item.buyers.first_name}{"   "} {item.buyers.last_name}</ModalHeader>
                        <ModalBody>
                          {item.reviews === null?<font>There is No reviews</font>:item.reviews.story}
                        </ModalBody>
                        <ModalFooter>
                          <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                      </Modal>
                    )
                })
                }
              </CardBody>
            </Card>
          </Col>
        
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pupData : state.pup.pupdata,
  flag : state.pup.flag,
  reviewsData : state.review.reviewsData
});

export default connect(
mapStateToProps, {getAllSoldPUP,PupdeleteData,getAllReviews}
)(PupSoldList);
