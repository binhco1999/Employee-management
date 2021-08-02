import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


import AuthService from "../services/authService";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className=" h-100">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-sm-8 col-lg-5">
              <div className="card" id="card-login">
                  <h1 className="card-title text-center mt-3" id="hedsign"> Sign Up </h1>
                  <h3 className="text-center mt-0"><tt><big>and Let's get you to the Company!</big></tt></h3>
                <div className="card-body">
                  <Form
                  onSubmit={this.handleRegister}
                  ref={c => {
                    this.form = c;
                  }}
                  className="form">
                     {!this.state.successful && (
                       <div>
                          <div className="form-group row mt-0" >
                            <label htmlFor="inputUsername" className="col-sm-3 col-form-label"><b>Username</b></label>
                            <div className="input-group input-groupBg col-sm-9">
                              <input type="text" value={this.state.username}
                              onChange={this.onChangeUsername}
                              validations={[required, vusername]} className="form-control" id="inputUsername" placeholder="Username"/>
                              <i class="fas fa-user" aria-hidden="true"></i>
                            </div>
                          </div>

                          <div className="form-group row mt-3" >
                              <label htmlFor="inputEmail" className="col-sm-3 col-form-label"><b>Email</b></label>
                              <div className="input-group input-groupBg col-sm-9">
                                <input type="text" value={this.state.email}
                                onChange={this.onChangeEmail}
                                validations={[required, email]} className="form-control" id="inputEmail" placeholder="Email"/>
                                <i class="fas fa-envelope" aria-hidden="true"></i>
                              </div>
                          </div>

                          <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label"><b>Password</b></label>
                            <div className="input-group input-groupBg col-sm-9">
                              <input type="text" value={this.state.password}
                              onChange={this.onChangePassword}
                              validations={[required]} className="form-control" id="inputPassword" placeholder="Password" />
                              <i class="fas fa-key" aria-hidden="true"></i>
                            </div>
                          </div>
                          <div class="card-footer">
                            <div className="form-group row">
                              <div className="col-md-12 mt-1 text-center" >
                                <button type="button" className="btn btn-lg font-weight-bold" id="buttonregister">Sign Up</button>
                              </div>
                            </div>
                            <a href="/login">Back To login</a>
                          </div>
                        </div>
                     )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}