import React from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Row} from 'react-bootstrap';

import {Redirect} from "react-router-dom";
import {SERVER_URL} from "../config";
import {checkResponseStatus, loginResponseHandler} from "../handlers/responseHandlers";
import {defaultErrorHandler} from "../handlers/errorHandlers";

class Login extends React.Component {

    state = {
        redirectToReferrer: false,
        userDetails: {
            username: '',
            password: ''
        },
        error: null
    };

    reset = () => {
        this.setState({
            redirectToReferrer: false,
            userDetails: {
                username: '',
                password: ''
            },
            error: null
        });
    };

    customLoginHandler = () => {
        this.setState({redirectToReferrer: true});
    };

    customErrorHandler = (error) => {
        this.reset();
        this.setState({error: 'Authorisation Error. Please try again!'});
    };

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

    inputChangeHandler = (event) => {
        const target = event.target;

        let {userDetails} = this.state;
        userDetails[target.name] = target.value;

        this.setState({userDetails});
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}

        if (this.state.redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        return (
            <Row>
                <Col sm={8} smOffset={4}>
                    {from.pathname !== '/' ?
                        <p>Please <b>login</b> to view the page: <code>{from.pathname}</code></p> :
                        <p>Enter your <b>username</b> and <b>password</b></p>}
                </Col>

                <Col sm={4} smOffset={4}>

                    {this.state.error ? <p className="alert alert-danger">{this.state.error} </p> : null}

                    <Form onSubmit={this.login}>
                        <FormGroup>
                            <FormControl type='text' name='username' placeholder='Username'
                                         value={this.state.userDetails.username}
                                         onChange={this.inputChangeHandler}/>
                            <FormControl type='password' name='password' placeholder='Password'
                                         value={this.state.userDetails.password}
                                         onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Button bsStyle="success" type="submit">Log in</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Login;