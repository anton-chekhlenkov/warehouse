import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import {BrowserRouter as Router, Link, Redirect, Route, withRouter} from "react-router-dom";
import {Switch} from 'react-router';
import ProductionForm from './components/ProductionForm';
import ProductionList from './components/ProductionList';
import Login from './components/Login';
import Auth from "./security/auth";
import {Button, Col, Grid, Row} from "react-bootstrap";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Error404 from "./components/Error404";
import App from "./App";


const AuthButtons = withRouter(
    ({history}) =>
        <div className="pull-right">
            {Auth.loggedIn() ?
                <Button bsStyle="warning"
                        onClick={() => {
                            Auth.logOut()
                            history.push("/");
                        }}
                >Sign out
                </Button> : <Link to="/login" className="pull-right btn btn-success" >Log in</Link>}
        </div>
);

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={props =>
                (Auth.loggedIn()) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: props.location}
                        }}/>
                )
            }
        />
    );
}

const Root = () => (
    <Router>
        <div>

            <Grid>
                <div className="panel panel-default">
                    <div className="panel-heading">

                        <Row>
                            <Col sm={11} smOffset={0}>
                                <h3 className="text-center">warehouse.com</h3>
                            </Col>
                            <Col sm={1} smOffset={0}>
                                <AuthButtons/>
                            </Col>
                        </Row>
                    </div>
                    <div className="panel-body">
                        <ul>
                            <li style={{display: 'inline', margin: 5}}>
                                <Link to="/show" className="btn btn-outline-secondary">Show list</Link></li>
                            <li style={{display: 'inline', margin: 5}}>
                                <Link to="/rest" className="btn btn-outline-secondary">Show rest</Link></li>
                            <li style={{display: 'inline', margin: 5}}>
                                <Link to="/create" className="btn btn-outline-secondary">Add new</Link></li>
                        </ul>

                        <Switch>
                            <PrivateRoute exact path="/" component={ProductionList}/>
                            <Route path="/login" component={Login}/>
                            <PrivateRoute path="/show" component={ProductionList}/>
                            <PrivateRoute path="/rest" component={ProductionList}/>
                            <PrivateRoute path="/create" component={ProductionForm}/>
                            <Route component={Error404}/>
                        </Switch>
                    </div>

                </div>
            </Grid>

        </div>
    </Router>
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
