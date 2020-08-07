import React, { Component } from 'react';
import {   
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Alert
    } from 'reactstrap';
import { connect } from "react-redux";
import { PupEditSave, getPupEditData } from "../../../../Reduxstate/Admin/action/pup";
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PupEdit extends Component {

  constructor(props){
    super(props);
    this.state = {
      pup_name : "",
      breed_id : "",
      price : 0,
      photo_url : {},
      video_url :{},
      birth : "",
      gender : "",
      current_weight : "",
      adult_weight : "",
      neopar_vaccine : "",
      drumune_max : "",
      pyrantel_deworm: "",
      vet_inspection : "",
      Authorization : localStorage.getItem("api_token"),
      EditpupData: {},
      message : "",
      BreedData : {}
    }
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({ 
      EditpupData: nextProps.EditpupData.pup,
      BreedData: nextProps.EditpupData.breeds
     });
     if(nextProps.EditStatus.message === "Successfully updated."){
       this.setState({
         message : nextProps.EditStatus.message
       })
       setInterval(() => { 
        window.location.href = "/admin/pup/store"
      }, 2000);
     } 

  }

  componentDidMount(){
      let data = {
        headers : {
            "Authorization" : this.state.Authorization
        },
        id : this.props.match.params.id
    }
    this.props.getPupEditData(data);
  }
  onchange = (e) => {
    console.log(e.target.value);
    let EditpupData = {...this.state.EditpupData, [e.target.id]:e.target.value};
    let breed_id = {...this.state.breed_id, [e.target.id]:e.target.value};

    this.setState({
      EditpupData:EditpupData,
      breed_id:breed_id,
    });
  }

  imagechange=(e)=>{
    this.setState({
      photo_url: e.target.files[0],
      loaded: 0,
    })
  }

  videochange=(e)=>{
    this.setState({
      video_url: e.target.files[0],
      loaded: 0,
    })
  }

  onsubmit = (e) => {
    e.preventDefault();
    // let headers = {
    //   headers : {
    //     Authorization : this.state.Authorization
    //   }
    // }
    // console.log(this.state.EditpupData.id);
    // let id = this.state.EditpupData.pup_id;
    // let  data = {
    //     pup_name: this.state.EditpupData.pup_name,
    //     gender: this.state.EditpupData.gender,
    //     breed_id: this.state.EditpupData.breed_id,
    //     price : this.state.EditpupData.price,
    //     photo_url: this.state.EditpupData.photo_url,
    //     video_url : this.state.EditpupData.video_url,
    //     birth: this.state.EditpupData.birth,
    //     current_weight : this.state.EditpupData.current_weight,
    //     adult_weight: this.state.EditpupData.adult_weight,
    //     neopar_vaccine : this.state.EditpupData.neopar_vaccine,
    //     drumune_max: this.state.EditpupData.drumune_max,
    //     pyrantel_deworm : this.state.EditpupData.pyrantel_deworm,
    //     vet_inspection: this.state.EditpupData.vet_inspection,
    //   }
    // this.props.PupEditSave(headers , data, id);
    // console.log(requestBody);
    let headers = {
      headers : {
        Authorization : this.state.Authorization,
        "Access-Control-Allow-Origin" : "*"
      }
    }
    let id = this.state.EditpupData.pup_id;
    let data = new FormData();

        data.append('pup_name', this.state.EditpupData.pup_name)
        data.append('gender', this.state.EditpupData.gender) 
        data.append('breed_id', this.state.EditpupData.breed_id) 
        data.append('price', this.state.EditpupData.price) 
        this.state.photo_url.size === undefined ? data.append('photo_url', this.state.EditpupData.photo_url) : data.append('photo_url', this.state.photo_url);
        this.state.video_url.size === undefined ? data.append('video_url', this.state.EditpupData.video_url) : data.append('video_url', this.state.video_url);
        data.append('birth', this.state.EditpupData.birth) 
        data.append('current_weight', this.state.EditpupData.current_weight) 
        data.append('adult_weight', this.state.EditpupData.adult_weight) 
        data.append('neopar_vaccine', this.state.EditpupData.neopar_vaccine) 
        data.append('pyrantel_deworm', this.state.EditpupData.pyrantel_deworm) 
        data.append('vet_inspection', this.state.EditpupData.vet_inspection) 
        data.append('drumune_max', this.state.EditpupData.drumune_max) 
    
    // // this.props.Pupsave( data , headers );
    this.props.PupEditSave(headers , data, id);
  }

  render() {
    if (localStorage.getItem("api_token") === null) {
      window.location.href = "/admin";
    }
    
    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <strong>Edit</strong> Pup
              </CardHeader>
                {
                  this.state.message !== "" && <Alert>{this.state.message}</Alert>
                }
                {this.state.EditpupData['pup_name'] === undefined ? <FadeLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />:
                  <CardBody>
                    <Form onSubmit = {this.onsubmit}>
                      <Input type="hidden" id="id" name="id" placeholder="" value = {this.state.EditpupData.id} onChange = {this.onchange} required/>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="pup_name" name="pup_name" placeholder="plase enter pup name" value = {this.state.EditpupData.pup_name} onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Price</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" id="price" name="price" placeholder="" value = {this.state.EditpupData.price} onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>
                  
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="date-input">Birthday</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="date" id="birth" name="birth" placeholder="date" value = {this.state.EditpupData.birth} onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Gender</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="select" id="gender" name="gender" placeholder="" onChange = {this.onchange} defaultValue={this.state.EditpupData.gender} required>
                            <option></option>
                            <option value = "male">male</option>
                            <option value = "female">female</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Current Weight</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" id="current_weight" name="current_weight" value = {this.state.EditpupData.current_weight} placeholder="" onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Adult Weight</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" id="adult_weight" name="adult_weight" value = {this.state.EditpupData.adult_weight} placeholder="" onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Neo Par Vaccine</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="neopar_vaccine" name="neopar_vaccine" value = {this.state.EditpupData.neopar_vaccine} placeholder="" onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Duramune Max 5</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="drumune_max" name="drumune_max" value = {this.state.EditpupData.drumune_max} placeholder="" onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Pyrantel Deworming</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="pyrantel_deworm" name="pyrantel_deworm" value = {this.state.EditpupData.pyrantel_deworm}  placeholder="" onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Vet Inspection</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" id="vet_inspection" name="vet_inspection" value = {this.state.EditpupData.vet_inspection} placeholder="Text" onChange = {this.onchange} required/>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="select">Breed</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="select" name="breed_id" id="breed_id" onChange = {this.onchange} defaultValue={this.state.EditpupData.breed_id} required>
                            <option value="0">Please select</option>
                            {this.state.BreedData.length === undefined ? "":
                              this.state.BreedData.map((item,i)=>{
                                return(
                                  <option key = {i} value = {item.id} id = "breed_id">{item.breed_name}</option>
                                )
                              }) 
                            }
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-input">Image input</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="file" id="photo_url" name="photo_url" onChange ={ this.imagechange } />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-input">Video File input</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="file" id="video_url" name="video_url" onChange ={ this.videochange }/>
                        </Col>
                      </FormGroup>
                      <CardFooter>
                        <Button type="submit" size="sm" color="primary"> Save Changes</Button>
                      
                      </CardFooter>
                    </Form>
                  </CardBody> 
                }
                
              
              <CardFooter>              
              </CardFooter>
            </Card>
        
      </div>

    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  // pupEditData : state.pup.pupEditData,
  EditpupData : state.pup.EditpupData,
  EditStatus : state.pup.EditStatus
});

export default connect(
mapStateToProps, {PupEditSave,getPupEditData}
)(PupEdit);
