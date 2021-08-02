
import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';

import AuthService from "../services/authService";

import Login from "../components/login.component";
import Register from "../components/register.component";
import Home from "../components/home.component";
import Profile from "../components/profile.component";

import BoardUser from '../components/board-user.component';
import BoardModerator from '../components/board-moderator.component';
import BoardAdmin from '../components/board-admin.component';


class HeadPage extends Component {
        constructor(props) {
            super(props);
            this.logOut = this.logOut.bind(this);
        
            this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            };
        }
        componentDidMount() {
            const user = AuthService.getCurrentUser();
        
            if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
            }
        }
        logOut() {
            AuthService.logout();
        }
        state = {}
        render() { 
            const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
            return (  
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand" id="fontWelcome"><tt><big> Welcome to HRs </big></tt></Link>
            <div className="navbar-nav mr-auto">
                {showModeratorBoard && (
                <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                    Moderator Board
                    </Link>
                </li>
                )}

                {showAdminBoard && (
                <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                    Admin Board
                    </Link>
                </li>
                )}

                {currentUser && (
                <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                    User
                    </Link>
                </li>
                )}
            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                    </a>
                </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link" id="fontlogin">
                    Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={"/register"} className="nav-link" id="fontlogin">
                    Sign Up
                    </Link>
                </li>
                </div>
            )}
            </nav>
            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/user" component={BoardUser} />
                    <Route path="/mod" component={BoardModerator} />
                    <Route path="/admin" component={BoardAdmin} />
                </Switch>
            </div>

            <div class="bg-light border-right " id="sidebar-wrapper" >
                <div class="sidebar-heading collapse" id="collapseExample"><h5>System TimeKeeping</h5> </div>
                <div class="list-group list-group-flush collapse"id="collapseExample">
                <Link to="/home" class="list-group-item list-group-item-action"><i class="fas fa-home"></i> Dashboard</Link>
                <Link to="/reschedule" class="list-group-item list-group-item-action "><i class="far fa-calendar-alt"></i> Reschedule</Link>
                <Link to="/timecheck" class="list-group-item list-group-item-action "><i class="fas fa-history"></i> Time Check</Link>               
                <Link to="/report" class="list-group-item list-group-item-action "><i class="fas fa-clipboard-check"></i> Report</Link>
                <Link to="/shift" class="list-group-item list-group-item-action "><i class="fas fa-calendar-alt"></i> Shift</Link>                         
                <Link to="/employee" class="list-group-item list-group-item-action "><i class="fas fa-users"></i> Employees</Link>
                <Link to="/department" class="list-group-item list-group-item-action "><i class="fas fa-landmark"></i> Department</Link>
                <Link to="/position" class="list-group-item list-group-item-action "><i class="fas fa-user-circle"></i> Position</Link>
                <Link to="/profile" class="list-group-item list-group-item-action "><i class="fas fa-address-card"></i> My Profile</Link>
                <Link to="/holiday" class="list-group-item list-group-item-action "><i class="fas fa-umbrella-beach"></i> Holiday</Link>   
                </div>
          </div>


        </div>
          );
      }
}
 
export default HeadPage;