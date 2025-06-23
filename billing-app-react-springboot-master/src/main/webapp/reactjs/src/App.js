import React from 'react';
import NavigationBar from './components/NavigationBar';
import Billing from './components/Billing';
import Welcome from './components/Welcome';
import Product from './components/Product';
import ProductEntry from './components/ProductEntry';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {Container,Row,Col} from 'react-bootstrap';

function App() {
  return (
	<Router>
		<NavigationBar/>
		<Container>
			<Row>
				<Col lg={12} className={"marginTop"}>
					<Switch>
					<Route path="/" exact component={Welcome}/>
					<Route path="/products" exact component={Product}/>
					<Route path="/add" exact component={ProductEntry}/>
    				<Route path="/edit/:id" exact component={Product}/>
					<Route path="/billing" exact component={Billing}/>				
					</Switch>
				</Col>
			</Row>
		</Container>
	</Router>
  );
}

export default App;
