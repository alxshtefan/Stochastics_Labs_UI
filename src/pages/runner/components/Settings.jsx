/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Label from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import {
  DIMENSIONS,
  XY,
  PROBABILITY,
  TRIES
} from '../constants/settingsSteps';

const styles = {
  button: {
    marginTop: 20
  },
  input: {
    width: 60
  }
};

const Settings = ({ saveDimensions, saveProbability,
  saveTries, saveXY, settingsError, settingsStep }) => (
  <div>
    {
      settingsStep === DIMENSIONS &&
        <div>
          <div>
            <InputLabel> Field width: </InputLabel>
            <TextField
              id="width"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <div>
            <InputLabel> Field height: </InputLabel>
            <TextField
              id="height"
              error={settingsError}
              style={styles.input}
            />
          </div>
            <Button
              style={styles.button}
              onClick={() => {
                const width = document.getElementById("width").value;
                const height = document.getElementById("height").value;
                saveDimensions({
                  width,
                  height
                });
              }}
            >
              Save
            </Button>
        </div>
    }
    {
      settingsStep === XY &&
        <div>
          <div>
            <InputLabel> Start X: </InputLabel>
            <TextField
              id="x"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <div>
            <InputLabel> Start Y: </InputLabel>
            <TextField
              id="y"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <Button
            style={styles.button}
            onClick={() => {
              const x = document.getElementById("x").value;
              const y = document.getElementById("y").value;
              saveXY({ x, y });
            }}
          >
            Save
          </Button>
        </div>
    }
    {
      settingsStep === PROBABILITY &&
        <div>
          <div>
            <InputLabel> Probability UP (%): </InputLabel>
            <TextField
              id="up"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <div>
            <InputLabel> Probability RIGHT (%): </InputLabel>
            <TextField
              id="right"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <div>
            <InputLabel> Probability DOWN (%): </InputLabel>
            <TextField
              id="down"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <div>
            <InputLabel> Probability LEFT (%): </InputLabel>
            <TextField
              id="left"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <div>
            <InputLabel> Probability STOP (%): </InputLabel>
            <TextField
              id="stop"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <Button
            style={styles.button}
            onClick={() => {
              const up = document.getElementById("up").value;
              const right = document.getElementById("right").value;
              const down = document.getElementById("down").value;
              const left = document.getElementById("left").value;
              const stop = document.getElementById("stop").value;
              saveProbability({ up, right, down, left, stop });
            }}
          >
            Save
          </Button>
        </div>
    }
    {
      settingsStep === TRIES &&
        <div>
          <div>
            <InputLabel> Number of tries to make: </InputLabel>
            <TextField
              id="tries"
              error={settingsError}
              style={styles.input}
            />
          </div>
          <Button
            style={styles.button}
            onClick={() => {
              const tries = document.getElementById("tries").value;
              saveTries(tries);
            }}
          >
            Save
          </Button>
        </div>
    }
    {
      settingsError &&
        <Label style={{color: 'red', marginTop: 10, fontSize: 14}}>
          {settingsError}
        </Label>
    }
  </div>
);

Settings.propTypes = {
  saveDimensions: PropTypes.func,
  saveProbability: PropTypes.func,
  saveTries: PropTypes.func,
  saveXY: PropTypes.func,
  settingsError: PropTypes.bool,
  settingsStep: PropTypes.string
};

export default Settings
