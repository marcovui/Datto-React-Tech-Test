import React from 'react';
import { Home } from 'pages';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './styles/main.scss';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* Additional Routes go here # Marco Vuillemoz 11/02/2022  */}
    </Switch>
  </Router>
);

export default App;
