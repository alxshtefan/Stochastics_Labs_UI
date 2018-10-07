import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './utils/registerServiceWorker'
import configureStore from './store/index'
import App from './routes/index'

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
