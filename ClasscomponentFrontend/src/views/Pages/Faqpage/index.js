import React, { Component } from 'react';
import Faq from 'react-faq-component';
import Header from '../../../containers/Header/Header'
import Footer from '../../../containers/Footer/Footer'
import './style.css';

import {data} from './data';

class FaqData extends Component {
  render() {
    return (
      <div className = "home-width">
        <Header />
        <div className = "container">
          <div className = "reviews-state">
            <Faq data={data}/>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default FaqData