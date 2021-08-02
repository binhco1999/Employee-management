import React, { Component } from "react";

import UserService from "../services/userService";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: " "
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div class="container">
      <div class="row justify-content-center m-5">
        <h1> {this.state.content} Welcome to Company</h1>
      </div>
      <div class="row">
              
      </div>
  </div>
 
    );
  }
}