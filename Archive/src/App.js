import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import DefaultLayout from './blocks/defaultLayout';
import Position from './pages/position';
import Department from './pages/department';
import Employee from './pages/employee';
import Home from './pages/home';
import Shift from './pages/shift';
import Holiday from './pages/holiday';
import Reschedule from './pages/reschedule';
import Timecheck from './pages/timecheck';
import Report from './pages/report';
import Login from './components/login.component';
import Register from './components/register.component';
import Profile from './components/profile.component';
import HeadPage from './blocks/headpage';

function App() {
  //Luồng đi của trang
  return (
    <Switch>
      <Route path='/' exact component={HeadPage}/>
      
      <Route path="/register" component={Register} />
      <Route path='/login' component={Login}/>
      <Route path='/'component={DefaultLayout}/>
    </Switch>
  );
}

export default App;
