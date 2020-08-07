import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class SellerFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://pupcommerce.com">PupCommerce</a> &copy; 2020 creativeLabs.</span>
        <span className="ml-auto">Seller Administrator for <a href="https://pupcommerce.com"> PupCommerce</a></span>
      </React.Fragment>
    );
  }
}

SellerFooter.propTypes = propTypes;
SellerFooter.defaultProps = defaultProps;

export default SellerFooter;
