import React from 'react';
import './App.css';
import { BrowserRouter as Switch, Route} from 'react-router-dom'
import {LoginPage} from './components/login_page';
import {Authorizing} from './components/authorizing';
import {UserPage} from './components/user_page';
import {DirectPage} from './components/direct_page';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/github/callback' component={Authorizing} /> 
      <Route exact path='/user' component={UserPage} />
      <Route exact path='/direct' component={DirectPage} />      
    </Switch>
  );
}

export default App;