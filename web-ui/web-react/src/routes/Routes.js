import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import LoginLocalStorage from '../components/LoginLocalStorage';
import Menu from '../pages/Menu';
function Routes() {

    
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginLocalStorage}/>
        <Route exact path="/menu" component={Menu}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;