import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Progress,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import {IMAGE_PATH_UPLOAD} from '../../../../Reduxstate/Admin/action/type'
import { connect } from "react-redux";
import { getDashboardData } from "../../../../Reduxstate/Admin/action/dash";
import FadeLoader from 'react-spinners/FadeLoader'
import { css } from "@emotion/core";
// import { thisTypeAnnotation } from '@babel/types';
import './dash.css'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 31;
var data1 = [];
var data2 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
 
}

const mainChart = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
  datasets: [
    {
      label: 'Pups on hand',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'Pups adopted',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      status : "read",
      viewpupData : {},
      viewpuporderData : {},
      viewreviewData : {}
    };
  }

  componentDidMount(){
    let data = {
      headers : {
        Authorization : localStorage.getItem("api_token")
      }
    }
    if (this.props.location.search === "?status=key") {
      this.setState({
        status : this.props.location.search
      })
      this.props.getDashboardData(data,this.props.location.search);
    } else {
      this.props.getDashboardData(data,"read");
    }
    // this.props.getDashboardData();
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.dashData.message === "This is good"){
      this.setState({
        viewpupData : nextProps.dashData.recent.added_pups,
        viewpuporderData : nextProps.dashData.recent.ordered_pups,
        viewreviewData : nextProps.dashData.recent.reviews,
      })
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    console.log(this.state.viewData);
    if (this.props.location.search != "?status=key") {
      if(!localStorage.getItem("api_token")) {
        window.location.href = "/admin";
      }
    }
    return (
      <div className="animated fadeIn">
        {
        this.props.dashData.message === undefined?
          <FadeLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        /> :
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{this.props.dashData.data.pups}</div>
                <div>Pups online</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.props.dashData.data.reviews}</div>
                <div>Reviews</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                {/* <Line data={cardChartData1} options={cardChartOpts1} height={70} /> */}
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">{this.props.dashData.data.customers}</div>
                <div>Customers</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">${this.props.dashData.data.earn_money}</div>
                <div>Earnings</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>
        </Row>
        }
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                    <div className="small text-muted">2020</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(0)} active={this.state.radioSelected === 0}>All</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Jan</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Feb</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Mar</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(4)} active={this.state.radioSelected === 4}>Apr</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(5)} active={this.state.radioSelected === 5}>May</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(6)} active={this.state.radioSelected === 6}>Jun</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(7)} active={this.state.radioSelected === 7}>Jul</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(8)} active={this.state.radioSelected === 8}>Aug</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(9)} active={this.state.radioSelected === 9}>Sep</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(10)} active={this.state.radioSelected === 10}>Oct</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(11)} active={this.state.radioSelected === 11}>Nov</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(12)} active={this.state.radioSelected === 12}>Dec</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Pups Adapted</div>
                    <strong>121</strong>
                    <Progress className="progress-xs mt-2" color="success" value="100" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Pups on hand</div>
                    <strong>23</strong>
                    <Progress className="progress-xs mt-2" color="info" value="100" />
                  </Col>
                
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="4">
            <Card className="text-black bg-white">
              <CardTitle>
                <div className = "dashcard-header">
                  <p>Listed Pups</p>
                </div>
                <div className = "dashcard-button">
                  <button className = "btn btn-primary">Add New + </button>
                  <a herf = "">View all</a>
                </div>
              </CardTitle>
              <CardBody className="pb-0">
                {
                  this.state.viewpupData.length === undefined ? <p>qwe</p> : 
                  this.state.viewpupData.map((item,i)=>{
                    return (
                      <Row className = "viewRow" key = {i}>
                        <div className = "dashpupImage">
                          <img src = {IMAGE_PATH_UPLOAD + item.photo_url} alt = "pup image"/>
                        </div>
                        <div className = "dashInfo">
                          <p>{item.pup_name}</p>
                          <div className = "state-view">
                            
                            <ul>
                              <li>{item.breed_name}</li>
                              <li>${item.price}</li>
                              <li>Detail</li>
                            </ul>
                          </div>
                        </div>
                      </Row>
                    )
                  })
                }
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="4">
          <Card className="text-black bg-white">
              <CardTitle>
                <div className = "dashcard-header">
                  <p>Ordered Pups</p>
                </div>
                <div className = "dashcard-button">
                  {/* <button className = "btn btn-primary">Add New + </button> */}
                  <a herf = "">View all</a>
                </div>
              </CardTitle>
              <CardBody className="pb-0">
                {
                  this.state.viewpuporderData.length === undefined ? <p>qwe</p> : 
                  this.state.viewpuporderData.map((item,i)=>{
                    return (
                      <Row className = "viewRow" key = {i}>
                        <div className = "dashpupImage">
                          <img src = {IMAGE_PATH_UPLOAD + item.photo_url} alt = "pup image"/>
                        </div>
                        <div className = "dashInfo">
                          <p>{item.pup_name}</p>
                          <div className = "state-view">
                            
                            <ul>
                              <li>{item.breed_name}</li>
                              <li>${item.price}</li>
                              <li>Detail</li>
                            </ul>
                          </div>
                        </div>
                      </Row>
                    )
                  })
                }
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="12" lg="4">
            <Card className="text-black bg-white">
              <CardTitle>
                <div className = "dashcard-header">
                  <p>Recent Reviews</p>
                </div>
                <div className = "dashcard-button">
                  <a herf = "">View all</a>
                </div>
              </CardTitle>
              <CardBody className="pb-0">
                {
                  this.state.viewreviewData.length === undefined ? <p>qwe</p> : 
                  this.state.viewreviewData.map((item,i)=>{
                    return (
                      <Row className = "viewRow" key = {i}>
                        <div className = "dashpupImage">
                          <img src = {IMAGE_PATH_UPLOAD + item.photo_url} alt = "pup image"/>
                        </div>
                        <div className = "dashInfo">
                          <p>{item.story}</p>
                        </div>
                      </Row>
                    )
                  })
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.user,
  dashData : state.dash.dashData,
});

export default connect(
mapStateToProps, {getDashboardData}
)(Dashboard);
