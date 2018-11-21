import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Production from './Production';
import Auth from './security/auth'
import Login from './Login';
import {defaultErrorHandler} from './handlers/errorHandlers';
import {checkResponseStatus, loginResponseHandler} from './handlers/responseHandlers';
import { SERVER_URL } from './config';
import 'whatwg-fetch';

class App extends Component {

  constructor() {
    super();

    this.state = {
      userDetails: {
        username: '',
        password: ''
      },
      route: '',
      error: null
    }
  }

  reset = () => {
    this.setState({
      userDetails: {
        username: '',
        password: ''
      },
      route: 'login',
      error: null
    });
  };

  componentDidMount() {
    (async () => {
      if (await Auth.loggedIn()) {
        this.setState({route: 'production'})
      } else {
        this.setState({route: 'login'})
      }
    })();
  }

  componentDidUpdate() {
    if (this.state.route !== 'login' && !Auth.loggedIn()) {
      this.setState({route: 'login'})
    }
  }

  inputChangeHandler = (event) => {
    let {userDetails} = this.state;
    const target = event.target;

    userDetails[target.name] = target.value;

    this.setState({userDetails});
  }

  login = (e) => {
    e.preventDefault();

    fetch(`${SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.userDetails)
    }).then(checkResponseStatus)
      .then(response => loginResponseHandler(response, this.customLoginHandler))
      .catch(error => defaultErrorHandler(error, this.customErrorHandler));

  };

  customLoginHandler = () => { 
    this.setState({route: 'production'});
  };

  customErrorHandler = (error) => { 
    this.reset();
    this.setState({error: error.message});
  };

  logoutHandler = () => {
    Auth.logOut();
    this.reset();
  };

  contentForRoute() { 
    const {error, userDetails, route} = this.state;

    const loginContent = <Login error={error} 
                                userDetails={userDetails}
                                inputChangeHandler={this.inputChangeHandler}
                                onSubmit={this.login}/>;

    const productionContent = <Production logoutHandler={this.logoutHandler}/>;

    switch (route) {
      case 'login':
        return loginContent;
      case 'production':
        return productionContent;
      default:
        return <p>Loading...</p>;
    }
  };

  render() { 
    const content = this.contentForRoute();

    return (
      <Grid>
        {content}
      </Grid>
    );
  };

 
}

export default App;