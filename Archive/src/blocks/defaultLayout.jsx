import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './header'
import Sidebar from './sidebar';
import './header.css';
import routes from '../route';

class DefaultLayout extends Component {
    state = {  }
    render() { 
        return ( 
            <div class="d-flex" id="wrapper">
            <Sidebar></Sidebar>
            <div id="page-content-wrapper">
            <Header></Header>
                <Switch>
                    {routes.map((route, idx) => {
                        return route.component ? (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                component={route.component}>
                            </Route>
                        ) : null;
                    })
                    }
                </Switch>
            </div>  
        </div>
         );
    }
    
}

export default DefaultLayout;