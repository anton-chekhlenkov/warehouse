import React from 'react';
import {ControlLabel, Form, FormControl} from "react-bootstrap";
import {SERVER_URL} from '../config';
import headers from '../security/headers';

class CreateProduction extends React.Component {

    state = {
        productionItemData: {
            extId: '',
            name: '',
            brand: '',
            price: '',
            packSize: '',
            amount: ''
        },
        result: []
    };

    reset = () => {
        this.setState({
            productionItemData: {
                extId: '',
                name: '',
                brand: '',
                price: '',
                packSize: '',
                amount: ''
            },
            result: []
        });
    };

    emptyFields = () => {
        let {productionItemData} = this.state
        var empty = []
        for (var property in productionItemData) {
            if (productionItemData.hasOwnProperty(property)) {
                if (!productionItemData[property]) {
                    empty.push(property);
                }
            }
        }
        return empty
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Check fields
        var emptyFields = this.emptyFields()
        if (emptyFields.length) {
            this.setState({result: emptyFields.map(val => `You should fill the field: ${val}`)});
            return;
        }

        // Submit
        this.submitProductionItem(this.state.productionItemData);
    };

    handleSubmitError = (error) => {
        this.setState({result: ['Unable to submit data to the server!']});
        console.error('Unable to submit data to the server', error);
    }

    handleSubmitResponse = (response) => {
        console.log(response)
        console.log(response.message)
        console.log(response.error)

        if (response.error) {
            console.error('Unable to save production', response.message);
            this.setState({result: [`Unable to save the production item! Code: {pesponse.error} Cause: {response.message}`]});
        } else {
            this.reset()
            this.setState({result: ['The production item was successfully saved']})
        }


    }


    submitProductionItem = (data) => {
        fetch(`${SERVER_URL}/api/production`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(data)
        }).then(r => r.json())
            .then(response => this.handleSubmitResponse(response))
            .catch(error => this.handleSubmitError(error));
    };

    handleChange = (event) => {
        var productionItemData = this.state.productionItemData;
        productionItemData[event.target.name] = event.target.value;
        this.setState({productionItemData: productionItemData});
    }

    render() {

        function renderResult(result) {
            return (<p className="alert alert-warning" key={result}>{result}</p>);
        };

        return (
            <div>
                {this.state.result.map(renderResult)}

                <Form className="form" onSubmit={this.handleSubmit}>

                    <ControlLabel>External ID</ControlLabel>
                    <FormControl className="form-control" type='text' name='extId'
                                 value={this.state.productionItemData.extId} onChange={this.handleChange}/>

                    <ControlLabel>Name</ControlLabel>
                    <FormControl className="form-control" type='text' name='name'
                                 value={this.state.productionItemData.name} onChange={this.handleChange}/>


                    <ControlLabel>Brand</ControlLabel>
                    <FormControl className="form-control" type='text' name='brand'
                                 value={this.state.productionItemData.brand} onChange={this.handleChange}/>

                    <ControlLabel>Price</ControlLabel>
                    <FormControl className="form-control" type='text' name='price'
                                 value={this.state.productionItemData.price} onChange={this.handleChange}/>

                    <ControlLabel>Pack size</ControlLabel>
                    <FormControl className="form-control" type='text' name='packSize'
                                 value={this.state.productionItemData.packSize} onChange={this.handleChange}/>

                    <ControlLabel>Amount</ControlLabel>
                    <FormControl className="form-control" type='text' name='amount'
                                 value={this.state.productionItemData.amount} onChange={this.handleChange}/>
                    <br/>
                    <input className="btn btn-success pull-right" type="submit" value="Add"/>
                </Form>
            </div>
        );

    }
}

export default CreateProduction;