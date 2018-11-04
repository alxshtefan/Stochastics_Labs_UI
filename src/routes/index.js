import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Integral from '../pages/integral/containers/Integral';
import Runner from '../pages/runner/containers/Runner';
import StartPage from '../pages/StartPage';

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/runner" component={Runner} />
        <Route exact path="/integral" component={Integral} />
      </Switch>
    </div>
  </Router>
;

export default App;
