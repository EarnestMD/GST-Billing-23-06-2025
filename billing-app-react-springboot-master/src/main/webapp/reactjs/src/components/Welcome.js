import React,{Component} from 'react';
import {Jumbotron} from 'react-bootstrap';

export default class Welcome extends Component{
	render(){
		return(
			<Jumbotron className="bg-dark text-white">
    			<h1 align="center">GST BILLING APP</h1>
    			<blockquote className="blockquote mb-0">
    				<br/>
    				<p align="center">
    					- A must for every store
    				</p>
    			</blockquote>
    		</Jumbotron>	
		);
	}
}