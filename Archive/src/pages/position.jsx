import React, { Component } from 'react'
import {Modal,Footer,Header,Button,Title, Form, Row, Col} from 'react-bootstrap'
import positionService from '../services/positionService';
class Position extends Component {
    state = {
        positions: [],
        position: {},

        modalShow: false,
        modalTitle: '',
        strSearch:''
    }
    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
        positionService.list().then(res => {
            this.setState({ positions: res.data})
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
            positionService.get(id).then(res => {
                this.setState({ position: res.data })
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
                            <h1>Position</h1>
                        </div>
                        <div className="col-3 text-right p-2">
                            <button className="btn btn-success" onClick={() => this.openModal(0)}><i className="fas fa-plus"></i><b> Add </b></button>
                        </div>                       
                    </div>
                    </div>
                    
                    <div class="card-body">
                        <div className="row"> 
                            <div class="col-md-6"> 
                                <div class="search-box"> 
                                    <form class="search-form" action="http://hocwebgiare.com/"> <input class="form-control" placeholder="Searching..." type="text"/> 
                                        <button class="btn btn-link search-btn"><i class="fas fa-search"></i></button> 
                                    </form> 
                                </div> 
                            </div> 
                        </div>
                        
                        <table class="table table-striped table-hover mt-4">
                            <thead class="table-dark ">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Position Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Trưởng phòng</td>
                                    <td>
                                        <button class="btn btn-group" type="button" onClick={()=>this.showModal(1)}><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-group" type="button"><i class="fas fa-times-circle"></i></button>
                                    </td>

                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Nhân viên</td>
                                    <td>
                                        <button class="btn btn-group" type="button" ><i class="fas fa-edit" onClick={()=>this.showModal(0)}></i></button>
                                        <button class="btn btn-group" type="button"><i class="fas fa-times-circle"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Nhân viên</td>
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
                                    <Form.Label>Position Name</Form.Label>
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
 
export default Position;