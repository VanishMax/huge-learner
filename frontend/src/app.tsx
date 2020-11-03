import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/nav';
import Capture from './pages/capture';
import About from './pages/about';
import './app.css';

function App () {
  return (
    <Router>
      <Nav />

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Capture />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
