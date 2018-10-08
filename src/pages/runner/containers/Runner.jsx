import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import LineChart from 'react-d3-components/lib/LineChart'

import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import Settings from '../components/Settings';

import * as runnerActions from '../actions/runner'
import {START, PAUSE, RESUME, STOP} from "../constants/workStates";
import {getDown, getRight, getLeft, getStop, getUp, getSum} from "../localeStorage/localeStorage";
import {getXLeft, getXRight, getYLeft, getYRight} from "../localeStorage/localeStorageForCharts";

class Runner extends React.Component {

  render() {
    const {
      actions, doneTries, down, height, left, right, pauseResumeText,
      settingsError, settingsStep, startStopText, stop, tries, up, width,
      workFinished, x, y
    } = this.props;

    return (
      <div>
        <Header
          down={down}
          height={height}
          left={left}
          right={right}
          stop={stop}
          tries={tries}
          up={up}
          width={width}
          x={x}
          y={y}
        />
        {
          settingsStep &&
          <Settings
            saveDimensions={actions.saveDimensions}
            saveProbability={actions.saveProbability}
            saveTries={actions.saveTries}
            saveXY={actions.saveXY}
            settingsError={settingsError}
            settingsStep={settingsStep}
          />
        }
        {
          !settingsStep && !workFinished &&
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button
              variant="contained"
              color={startStopText === START ? 'primary' : 'secondary'}
              onClick={() => {
                actions.changeStartStop(
                  startStopText === START
                    ? STOP
                    : START
                );

                if (startStopText === START) {
                  actions.startWork();
                } else {
                  actions.stopWork();
                }

              }}
            >
              {startStopText}
            </Button>
            {
              startStopText === STOP &&
              <Button
                variant="contained"
                color={pauseResumeText === PAUSE ? 'primary' : 'secondary'}
                onClick={() => {
                  actions.changeResumePause(
                    pauseResumeText === PAUSE
                      ? RESUME
                      : PAUSE
                  );

                  if (pauseResumeText === PAUSE) {
                    actions.pauseWork();
                  } else {
                    actions.startWork();
                  }

                }}
              >
                {pauseResumeText}
              </Button>
            }
          </div>
        }
        {
          tries &&
            <div style={{fontSize: '100px', textAlign: 'center'}}>
              {!doneTries ? '-' : doneTries} / {!tries ? '-' : tries}
            </div>
        }
        {
          workFinished &&
            <div>
              <br />
              <div style={{fontSize: '25px', textAlign: 'center'}}>
                <div>
                  Probability to go up = {((getUp() / getSum()) * 100).toFixed(3)}%
                </div>
                <div>
                  Probability to go right = {((getRight() / getSum()) * 100).toFixed(3)}%
                </div>
                <div>
                  Probability to go down = {((getDown() / getSum()) * 100).toFixed(3)}%
                </div>
                <div>
                  Probability to go left = {((getLeft() / getSum()) * 100).toFixed(3)}%
                </div>
                <div>
                  Probability to stop = {((getStop() / getSum()) * 100).toFixed(3)}%
                </div>
              </div>
              <br />
              <br />
              <div style={{display: 'flex'}}>
                <div>
                  <LineChart
                    data={[
                      {label: 'Right bound x', values: getXRight()},
                      {label: 'z', values: [{x: 0, y: 0}]},
                      {label: 'Left bound x', values: getXLeft()}
                      ]}
                    width={400}
                    height={400}
                    xAxis={{innerTickSize: 6, label: 'x points'}}
                    yAxis={{label: 'out number'}}
                    margin={{top: 10, bottom: 50, left: 50, right: 10}}
                  />
                </div>
                <div>
                  blue - top y bound
                  <br />
                  orange - bottom y bound
                </div>
                <div>
                  <LineChart
                    data={[
                      {label: 'Right bound y', values: getYLeft()},
                      {label: 'z', values: [{x: 0, y: 0}]},
                      {label: 'Left bound y', values: getYRight()}
                    ]}
                    width={400}
                    height={400}
                    xAxis={{innerTickSize: 6, label: 'y points'}}
                    yAxis={{label: 'out number'}}
                    margin={{top: 10, bottom: 50, left: 50, right: 10}}
                  />
                </div>
                <div>
                  green - right x bound
                  <br />
                  orange - left x bound
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

Runner.propTypes = {
  actions: PropTypes.objectOf.isRequired,
  doneTries: PropTypes.number.isRequired,
  down: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  pauseResumeText: PropTypes.string.isRequired,
  settingsError: PropTypes.bool.isRequired,
  settingsStep: PropTypes.string.isRequired,
  startStopText: PropTypes.string.isRequired,
  stop: PropTypes.number.isRequired,
  tries: PropTypes.number.isRequired,
  up: PropTypes.number.isRequired,
  width: PropTypes.func.isRequired,
  workFinished: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  doneTries: state.runner.doneTries,
  down: state.runner.down,
  height: state.runner.height,
  left: state.runner.left,
  right: state.runner.right,
  pauseResumeText: state.runner.pauseResumeText,
  settingsError: state.runner.settingsError,
  settingsStep: state.runner.settingsStep,
  startStopText: state.runner.startStopText,
  stop: state.runner.stop,
  tries: state.runner.tries,
  up: state.runner.up,
  width: state.runner.width,
  workFinished: state.runner.workFinished,
  x: state.runner.x,
  y: state.runner.y,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(runnerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Runner)
