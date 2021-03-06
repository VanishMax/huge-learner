import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ModalContext from './components/modal/modal-context';
import Modal from './components/modal';
import Nav from './components/nav';
import Capture from './pages/capture';
import About from './pages/about';
import Statistics from './pages/statistics';
import './app.scss';

function App () {
  return (
    <Router>
      <ModalContext>
        <Nav />

        <Switch>
          <Route path="/capture">
            <Capture />
          </Route>
          <Route path="/statistics">
            <Statistics />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>

        <Modal />
      </ModalContext>
    </Router>
  );
}

export default App;
