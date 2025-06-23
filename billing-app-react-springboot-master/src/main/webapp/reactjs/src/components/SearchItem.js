import React,{Component} from 'react';
import {Card,Table,InputGroup,FormControl,ButtonGroup,Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch,faPlus,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class SearchItem extends Component{
	
	constructor(props){
		super(props);
		this.state = {
				items : [],
				search : '',
				quantity: 0
		};
		this.searchData = this.searchData.bind(this);
	}
	
	componentDidMount(){
		this.findAllItems();
	}
	
	findAllItems(){
		axios.get("http://localhost:8081/rest/items")
			.then(response => response.data)
			.then((data) => {
				this.setState({items: data});
			});
	};
	
	searchChange = event => {
		this.setState({
			[event.target.name] : event.target.value
		});
	};
	
	cancelSearch = () => {
		this.setState({"search":''});
	};
	
	searchData = () => {
		axios.get("http://localhost:8081/rest/items/search/"+this.state.search)
			.then(response => response.data)
			.then((data) => {
				this.setState({
						items: data
					});
			});
	};
	
	addItem = (id,product_code,product_name,product_price,product_gst,quantity) => {
		const selectedItem = {
				id:id,
				product_code:product_code,
				product_name:product_name,
				product_price:product_price,
				product_gst:product_gst,
				quantity: quantity
		};
		this.props.addItem(selectedItem);
	}
	
	render(){
		
		const {search} = this.state;
		let quantity = this.state.quantity;
		const filteredProduct = this.state.items.filter(
				(item) => {
					return item.product_name.toLowerCase().indexOf(this.state.search) !== -1||item.product_code.indexOf(this.state.search) !== -1;
				}
		);
		
		return(
				<div>
						<Card className={"border border-dark bg-dark text-white"}>
						<Card.Header>
							<div style={{"float":"right"}}>
								<InputGroup size="sm">
									<FormControl placeholder="Search" name="search" value={search} autoComplete="off" 
										className={"info-border bg-dark text-white"}
										onChange={this.searchChange}/>
									<InputGroup.Append>
										<Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
											<FontAwesomeIcon icon={faSearch}/>
										</Button>
                                        <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        	<FontAwesomeIcon icon={faTimes}/>
										</Button>
									</InputGroup.Append>
								</InputGroup>
							</div>
						</Card.Header>
						<Card.Body>
							<Table bordered hover striped variant="dark">
							<thead>
						    <tr>
						      <th>Product Code</th>
						      <th>Product Name</th>
						      <th>Price</th>
						      <th>GST</th>
						      <th>Action</th>
						    </tr>
						  </thead>
						  <tbody>
						  {
							  search === '' ?
							  <tr align="center">
							  		<td colSpan="5"></td>
						      </tr> :
							  filteredProduct.map((item)=>(
						      <tr key={item.id}>
						      	<td>{item.product_code}</td>
						      	<td>{item.product_name}</td>
						      	<td>{item.product_price}</td>
						      	<td>{item.product_gst}</td>
						      	<td>
						      	<ButtonGroup>
						      		<Button size="sm" variant="success" onClick={this.addItem.bind(
						      				this,item.id,item.product_code,item.product_name,item.product_price,item.product_gst,quantity)}>
						      			<FontAwesomeIcon icon={faPlus}/>Add
						      		</Button>
							    </ButtonGroup>
							 </td>
						      </tr>
						      ))
						  } 
						  </tbody>
							</Table>
						</Card.Body>
					</Card>
				</div>
				
		);
	}
}