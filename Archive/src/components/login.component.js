import React, { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/authService";
import CheckButton from 'react-validation/build/button';
import '../pages/login.css';
import Cookies from 'js-cookie' 

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
  
      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      });
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      });
    }
  
    handleLogin(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        AuthService.login(this.state.username, this.state.password).then(
          () => {
            this.props.history.push("/profile");
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      } else {
        this.setState({
          loading: false
        });
      }
    }
  
    render() {
      return (
        <div className="h-100">
           <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
              <div className="col-sm-8 col-lg-5">
                <div className="card" id="card-login">
                  <div className="card-header" id="cardheader-login">
                    <h1 className="card-title mb-0"><i class="far fa-user-circle"/> Login</h1>              
                  </div>
                  <div className="card-body">
                    <Form 
                    onSubmit={this.handleLogin} ref={c => {
                      this.form = c;
                    }}
                    className="form">
                      <div className="form-group row mt-3" >
                        <label htmlFor="inputUsername" className="col-md-3 col-form-label"><b>Username</b></label>
                        <div className="input-group input-groupBg col-md-9">
                          <input type="text"  value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[required]} className="form-control" id="inputUsername" placeholder="Username"/>
                          <i class="fas fa-user" aria-hidden="true"></i>
                        </div>              
                      </div>

                      <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-md-3 col-form-label"><b>Password</b></label>
                        <div className="input-group input-groupBg col-md-9">
                          <input type="text" value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[required]} className="form-control" id="inputPassword" placeholder="Password" />
                          <i class="fas fa-key" aria-hidden="true"></i>
                        </div>
                      </div>

                      <div class="row align-items-center remember mt-4">
						            <input type="checkbox"/>Remember Me
					            </div>
                      <div className="form-group row">
                        <div className="col-md-9 mt-0 text-right offset-3" >
                          <button disabled={this.state.loading} className="btn btn-lg font-weight-bold" id="buttonlogin">
                            {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>)}
                            <span>  Login</span>
                          </button>
                        </div>
                      </div>

                      {this.state.message && (
                      <div className="form-group ">
                        <div className="alert alert-danger" role="alert">
                          {this.state.message}
                        </div>
                      </div>)}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={c => {
                        this.checkBtn = c;
                      }}
                    />
                    </Form>
                    <div class="card-footer">
                      <div class="d-flex justify-content-center links" >
                          Don't have an account?<a href="/register">Sign Up</a>
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
        </div> 
      );
    }
  }


