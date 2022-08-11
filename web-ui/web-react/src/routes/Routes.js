import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../App';
import LoginLocalStorage from '../components/LoginLocalStorage';
import MenuAdmin from '../components/MenuAdmin';
import Menu from '../pages/Menu';
import MenuAdminCommunity from '../components/MenuAdminCommunity';
import { useCookies } from "react-cookie";


function Routes() {

  const [cookies, setCookies] = useCookies();

  
  function getMenu() {
    console.log(cookies.type)
    switch(cookies.type) {
      case '1':
        return <Route exact path="/" component={MenuAdmin} />
      case '2':
        return <Route exact path="/" component={MenuAdminCommunity} />

    }
  }


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginLocalStorage} />
         <Route exact path="/" component={App} />

      </Switch>
    </BrowserRouter>
  );
}

export default Routes;