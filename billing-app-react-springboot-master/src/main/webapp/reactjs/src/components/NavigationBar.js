import React,{Component} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component{
	render(){
		return (
			<Navbar bg="dark" variant="dark">
				<Link to={""} className="navbar-brand">
					<img src="./billing_app.jpg" width="40" height="40" alt="Brand"/>Billing App
				</Link>
				<Nav className="mr-auto">
					<Link to={"/add"} className="nav-link">Product Entry</Link>
					<Link to={"/billing"} className="nav-link">Billing</Link>
				</Nav>
			</Navbar>
		);
	}
}