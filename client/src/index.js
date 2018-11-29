import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import {BrowserRouter as Router, Link, Redirect, Route, withRouter} from "react-router-dom";
import {Switch} from 'react-router';
import CreateProduction from './components/CreateProduction';
import ShowProduction from './components/ShowProduction';
import Login from './components/Login';
import Auth from "./security/auth";
import {Button, Col, Grid, Row} from "react-bootstrap";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Error404 from "./components/Error404";


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

function CustomLink({path, title}) {
    return (
        <li style={{display: 'inline', margin: 5}}>
            <Link to={path} className="btn btn-outline-secondary">{title}</Link>
        </li>
    )
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
                            <CustomLink path="/show" title="Show all" />
                            <CustomLink path="/rest" title="Show rest" />
                            <CustomLink path="/create" title="Add" />
                        </ul>

                        <Col sm={10} smOffset={1}>
                            <Switch>
                                <PrivateRoute exact path="/" component={ShowProduction}/>
                                <Route path="/login" component={Login}/>
                                <PrivateRoute path="/show" component={ShowProduction}/>
                                <PrivateRoute path="/rest" component={ShowProduction}/>
                                <PrivateRoute path="/create" component={CreateProduction}/>
                                <Route component={Error404}/>
                            </Switch>
                        </Col>
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
