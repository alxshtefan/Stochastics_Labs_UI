import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import Charts from 'react-chartjs'
import Plot from 'react-plotly.js';

import Button from '@material-ui/core/Button';
import { Line } from 'rc-progress';

import Settings from '../components/Settings';

import * as runnerActions from '../actions/runner'
import {START, PAUSE, RESUME, STOP} from "../constants/workStates";

class Runner extends React.Component {

  getColor = (progress) => {
    const color  = Number(progress);
    if (color > 0 && color <= 33) {
      return '#ff0c0c';
    }
    if (color > 33 && color <= 67) {
      return '#ffb20c';
    }
    if (color > 67) {
      return '#58ff0c';
    }
    return '#c4c4c4';
  };

  getUpDownLabel = (result) => {
    if (result.upData) {
      return result.upData.map(res => res.x);
    }
    if (result.downData) {
      return result.downData.map(res => res.x);
    }
    return [];
  };

  getUpDownData = (result) => ({
    labels: this.getUpDownLabel(result),
    datasets: [
      {
        label: "Top bound out(%)",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: result.upData.map(res => res.y),
      },
      {
        label: "Bottom bound out(%)",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: result.downData.map(res => res.y),
      }
    ]
  });

  getRightLeftLabel = (result) => {
    if (result.leftData) {
      return result.leftData.map(res => res.x);
    }
    if (result.rightData) {
      return result.rightData.map(res => res.x);
    }
    return [];
  };

  getLeftRightData = (result) => ({
    labels: this.getRightLeftLabel(result),
    datasets: [
      {
        label: "Left bound out(%)",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: result.leftData.map(res => res.y),
      },
      {
        label: "Right bound out(%)",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: result.rightData.map(res => res.y),
      }
    ]
  });

  render() {
    const {
      actions, doneTries, result, pauseResumeText, settingsError,
      settingsStep, startStopText, tries, workFinished
    } = this.props;

    return (
      <div>
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
                    actions.resumeWork();
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
            <div>
              <div style={{width: '25%', margin: 'auto'}}>
                <Line
                  percent={Math.round(doneTries / tries * 100)}
                  strokeWidth="5"
                  strokeColor={this.getColor(Math.round(doneTries / tries * 100))}
                />
                <div style={{fontSize: '30px', textAlign: 'center', color: this.getColor(Math.round(doneTries / tries * 100))}}>
                  {Math.round(doneTries / tries * 100)}%
                </div>
              </div>
            </div>
        }
        {
          workFinished &&
            <div>
              <br />
              <div style={{fontSize: '25px', textAlign: 'center'}}>
                <div>
                  Probability to go up = {result.up}
                </div>
                <div>
                  Probability to go right = {result.right}
                </div>
                <div>
                  Probability to go down = {result.down}
                </div>
                <div>
                  Probability to go left = {result.left}
                </div>
                <div>
                  Probability to stop = {result.stop}
                </div>
              </div>
              <br />
              <br />
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                  {
                    result.upData && result.upData.length > 0
                      ? <Charts.Line
                          data={this.getUpDownData(result)}
                          width={500}
                          height={500}
                        />
                      : <div>No data</div>
                  }
                </div>
                <div>
                  {
                    result.rightData && result.rightData.length > 0
                      ? <Charts.Line
                          data={this.getLeftRightData(result)}
                          width={500}
                          height={500}
                        />
                      : <div>No data</div>
                  }
                </div>
              </div>
              <div style={{textAlign: 'center'}}>
                <Plot
                  data={[{
                    z: result.stopMap,
                    type: 'surface'
                  }]}
                  layout={{width: 600, height: 600, title: 'Stop surface'}}
                />
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
  result: PropTypes.object.isRequired,
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
  result: state.runner.result,
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
