/* eslint-disable react/require-default-props */
import React from 'react';
import Button from '@material-ui/core/Button';

const StartPage = () =>
  <div>
    <Button onClick={() => {window.location = '/runner'}}>
      Бегающий человечек
    </Button>
    <br/>
    <Button onClick={() => {window.location = '/integral'}}>
      Интегралы
    </Button>
  </div>
;

export default StartPage;
