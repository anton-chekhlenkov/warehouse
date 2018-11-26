import React from 'react';
import {Row, Button, Table} from 'react-bootstrap';
import {SERVER_URL} from '../config';
import headers from '../security/headers';
import 'whatwg-fetch';

class ProductionList extends React.Component {

    constructor() {
        super();

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        fetch(`${SERVER_URL}/api/production`, {
            method: 'GET',
            headers: headers(),
        })
            .then(r => r.json())
            .then(json => this.setState({list: json}))
            .catch(error => console.error('Error retrieving production: ' + error));
    }

    render() {
        const {list} = this.state;

        function renderProductionItem(productionItem) {
            return (<tr key={productionItem.extId}>
                <td>{productionItem.extId}</td>
                <td>{productionItem.name}</td>
                <td>{productionItem.brand}</td>
                <td>${productionItem.price}</td>
                <td>{productionItem.packSize}</td>
                <td>{productionItem.amount}</td>
            </tr>);
        };

        return <Row>
            <Row>
                <div>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>External ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Pack size</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map(renderProductionItem)}
                        </tbody>
                    </Table>
                </div>
            </Row>
        </Row>;
    }
}

export default ProductionList;
