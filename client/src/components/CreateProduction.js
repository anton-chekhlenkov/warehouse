import React from 'react';
import {func} from 'prop-types';
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
        errors: []
    };

    handleSubmit = (event) => {
        event.preventDefault();

        // Check fields
        var emptyFields = this.emptyFields()
        if (emptyFields.length) {
            this.setState({errors: emptyFields.map(val => `You should fill the field: ${val}`)});
            return;
        }

        console.log("subm")
        // Submit
        this.submitProductionItem(this.state.productionItemData);

        // Clear form
        this.setState({
            productionItemData: {
                extId: '',
                name: '',
                brand: '',
                price: '',
                packSize: '',
                amount: ''
            },
            error: []
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


    submitProductionItem = (data) => {
        fetch(`${SERVER_URL}/api/production`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(data)
        }).then(r => r.json())
            .catch(ex => {
                this.setState({errors: ['Unable to save production item: ' + ex]});
                console.error('Unable to save production', ex);
            });
    };


    handleChange = (event) => {
        var productionItemData = this.state.productionItemData;
        productionItemData[event.target.name] = event.target.value;
        this.setState({productionItemData: productionItemData});
    }

    render() {

        function renderError(error) {
            return (<p className="alert alert-danger" key={error}>{error}</p>);
        };

        return (
            <div>
                {this.state.errors.map(renderError)}

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