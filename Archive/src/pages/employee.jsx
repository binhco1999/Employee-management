import React, { Component } from "react";
import employeeService from "../services/employeeService";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";

class Employee extends Component {
  state = {
    employees: [],
    employee: {},
    modalShow: false,
    modalTitle: "",
  };

  componentDidMount() {
    this.loadData();
  };

  loadData = () => {
    employeeService.list().then((res) => {
      this.setState({ employees: res.data });
    });
  };

  inputOnChange = (event) => {
    const { name, value } = event.target;
    const newEmployee = { ...this.state.employee, [name]: value };
    this.setState({ employee: newEmployee });
  };
  showModal = (id) => () => {
    if (id === 0) {
      //add
      this.setState({
        employee: {},
        modalTitle: "New employee",
        modalShow: true,
      });
    } else {
      //update
      employeeService.get(id).then((res) => {
        this.setState({
          employee: res.data,
          modalTitle: "Update employee",
          modalShow: true,
        });
      });
    }
  };
  closeModal = () => {
    this.setState({ modalShow: false });
  };

  save = () => {
    if (this.state.employee.id > 0) {
      employeeService.update(
        this.state.employee.id,
        this.state.employee
      ).then((res) => {
          this.setState({ modalShow: false });
          this.loadData();
      });
    } else {
      employeeService.add(this.state.employee).then((res) => {
        if (res.errorCode === 0) {
          this.setState({ modalShow: false });
          this.loadData();
        } else {
          this.setState({ modalShow: false });
          this.loadData();
        }
      });
    }
  };

  showConfirm = (id) => {
    this.dialog.show({
      title: "Delete employee",
      body: "Are you sure ?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() =>
          employeeService.remove(id).then((res) => {
            if (res.errorCode === 0) {
              this.loadData();
            } else {
              this.loadData();
            }
          })
        ),
      ],
      bsSize: "small",
      onHide: (dialog) => {
        dialog.hide();
        console.log("closed by clicking background.");
      },
    });
  };





  render() {
    return (
      <div>
        <div className="card my-3 shadow-lg p-3 mb-5 bg-white rounded">
          <div className="card-header" id="bordercard">
            <div className="row justify-content-between">
              <div className="col-3 text-dark">
                <h1>Employee</h1>
              </div>
              <div className="d-flex flex-wrap justify-content-between align-items-center mr-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editModal"
                  onClick={this.showModal(0)}
                >
                  <i className="fas fa-plus"></i> Add
                  </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover mt-4">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Employee_ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Start Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((employee, idx) => {
                    return (
                      <tr key={employee.id}>
                        <td>{idx + 1}</td>
                        <td>{employee.empCode}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.dateOfBirth}</td>
                        <td>{employee.address}</td>
                        <td>{employee.phoneNumber}</td>
                        <td>{employee.emailId}</td>
                        <td>{employee.startDate}</td>
                        <td>
                          <a href="#/">
                            <i
                              className="fas fa-edit text-primary"
                              onClick={this.showModal(employee.id)}
                            ></i>
                          </a>
                          <a href="#/">
                            <i
                              className="fas fa-trash-alt text-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                this.showConfirm(employee.id);
                              }}
                            ></i>
                            <Dialog
                              ref={(el) => {
                                this.dialog = el;
                              }}
                            />
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="row justify-content-center">
                <div
                  className="btn-toolbar"
                  role="toolbar"
                  aria-label="Toolbar with button groups"
                >
                  <div
                    className="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button type="button" className="btn btn-secondary">
                      1
                          </button>
                    <button type="button" className="btn btn-secondary">
                      2
                          </button>
                    <button type="button" className="btn btn-secondary">
                      3
                          </button>
                    <button type="button" className="btn btn-secondary">
                      4
                          </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Modal
          show={this.state.modalShow}
          onHide={this.closeModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>Employee Code:</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="empCode"
                    onChange={this.inputOnChange}
                    value={this.state.employee.empCode || ""} //này
                    type="text"
                    placeholder="Enter Employee code" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>First Name:</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="firstName"  //khớp với
                    onChange={this.inputOnChange}
                    value={this.state.employee.firstName || ""} //này
                    type="text"
                    placeholder="Enter First Name" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>Last Name:</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="lastName"  //khớp với
                    onChange={this.inputOnChange}
                    value={this.state.employee.lastName || ""} //này
                    type="text"
                    placeholder="Enter Last Name" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>Date of birth:</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="dateOfBirth"  //khớp với
                    onChange={this.inputOnChange}
                    value={this.state.employee.dateOfBirth || ""} //này
                    type="date"
                    placeholder="Enter Date Of Birth" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>Address</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="address"  //khớp với
                    onChange={this.inputOnChange}
                    value={this.state.employee.address || ""} //này
                    type="text"
                    placeholder="Enter Address" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>Phone Number:</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="phoneNumber"  //khớp với
                    onChange={this.inputOnChange}
                    value={this.state.employee.phoneNumber || ""} //này
                    type="text"
                    placeholder="Enter Phonne Number" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>Email:</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="emailId"  //khớp với
                    onChange={this.inputOnChange}
                    value={this.state.employee.emailId || ""} //này
                    type="text"
                    placeholder="Enter email" />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3}><b>Start Date</b></Form.Label>
                <Col sm={9}>
                  <Form.Control
                    name="startDate"  //khớp với
                    onChange={this.inputOnChange}
                    value={this.state.employee.startDate || ""} //này
                    type="date"
                    placeholder="Enter start date" />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.save}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>




        {/* <div className="modal fade" id="addEmployee" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Employee</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <form>
                  <div className="form-row">
                  <div className="form-group col-md-12">
                      <label for="inputEmployeeID">Employee_ID</label>
                      <input type="text" className="form-control" id="inputEmployeeID" placeholder="Employee_ID" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputFirstName">First Name</label>
                      <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="inputLastName">Last Name</label>
                      <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputEmployeeID">DOB</label>
                      <input type="text" className="form-control" id="inputEmployeeID" placeholder="DOB" />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="inputFirstName">Gender</label>
                      <div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                          <label className="form-check-label" for="inlineRadio1">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                          <label className="form-check-label" for="inlineRadio2">Female</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                  </div>
                  <div className="form-group">
                    <label for="inputPhoneNumber">Phone Number</label>
                    <input type="text" className="form-control" id="inputPhoneNumber" placeholder="Phone Number" />
                  </div>
                </form>
  
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save</button>
                </div>
            </div>
            </div>
        </div>
  
  
          <div className="modal fade" id="editEmployee" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Employee</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>
                  <div className="modal-body">
                  <form>
                    <div className="form-row">
                    <div className="form-group col-md-12">
                        <label for="inputEmployeeID">Employee_ID</label>
                        <input type="text" className="form-control" id="inputEmployeeID" placeholder="Employee_ID" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="inputFirstName">First Name</label>
                        <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label for="inputEmployeeID">DOB</label>
                        <input type="text" className="form-control" id="inputEmployeeID" placeholder="DOB" />
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputFirstName">Gender</label>
                        <div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                            <label className="form-check-label" for="inlineRadio1">Male</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label className="form-check-label" for="inlineRadio2">Female</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="inputAddress">Address</label>
                      <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="form-group">
                      <label for="inputPhoneNumber">Phone Number</label>
                      <input type="text" className="form-control" id="inputPhoneNumber" placeholder="Phone Number" />
                    </div>
                  </form>
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save</button>
                  </div>
              </div>
            </div>
        </div>
  
  
        <div className="modal fade" id="deleteEmployee" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group row">
                          <label for="txtMajor" className="col-sm-4 col-form-label">Are you sure?</label>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Delete</button>
                </div>
            </div>
            </div>
        </div> */}
      </div>
    );
  }
}

export default Employee;