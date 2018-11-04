import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import * as integralActions from '../actions/integral';

class Integral extends React.Component {

  render() {
    const {  } = this.props;

    return (
      <div>
        Integral
      </div>
    )
  }
}

Integral.propTypes = {
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(integralActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Integral)
