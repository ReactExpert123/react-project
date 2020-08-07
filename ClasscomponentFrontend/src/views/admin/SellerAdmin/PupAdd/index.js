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
    Alert,
    Label,
} from 'reactstrap';

import { connect } from "react-redux";
import { Pupsave,GetAllBreed } from "../../../../Reduxstate/Admin/action/pup";

class PupAdd extends Component {

  constructor(props){
    super(props);
    this.state = {
      pup_name : "",
      breed_id : "",
      price : 0,
      photo_url : "",
      video_url : "",
      birth : "",
      gender : "",
      current_weight : "",
      adult_weight : "",
      neopar_vaccine : "",
      drumune_max : "",
      pyrantel_deworm: "",
      vet_inspection : "",
      Authorization : localStorage.getItem("api_token"),
      pupState : ""
    }
  }

  componentDidMount(){
    let data = {
      headers : {
        Authorization : localStorage.getItem("api_token")
      }
    }
    this.props.GetAllBreed(data);
  }

  onchange = (e) => {
    this.setState({[e.target.id]:e.target.value})
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
    let headers = {
      headers : {
        Authorization : this.state.Authorization,
        "Access-Control-Allow-Origin" : "*"
      }
    }
    let data = new FormData();
        data.append('pup_name', this.state.pup_name) 
        data.append('gender', this.state.gender) 
        data.append('breed_id', this.state.breed_id) 
        data.append('price', this.state.price) 
        data.append('photo_url', this.state.photo_url) 
        data.append('video_url', this.state.video_url) 
        data.append('birth', this.state.birth) 
        data.append('current_weight', this.state.current_weight) 
        data.append('adult_weight', this.state.adult_weight) 
        data.append('neopar_vaccine', this.state.neopar_vaccine) 
        data.append('pyrantel_deworm', this.state.pyrantel_deworm) 
        data.append('vet_inspection', this.state.vet_inspection) 
        data.append('drumune_max', this.state.drumune_max) 
    this.props.Pupsave( data , headers );
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.pupState === "Successfully posted.") {
        this.setState({
          pupState : nextProps.pupState
        })
        setInterval(() => { 
          window.location.href = "/admin/pup/store"
        }, 2000);
    }
   
  }

  render() {
    if (localStorage.getItem("api_token") === null) {
      window.location.href = "/admin";
    }
    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
                <strong>Add</strong> Pup
              </CardHeader>
              <CardBody>
                {
                  this.state.pupState !== "" && <Alert>{this.state.pupState}</Alert>
                }
                <Form onSubmit = {this.onsubmit} encType='multipart/form-data'>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="pup_name" name="pup_name" placeholder="plase enter pup name" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Price</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="price" name="price" placeholder="" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>
              
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Birthday</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="birth" name="birth" placeholder="date" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Gender</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" id="gender" name="gender" placeholder="" onChange = {this.onchange} required>
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
                      <Input type="number" id="current_weight" name="current_weight" placeholder="" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Adult Weight</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="adult_weight" name="adult_weight" placeholder="" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>

                  {/* <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Intra Nasal</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="" name="" placeholder="" onChange = {this.onchange}/>
                    </Col>
                  </FormGroup> */}

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Neo Par Vaccine</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="neopar_vaccine" name="neopar_vaccine" placeholder="" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Duramune Max 5</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="drumune_max" name="drumune_max" placeholder="" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Pyrantel Deworming</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="pyrantel_deworm" name="pyrantel_deworm" placeholder="" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Vet Inspection</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="vet_inspection" name="vet_inspection" placeholder="Text" onChange = {this.onchange} required/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Breed</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="select" name="breed_id" id="breed_id" onChange = {this.onchange} required>
                      <option value="0">Please select</option>
                        {                       
                          this.props.BreedData.length === undefined ? <option value="0">Please select</option> :
                          this.props.BreedData.map((item,i)=>{
                            return (
                              
                                <option key = {i} value={item.breed_id}>{item.breed_name}</option>
                              
                            )
                          })
                        }
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">File input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="photo_url" name="photo_url" onChange ={ this.imagechange }/>
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
              
            </Card>
        
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.user,
  pupState : state.pup.pupSave,
  BreedData : state.pup.breedData
});

export default connect(
mapStateToProps, {Pupsave,GetAllBreed}
)(PupAdd);
