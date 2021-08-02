import React, { Component } from 'react'
import {Modal,Footer,Header,Button,Title, Form, Row, Col} from 'react-bootstrap'
import shiftService from '../services/shiftService';
import './shift.css'
class Shift extends Component {
    state = {
        shifts: [],
        shift: {},

        modalShow: false,
        modalTitle: '',
        strSearch:''
    }
    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        shiftService.list().then(res => {
            this.setState({ shifts: res.data})
        })
    }
    //Su kien tat
    closeModal = () => {
        this.setState({ modalShow: false });
    }
    //Su kien mo
    openModal = (id) => {
        if (id == 0) {
            //add
            this.setState({ modalTitle: 'New Shift' });
            this.setState({ major: {} });
            this.setState({ modalShow: true });

        }
        else {
            //update
            this.setState({ modalTitle: 'Edit Shift' });
            shiftService.get(id).then(res => {
                this.setState({ shift: res.data })
                this.setState({ modalShow: true });
            })

        }
    }
    render() {
        return (
                <div class="">
                    <div className="card my-3 shadow-lg p-3 mb-5 bg-white rounded">
                    <div class="card-header" id="bordercard">
                    <div class="row justify-content-between">
                        <div class="col-3 text-dark">
                            <h1>Shift</h1>
                        </div>
                        <div className="col-3 text-right p-2">
                            <button className="btn btn-success" onClick={() => this.openModal(0)}><i className="fas fa-plus"></i><b> Add </b></button>
                        </div>                       
                    </div>
                    </div>
                    
                    <div class="card-body">
                        <div className="row mt-2">
                            <div className="col-6 mt-2">
                                <div className="form-check form-check-inline mr-4">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    <label className="form-check-label" for="inlineRadio1"><tt><big>Shift A</big></tt></label>
                                </div>
                                <div className="form-check form-check-inline mr-4">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label" for="inlineRadio2"><tt><big>Shift B</big></tt></label>
                                </div>
                                <div className="form-check form-check-inline mr-4">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label" for="inlineRadio2"><tt><big>Shift C</big></tt></label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label" for="inlineRadio2"><tt><big>Khác</big></tt></label>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">                        
                            <div class="col-md-6"> 
                                <div class="search-box"> 
                                    <form class="search-form" action="http://hocwebgiare.com/"> <input class="form-control" placeholder="Nhập mã hoặc tên nhân viên" type="text"/> 
                                        <button class="btn btn-link search-btn"><i class="fas fa-search"></i></button> 
                                    </form> 
                                </div> 
                            </div> 
                        </div>
                        
                        <table class="table table-striped table-hover mt-4">
                            <thead class="table-dark ">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name Shift</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Time In</th>
                                    <th scope="col">Time Out</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Shift A</td>
                                    <td>Morning</td>
                                    <td>6:00</td>
                                    <td>14:00</td>
                                    <td>
                                        <button class="btn btn-group" type="button" onClick={()=>this.showModal(1)}><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-group" type="button"><i class="fas fa-times-circle"></i></button>
                                    </td>

                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Shift B</td>
                                    <td>Evening</td>
                                    <td>14:00</td>
                                    <td>22:00</td>
                                    <td>
                                        <button class="btn btn-group" type="button" ><i class="fas fa-edit" onClick={()=>this.showModal(0)}></i></button>
                                        <button class="btn btn-group" type="button"><i class="fas fa-times-circle"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Shift C</td>
                                    <td>Increased</td>
                                    <td>22:00</td>
                                    <td>6:00</td>
                                    <td>
                                        <button class="btn btn-group" type="button"><i class="fas fa-edit" onClick={()=>this.showModal(1)}></i></button>
                                        <button class="btn btn-group" type="button"><i class="fas fa-times-circle"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                        <Form.Group>
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>Shift Name</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control type="text"></Form.Control>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col sm={3}>
                                    <Form.Label>Description</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control type="text"></Form.Control>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col sm={3}>
                                    <Form.Label>Time In</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control type="text"></Form.Control>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col sm={3}>
                                    <Form.Label>Time Out</Form.Label>
                                </Col>
                                <Col sm={9}>
                                    <Form.Control type="text"></Form.Control>
                                </Col>
                            </Row>
                                
                            
                            
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.closeModal()}>
                            Close
                    </Button>
                        <Button variant="primary">Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default Shift;