import React from 'react';
import {Table} from 'react-bootstrap';
import {SERVER_URL} from '../config';
import headers from '../security/headers';
import 'whatwg-fetch';
import {checkResponseStatus} from "../handlers/responseHandlers";

class ShowProduction extends React.Component {

    state = {
        list: [],
        result: ''
    }

    componentDidMount() {
        fetch(`${SERVER_URL}/api/production`, {
            method: 'GET',
            headers: headers(),
        })
            .then(checkResponseStatus)
            .then(json => this.setState({list: json, result: ''}))
            .catch(error => {
                this.setState({result: 'Failed retrieving production! ' + error})
                console.error('Failed retrieving production! ' + error)
            });
    }

    render() {
        const {list, result} = this.state;

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

        return <div>

            {result ? <p className="alert alert-warning">{result}</p> : null}

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
        </div>;
    }
}

export default ShowProduction;
