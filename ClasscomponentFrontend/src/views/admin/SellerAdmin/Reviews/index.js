import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Button, Table, Row } from 'reactstrap';
import '../style.css'
import { connect } from "react-redux";
import { getAllReviews } from "../../../../Reduxstate/Admin/action/reviews";

class Reviews extends Component {

  constructor(props){
    super(props);
    this.state = {
      Authorization : localStorage.getItem("api_token")
    }
  }

  componentDidMount() {
    let data = {
      headers : {
        Authorization : this.state.Authorization
      },
      id : this.props.match.params.id
    }
    this.props.getAllReviews(data);
  }


  render() {
    if (localStorage.getItem("api_token") == null) {
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
                  {/* <Col className="col-1 right">
                    <Button  size="sm" color="primary" onClick={this.handleAddPup}> Add</Button>
                  </Col> */}
                </Row>
                
              </CardHeader>
              <CardBody>
                
                  
                  {/* {
                    this.props.pupData.length == undefined?
                    
                    <font className = "vetical">Data not found</font>:
                    <Table hover bordered striped responsive >              
                      <thead>
                          <tr>
                            <th >Photo</th>
                            <th>Video</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Gender</th>
                            <th>Birth</th>
                            <th>Current <br/> Weight</th>
                            <th>Adult <br/> Weight</th>
                            <th>Regsitered  <br/> Date</th>
                            <th>Status</th>
                            <th>Action</th>

                          </tr>
                      </thead>
                      <tbody >
                          {
                            this.props.pupData.map((item,i)=>{
                              return (
                                <tr key={i}>
                                  <td >
                                    <div>
                                      <img src={'https://rspcavic.org/images/health_behaviour/Vaccinations/Website-image-cocker-spaniel-vaccination.jpg'}  className="d-block"  alt="" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="">
                                    <img src={'https://rspcavic.org/images/health_behaviour/Vaccinations/Website-image-cocker-spaniel-vaccination.jpg'}  className="d-block"  alt="" />
                                    </div>
                                  </td>
                                  <td>{item.pup_name}</td>
                                  <td>{item.price}</td>
                                  <td>{item.gender}</td>
                                  <td>{item.birth}</td>
                                  <td>{item.current_weight}</td>
                                  <td>{item.adult_weight}</td>
                                  <td>{item.created_at}</td>
                                  <td>
                                    <Badge color="success">{item.status}</Badge>
                                  </td>
                                  <td>
                                    <Button color="primary" size="sm" onClick={this.handleDetailPup}>
                                      <i className="fa fa-eye"></i> Detail
                                    </Button>
                                  </td>
                              </tr>
                              )
                            })
                          }
                      </tbody>
                      </Table>
                  }
                  
                  
                   */}
               
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
// export default Reviews
const mapStateToProps = state => ({
  auth: state.auth,
  reviewsData : state.review.reviewsData
});

export default connect(
mapStateToProps, {getAllReviews}
)(Reviews);
