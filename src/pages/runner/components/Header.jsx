/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  header: {
    height: 65,
    background: '#efefef',
    margin: '-8px -8px 10px -8px'
  }
};

const Header = ({width, height, tries, x, y, up, down, left, right, stop}) => (
  <div style={styles.header}>
    <div style={{padding: 5}}>
      <table width="1274" style={{textAlign: 'center'}}>
        <tr>
          <td>
            <b>Width</b> - {!width ? 'NaN' : width}
          </td>
          <td>
            <b>Start X</b> - {!x ? 'NaN' : x}
          </td>
          <td>
            <b>Up</b> - {up ? up && up.length : 'NaN'}%
          </td>
          <td>
            <b>Right</b> - {right ? right && right.length : 'NaN'}%
          </td>
          <td>
            <b>Stop</b> - {stop ? stop && stop.length : 'NaN'}%
          </td>
        </tr>
        <tr style={{height: 5}} />
        <tr >
          <td>
            <b>Height</b> - {!height ? 'NaN' : height}
          </td>
          <td>
            <b>Start Y</b> - {!y ? 'NaN' : y}
          </td>
          <td>
            <b>Down</b> - {down ? down && down.length : 'NaN'}%
          </td>
          <td>
            <b>Left</b> - {left ? left && left.length : 'NaN'}%
          </td>
          <td>
            <b>Tries</b> - {!tries ? 'NaN' : tries}
          </td>
        </tr>
      </table>
    </div>
  </div>
);

Header.propTypes = {
  down: PropTypes.number,
  height: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  stop: PropTypes.number,
  tries: PropTypes.number,
  up: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

export default Header
