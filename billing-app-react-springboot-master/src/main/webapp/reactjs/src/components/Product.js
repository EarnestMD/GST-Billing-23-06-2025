import React,{Component} from 'react';
import {Card,Form,Button,Col} from 'react-bootstrap';
import MyToast from './MyToast';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave,faList,faEdit} from '@fortawesome/free-solid-svg-icons';

export default class Product extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			show : false
		};
		this.itemChange = this.itemChange.bind(this);
		this.updateItem = this.updateItem.bind(this);
	}
	
	componentDidMount(){
		const itemId = +this.props.match.params.id;
		if(itemId){
			this.findItemById(itemId);
		}
	}
	
	findItemById = (itemId) => {
		axios.get("http://localhost:8081/rest/items/"+itemId)
			.then(response => {
			if(response.data != null){
				this.setState({
					id: response.data.id,
					product_code: response.data.product_code,
					product_name: response.data.product_name,
					product_price: response.data.product_price,
					product_gst: response.data.product_gst
				});
			}
		}).catch((error) => {
			console.error("Error - "+error);
		});
	}
	
	updateItem = event => {
		event.preventDefault();
		
		const item = {
			id: this.state.id,
			product_code: this.state.product_code,
			product_name: this.state.product_name,
			product_price: this.state.product_price,
			product_gst: this.state.product_gst
		};
		
		axios.put("http://localhost:8081/rest/items",item)
		.then(response => {
			if(response.data != null){
				this.setState({"show":true,"method":"put"});
				setTimeout(() => this.setState({"show":false}),3000);
				setTimeout(() => this.productEntry(),2000);
			}else{
				this.setState({"show":false});					
			}
		});
		this.setState(this.initialState);
	};
	
	itemChange = event => {
		this.setState({
			[event.target.name]:event.target.value
		});
	};
	
	productEntry = () => {
		return this.props.history.push("/add");
	};
	
	render(){
		
		const {product_code,product_name,product_price,product_gst} = this.state;
		
		return(
			<div>
				<div style={{"display":this.state.show ? "block" : "none"}}>
					<MyToast show = {this.state.show} message={"Item Updated Successfully"} type={"success"}/>				
				</div>
					<Card className={"border border-dark bg-dark text-white"}>
						<Card.Header><FontAwesomeIcon icon={faEdit}/>Update Item
						</Card.Header>
						<Form onSubmit={this.updateItem} id="Id">
							<Card.Body>
								<Form.Row>
									  <Form.Group as={Col} controlId="formGridTitle">
									    <Form.Label>Product code</Form.Label>
									    <Form.Control required autoComplete="off"
									    	type="text" name="product_code"
									    	value={product_code} onChange={this.itemChange}
									    	className={"bg-dark text-white"}
									    	placeholder="Enter Product code" />
									  </Form.Group>
									  <Form.Group as={Col} controlId="formGridTitle">
									  	<Form.Label>Product name</Form.Label>
									    <Form.Control required autoComplete="off"
									    	type="text" name="product_name"
									    	value={product_name} onChange={this.itemChange}
									    	className={"bg-dark text-white"}
									    	placeholder="Enter Product name" />
									  </Form.Group>
									  <Form.Group as={Col} controlId="formGridTitle">
									    <Form.Label>Price</Form.Label>
									    <Form.Control required autoComplete="off"
									    	type="text" name="product_price"
									    	value={product_price} onChange={this.itemChange}
									    	className={"bg-dark text-white"}
									    	placeholder="Enter Product price" />
									  </Form.Group>
									  <Form.Group as={Col} controlId="formGridTitle">
									    <Form.Label>GST%</Form.Label>
									    <Form.Control required autoComplete="off"
									    	type="text" name="product_gst"
									    	value={product_gst} onChange={this.itemChange}
									    	className={"bg-dark text-white"}
									    	placeholder="Enter GST%" />
									  </Form.Group>
								  </Form.Row>
							   </Card.Body>
							   <Card.Footer style={{"textAlign":"right"}}>
								<Button size="sm" variant="success" type="submit">
									<FontAwesomeIcon icon={faSave}/>Update 
							    </Button>{' '}
								<Button size="sm" variant="info" type="button" onClick={this.productEntry.bind()}>
									<FontAwesomeIcon icon={faList}/>Product List
								</Button>
							</Card.Footer>
							</Form>
						</Card>
			</div>
		);
	}
}