import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fruitRates from './Constants.js';
import {Button, Form, InputGroup, Container, Row, Col} from 'react-bootstrap';
import {ReactDataGrid} from 'react-data-grid';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFruit : 'Apple',
            fruits : []
        }
        this.handleFruitChange = this.handleFruitChange.bind(this);
        this.addFruit = this.addFruit.bind(this);
    }

    handleFruitChange(event) {
        this.setState({selectedFruit : event.target.value});
    }

    addFruit() {
        const fruits = this.state.fruits;
        let fruit = this.state.fruits[this.state.selectedFruit];
        if(!fruit) {
            fruits[this.state.selectedFruit] =
                this.getFruit();
        } else {
            fruit.qty += 1;
        }
        this.setState({fruits});
    }

    getFruitRate(discount) {
        if(discount) {
            return fruitRates[this.state.selectedFruit] * ((100 - discount)/ 100);
        } else {
            return fruitRates[this.state.selectedFruit];
        }
    }

    getFruit() {
        let discount;
        if(this.state.selectedFruit === 'Apple') {
            discount = 10;
        }
        return {name : this.state.selectedFruit, qty :1, rate : this.getFruitRate(discount), discount : discount};
    }

  render() {

    const rows = [];
    let total = 0;
    for(let fruit in this.state.fruits) {
        rows.push(<Row>
                    <Col>{this.state.fruits[fruit].name}</Col>
                    <Col>{this.state.fruits[fruit].qty}</Col>
                    <Col>{this.state.fruits[fruit].rate}</Col>
                    <Col>{(this.state.fruits[fruit].rate * this.state.fruits[fruit].qty)}</Col>
                    <Col>{this.state.fruits[fruit].discount}</Col>
                </Row>)
                total += this.state.fruits[fruit].rate * this.state.fruits[fruit].qty;
    }

   /* const columns1 = [
      { key: 'name', name: 'Name' },
      { key: 'qty', name: 'Qty' },
      { key: 'rate', name: 'Rate' },
    ];*/
    return (
      <div>
        <Container fluid="md">
            <Row className="justify-content-md-center">
                <Col md="auto"><label>Select Fruit</label></Col>
                <Col md="auto">
                    <Form.Control size='sm' as="select"  value = {this.state.selectedFruit} onChange={this.handleFruitChange}>
                         <option value='Apple'>Apple</option>
                         <option value='Orange'>Orange</option>
                         <option value='Kiwi'>Kiwi</option>
                    </Form.Control>
                 </Col>
                <Col md="auto">
                    <Button variant="primary" onClick={this.addFruit}>
                      ADD
                    </Button>
                </Col>
            </Row>
        </Container>
        <Container fluid="md">
                <Row><Col>Name</Col><Col>Qty</Col><Col>Rate</Col><Col>Amount</Col><Col>Discount in %</Col></Row>
                {rows}
        </Container>
       {/* this.state.fruits.length > 0 && <ReactDataGrid
              columns={columns}
              rowGetter={i => this.state.fruits[i]}
              rows={this.state.fruits}
              rowsCount={this.state.fruits.length}
        />*/}
        <br/>
        <Container fluid="md">
            <Row><Col><b>Total : {total}</b></Col></Row>
        </Container>
      </div>
    );
  }
}

export default App;