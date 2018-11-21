import React from 'react';
import { Row, Jumbotron, Button } from 'react-bootstrap';
import { SERVER_URL } from './config';
import headers from './security/headers';
import 'whatwg-fetch';
import ProductionList from './ProductionList';

class Production extends React.Component {

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
/*
  submitNewProduction = (newProduction) => {
    fetch(`${SERVER_URL}/api/production`, {
      method: 'POST',
      headers: headers(), 
      body: JSON.stringify(newProduction)
    }).then(r => r.json())
      .then(json => {
        let production = this.state.production;
        production.push({id: json.id, name: json.name, make: json.make, model: json.model, driver: json.driver});
        this.setState({production});
      })
      .catch(ex => console.error('Unable to save production', ex));
  };
*/
  render() {
    const {list} = this.state;
    
    const logoutButton = <Button bsStyle="warning" className="pull-right" onClick={this.props.logoutHandler} >Log Out</Button>;

    return <Row>
      <Jumbotron>
        <h2>Welcome to warehouse.com</h2>
        {logoutButton}
      </Jumbotron>

      <Row>
        <ProductionList productionItems={list} />
      </Row>
    </Row>;
  }
}

export default Production;
