import React from 'react';
import {Table} from 'react-bootstrap';
import {array} from 'prop-types';


class ProductionList extends React.Component {

    render() {
        function renderProductionItem(productionItem) {
            return (<tr key={productionItem.id}>
                <td>{productionItem.extId}</td>
                <td>{productionItem.name}</td>
                <td>{productionItem.brand}</td>
                <td>${(productionItem.price/100).toFixed(2)}</td>
                <td>{productionItem.packSize}</td>
                <td>{productionItem.amount}</td>
            </tr>);
        }

        return <div>
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

                {this.props.productionItems.map(renderProductionItem)}

                </tbody>
            </Table>
        </div>;
    }
}

ProductionList.propTypes = {
    productionItems: array
};

export default ProductionList;
