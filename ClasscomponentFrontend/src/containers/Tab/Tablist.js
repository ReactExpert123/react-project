import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Divider, Tab } from 'semantic-ui-react'

class Tablist extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true
    }
  }
  ongoing = (id) => {
    window.location.href = "/shipping/" + id
  }

  render() {
    const panes = [
      {
        menuItem: 'Putty Info',
        render: () => <Tab.Pane attached={false}>
          <div className = "row">
            <div className = "col-md-6 puppy-info">
              <div className = "item">
                <label className="col-sm-5 title">Age</label>
                <label className="col-sm-7">5 week</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Birth Date</label>
                <label className="col-sm-7">{this.props.birth}</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Gender</label>
                <label className="col-sm-7">{this.props.gender}</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Current Weight</label>
                <label className="col-sm-7">{this.props.current_weight}lb</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Est Adult Weight</label>
                <label className="col-sm-7">{this.props.adult_weight}lb</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Registry</label>
                <label className="col-sm-7">n/a</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Vaccinations</label>
                <label className="col-sm-7">5 Weeks</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Age</label>
                <label className="col-sm-7">Up-To-Date-On All Shots</label>
              </div>
              <div className = "item">
                <label className="col-sm-5 title">Vet Inspection</label>
                <label className="col-sm-7">inspected at 8weeks</label>
              </div>
            </div>
          </div>
          
        </Tab.Pane>,
      },
      {
        menuItem: 'Health Record',
        render: () => <Tab.Pane attached={false}>
          <div className = "row">
            <div className = "col-md-6 puppy-info">
              <div className = "item">
                <label className="col-sm-7 title">Neo Par Vaccine</label>
                <label className="col-sm-5">5 week</label>
              </div>
              <div className = "item">
                <label className="col-sm-7 title">Duramune Max 5</label>
                <label className="col-sm-5">{this.props.birth}</label>
              </div>
              <div className = "item">
                <label className="col-sm-7 title">Pyrantel Deworming</label>
                <label className="col-sm-5">{this.props.birth}</label>
              </div>
            </div>
            <div className = "col-md-6 puppy-info">
              <div className="row">
                <div className="col-md-6">
                  <h5><strong className="blue-text">Vet Inspection</strong></h5>
                </div>
                <div className="col-md-6">
                  <p className="m-t-5">Scheduled Appt for 6/24/2020</p>
                </div>
              </div>
              <h5>
                <strong className="blue-text">List of Inspection Points</strong>
              </h5>
              <div className="row font-detail">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">Ears</div>
                    <div className="col-md-4">Eyes</div>
                    <div className="col-md-4">Temperament</div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">Mouth</div>
                    <div className="col-md-4">Teeth</div>
                    <div className="col-md-4">Gums</div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">Respiratory</div>
                    <div className="col-md-4">Cardiovascular</div>
                    <div className="col-md-4">Musculoskeletal</div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">Skin and coat</div>
                    <div className="col-md-4">Gastrointestinal</div>
                    <div className="col-md-4">Urogenital</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab.Pane>,
      },
      {
        menuItem: 'Breed Info',
        render: () => <Tab.Pane attached={false}>
          <div className = "row">
            <p className = "puppy-info">{this.props.breed_name}</p>
          </div>
        </Tab.Pane>,
      },
    ];
    const { color } = "red"
    return (
      <div>
       
        <Divider />

        <Tab
          menu={{ color, inverted: true, attached: false, tabular: false }}
          panes={panes}
        />
      </div>
    );
  }
}

export default Tablist;