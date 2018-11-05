import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import * as integralActions from '../actions/integral';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

const styles = {
  button: {
    marginTop: 20
  },
  input: {
    width: 60
  }
};

class Integral extends React.Component {

  render() {
    return (
      <div>
        <div>
          <InputLabel> A: </InputLabel>
          <TextField
            id="A"
            style={styles.input}
          />
        </div>
        <div>
          <InputLabel> B: </InputLabel>
          <TextField
            id="B"
            style={styles.input}
          />
        </div>
        <div>
          <InputLabel> C: </InputLabel>
          <TextField
            id="C"
            style={styles.input}
          />
        </div>
        <div>
          <InputLabel> k: </InputLabel>
          <TextField
            id="k"
            style={styles.input}
          />
        </div>
        <div>
          <InputLabel> m: </InputLabel>
          <TextField
            id="m"
            style={styles.input}
          />
        </div>
        <div>
          <InputLabel> N: </InputLabel>
          <TextField
            id="N"
            style={styles.input}
          />
        </div>
        <Button
          style={styles.button}
          onClick={() => {
            const A = document.getElementById("A").value;
            const B = document.getElementById("B").value;
            const C = document.getElementById("C").value;
            const k = document.getElementById("k").value;
            const m = document.getElementById("m").value;
            const N = document.getElementById("N").value;

            this.props.actions.countIntegrals({A, B, C, k, m, N});
          }}
        >
          Start counting!
        </Button>
        <div style={{padding: 20}}>
          Result by geometric method: {this.props.geometricMethod}
          <br/>
          Result by rectangle method: {this.props.rectangleMethod}
          <br/>
          Result by simple method: {this.props.simpleMethod}
        </div>
      </div>
    )
  }
}

Integral.propTypes = {
  geometricMethod: PropTypes.number,
  rectangleMethod: PropTypes.number,
  simpleMethod: PropTypes.number
};

const mapStateToProps = state => ({
  geometricMethod: state.integral.geometricMethod,
  rectangleMethod: state.integral.rectangleMethod,
  simpleMethod: state.integral.simpleMethod
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(integralActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Integral)
