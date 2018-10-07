import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Runner from '../pages/runner/containers/Runner';

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Runner} />
      </Switch>
    </div>
  </Router>
;

export default App;
