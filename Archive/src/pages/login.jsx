import React, { Component } from 'react';
import userService from '../services/userService';
import Cookies from 'js-cookie' 
import './login.css';

class Login extends Component {
    state = {
        message: ""
    };

    usernameRef = React.createRef();
    passwordRef = React.createRef();
    login = () => {
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;

        //console.log(username, password);
        userService.login(username, password).then(res=>{
            if(res.data.errorCode>0){
                this.setState({message: res.data.message});
            }
            else{
                this.setState({message: ""});
                //save cookie
                Cookies.set("loginInfo", JSON.stringify(res.data.data), {expires: 1});

                //redirec to dashboard
                this.props.history.push("/home");
            }
        })
    }
    render() {
        return (     
                <div className=" h-100">
                {/* 
                <img className="photoavt" src={require('../avatar.png')} alt="ChrisTran"/>
                */}
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-sm-8 col-lg-5">
                            <div className="card" id="card-login">
                                <div className="card-header" id="cardheader-login">
                                    <h1 className="card-title mb-0"><i class="far fa-user-circle"/> Login</h1>
                                </div>
                                <div className="card-body">
                                <form className="form">
                                    <div className="text-center text-primary">{this.state.message}</div>
                                    <div className="form-group row mt-3" >                                     
                                        <label htmlFor="inputUsername" className="col-sm-3 col-form-label"><b>Username</b></label>
                                        <div className="input-group input-groupBg col-sm-9">
                                            {/* <div className="input-group-prepend" bỏ>
                                                <span className="input-group-text">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                            </div> */}
                                            <input type="text" ref={this.usernameRef} className="form-control" id="inputUsername" placeholder="Username"/>
                                            <i class="fas fa-user" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputPassword" className="col-sm-3 col-form-label"><b>Password</b></label>
                                        <div className="input-group input-groupBg col-sm-9">
                                            {/* <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-lock"></i>
                                                </span>
                                            </div> */}
                                            <input type="text" ref={this.passwordRef} className="form-control" id="inputPassword" placeholder="Password" />
                                            <i class="fas fa-key" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div class="row align-items-center remember mt-4">
						                <input type="checkbox"/>Remember Me
					                </div>
                                    <div className="form-group row">  
                                        <div className="col-sm-9 mt-0 text-right offset-3" >
                                            <button type="button" onClick={this.login} className="btn btn-lg font-weight-bold" id="buttonlogin">Login</button>
                                        </div>
                                    </div>
                                </form>
                                </div>
                                <div class="card-footer">
                                    <div class="d-flex justify-content-center links">
                                        Don't have an account?<a href="#">Sign Up</a>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <a href="#">Forgot your password?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
                
        );
    }
}

export default Login;