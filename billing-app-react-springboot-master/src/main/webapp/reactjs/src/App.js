import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';

// Your Existing Components
import NavigationBar from './components/NavigationBar';
import Billing from './components/Billing';
import Product from './components/Product';
import ProductEntry from './components/ProductEntry';

// New Auth and Home Components
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"marginTop"}>
            <Switch>
              {/* Redirect from the root path to the login page */}
              <Route path="/" exact>
                <Redirect to="/login" />
              </Route>

              {/* Authentication Routes */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              {/* Your Application's Routes */}
              <Route path="/home" component={Home} />
              <Route path="/products" component={Product} />
              <Route path="/add" component={ProductEntry} />
              <Route path="/edit/:id" component={Product} />
              <Route path="/billing" component={Billing} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
