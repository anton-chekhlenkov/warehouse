import React, {Component} from 'react';
import {Button, Grid} from 'react-bootstrap';
import ProductionList from './ProductionList';
import Auth from './security/auth'
import Login from './Login';
import {defaultErrorHandler} from './handlers/errorHandlers';
import {checkResponseStatus, loginResponseHandler} from './handlers/responseHandlers';
import {SERVER_URL} from './config';
import 'whatwg-fetch';
import ProductionForm from "./ProductionForm";

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
                this.setState({route: 'productionList'})
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
        this.setState({route: 'productionList'});
    };

    customErrorHandler = (error) => {
        this.reset();
        this.setState({error: error.message});
    };

    logoutHandler = () => {
        Auth.logOut();
        this.reset();
    };

    changeRouteHandler = (route) => {
        return () => {
            this.setState({route: route});
        }
    }


    contentForRoute() {
        const {error, userDetails, route} = this.state;

        const routeHandlers = {
            routeHome: this.changeRouteHandler('productionList'),
            routeProductionAdd: this.changeRouteHandler('productionAdd')
        }


        switch (route) {
            case 'login':
                return <Login error={error} userDetails={userDetails} inputChangeHandler={this.inputChangeHandler}
                                 onSubmit={this.login}/>;
            case 'productionList':
                return <ProductionList routeHandlers={routeHandlers} />;
            case 'productionAdd':
                return <ProductionForm routeHandlers={routeHandlers} />;
            default:
                return <p>Loading...</p>;
        }
    };

    render() {
        const content = this.contentForRoute();

        return (
            <Grid>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2>Welcome to warehouse.com
                            {Auth.loggedIn() ? <Button bsStyle="warning" className="pull-right" onClick={this.logoutHandler}>Log Out</Button> : null}
                        </h2>
                    </div>  
                    <div className="panel-body">
                        {content}
                    </div>

                </div>
            </Grid>
        );
    };


}

export default App;