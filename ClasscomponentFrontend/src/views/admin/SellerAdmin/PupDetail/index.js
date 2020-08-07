import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Button,Row,Alert } from 'reactstrap';
import { Player } from 'video-react';
import { connect } from "react-redux";
import { getDetailPUPData, editStatus} from "../../../../Reduxstate/Admin/action/pup";
import {IMAGE_PATH_UPLOAD} from '../../../../Reduxstate/Admin/action/type'
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

// import {NotificationContainer, NotificationManager} from 'react-notifications';

class PupDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            status : "Sold",
            fullData : {},
            message : ""
        }
    }

    componentDidMount() {
        let data = {
            headers : {
                "Authorization" : localStorage.getItem("api_token")
              },
            id : this.props.match.params.id
        }
        this.props.getDetailPUPData(data);
    }

    handleEdit = (id) => {
        this.props.history.push('/admin/pup/edit/'+id);
    }

    handleApprove = (id) => {
        let headers = {
            headers : {
              "Authorization" : localStorage.getItem("api_token"),
            }
        }
          
        let data = {
            status : "Sold"
        }
           this.props.editStatus( data,id, headers );
    }

    componentWillReceiveProps(nextprops){
        console.log(nextprops);
        if (nextprops.editnotification.message === "Successfully changed pup status.") {
            this.setState({
                fullData : nextprops.editnotification.data,
                message : nextprops.editnotification.message
            })
            setInterval(() => { 
                this.setState({
                  message : ""
                })
                
              }, 2000);
              
        } else {
            this.setState({
                fullData : nextprops.DetailpupData.pup
            })
        }
        
    }
    
    render() {
        if (localStorage.getItem("api_token") === null) {
            window.location.href = "/admin";
          }
          
        return (
        <div className="animated fadeIn">
                <Row>
                    <Col md = "6">
                    
                        <div className="card">
                            <div className="card-header">
                                Pup Information
                            </div>
                            {
                                this.state.message !== "" && <Alert>{this.state.message}</Alert>
                            }
                            <div className="card-body">
                            
                                <div className="bd-example">
                                    {Object.keys(this.state.fullData).length === undefined ? <FadeLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />:
                                        <dl className="row">
                                            <dt className="col-sm-3">Price</dt>
                                            <dd className="col-sm-9">${this.state.fullData.price}</dd>

                                            <dt className="col-sm-3">Name</dt>
                                            <dd className="col-sm-9">{this.state.fullData.pup_name}</dd>

                                            <dt className="col-sm-3">Breed</dt>
                                            <dd className="col-sm-9">{this.state.fullData.breed_name}</dd>

                                            <dt className="col-sm-3 text-truncate">Birth</dt>
                                            <dd className="col-sm-9">{this.state.fullData.birth }</dd>

                                            <dt className="col-sm-3">Gender</dt>
                                            <dd className="col-sm-9">{this.state.fullData.gender}</dd>

                                            <dt className="col-sm-3">Current Weight</dt>
                                            <dd className="col-sm-9">{this.state.fullData.current_weight}</dd>

                                            <dt className="col-sm-3">Adult Weight</dt>
                                            <dd className="col-sm-9">{this.state.fullData.adult_weight}</dd>

                                            {/* <dt className="col-sm-3">Intra Nasal</dt>
                                            <dd className="col-sm-9">{this.state.fullData['pup_name']}</dd> */}

                                            <dt className="col-sm-3">Neo Par Vaccine</dt>
                                            <dd className="col-sm-9">{this.state.fullData.neopar_vaccine}</dd>
                                            

                                            <dt className="col-sm-3">Duramune Max 5</dt>
                                            <dd className="col-sm-9">{this.state.fullData.drumune_max}</dd>
                                            

                                            <dt className="col-sm-3">Pyrantel Deworming</dt>
                                            <dd className="col-sm-9">{this.state.fullData.pyrantel_deworm}</dd>

                                            <dt className="col-sm-3">Vet Inspection</dt>
                                            <dd className="col-sm-9">{this.state.fullData.vet_inspection}</dd>

                                            <dt className="col-sm-3">Registered</dt>
                                            <dd className="col-sm-9">
                                                <dl className="row">
                                                    <dd className="col-sm-4">{this.state.fullData.created_at&&this.state.fullData.created_at.toString().substr(0,10)}</dd>
                                                    
                                                </dl>
                                            </dd>
                                            <dd className = "col-md-12">
                                                <dl className = "col-md-6 offset-md-4">
                                                    {this.state.fullData.status === "Active"?<Button  size="" color="info" className="btn-pill" onClick={()=>this.handleEdit(this.state.fullData['pup_id'])}> &nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;  </Button> : ""}
                                                    
                                                    {this.state.fullData.status === "Ordered"?<Button  size="" color="success" className="btn-pill" onClick={()=>this.handleApprove(this.state.fullData['pup_id'])}> Approve </Button> :
                                                    ""}
                                                </dl>
                                            </dd>
                                        </dl>
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md = "6">
                        <Card>
                            <CardHeader>
                                Video
                            </CardHeader>
                            <CardBody>
                                <Player
                                poster={IMAGE_PATH_UPLOAD + this.state.fullData.photo_url}
                                src={IMAGE_PATH_UPLOAD + this.state.fullData.video_url}>
                                
                                </Player>
                            </CardBody>
                        </Card>
                    </Col>
                
                </Row>
            
            {/* <NotificationContainer/> */}
        </div>

        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    DetailpupData : state.pup.DetailpupData,
    editnotification : state.pup.editnotification
  });
  
  export default connect(
  mapStateToProps, {getDetailPUPData, editStatus}
  )(PupDetail);