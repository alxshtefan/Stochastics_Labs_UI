import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import Settings from '../components/Settings';
import * as runnerActions from '../actions/runner'
import {START, PAUSE, STOP, RESUME} from "../constants/workStates";

class Runner extends React.Component {

  render() {
    const {
      actions, doneTries, down, height, left, right,
      pauseResumeText, settingsError, settingsStep,
      startStopText, stop, tries, up, width, x, y
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
          !settingsStep &&
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
                  actions.startWork();
                }}
                >
                  {startStopText}
              </Button>
              {
                startStopText === STOP &&
                <Button
                  variant="contained"
                  color={pauseResumeText === PAUSE ? 'primary' : 'secondary'}
                  onClick={() => actions.changeResumePause(
                    pauseResumeText === PAUSE
                      ? RESUME
                      : PAUSE
                  )}
                  >
                    {pauseResumeText}
                </Button>
              }
            </div>
        }
        <div style={{fontSize: '100px', textAlign: 'center'}}>
          {!doneTries ? '-' : doneTries} / {!tries ? '-' : tries}
        </div>
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
  x: state.runner.x,
  y: state.runner.y,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(runnerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Runner)
