import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../App';
import LoginLocalStorage from '../components/LoginLocalStorage';
import MenuAdmin from '../components/MenuAdmin';
import Menu from '../pages/Menu';
function Routes() {

    
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginLocalStorage}/>
        <Route exact path="/" component={MenuAdmin}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;