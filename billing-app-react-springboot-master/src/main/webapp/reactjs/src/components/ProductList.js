import React,{Component} from 'react';
import {Card,Table,InputGroup,FormControl,ButtonGroup,Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faEdit,faTrash,faStepBackward,faFastBackward,faStepForward,faFastForward} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import {Link} from 'react-router-dom';
import './Style.css';

export default class ProductList extends Component {
	
	constructor(props){
		super(props);
		this.state = {
				items : [],
				currentPage: 1,
				itemsPerPage: 5
		};
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
	
	deleteItem = (itemId) => {
		axios.delete("http://localhost:8081/rest/items/"+itemId)
			.then(response => {
				if(response.data != null){
					this.setState({"show":true});
					setTimeout(() => this.setState({"show":false}),3000);					
					this.setState({
						items: this.state.items.filter(item => item.id !== itemId)
					});
				}else{
					this.setState({"show":false});					
				}
			});
	};
	
	changePage = event => {
		this.setState({
			[event.target.name]: parseInt(event.target.value)
		});
	};
	
	firstPage = () => {
		if(this.state.currentPage > 1) {
			this.setState({
				currentPage: 1
			});
		}
	};
	
	prevPage = () => {
		if(this.state.currentPage > 1) {
			this.setState({
				currentPage: this.state.currentPage - 1
			});
		}
	};
	
	lastPage = () => {
		if(this.state.currentPage < Math.ceil(this.state.items.length / this.state.itemsPerPage)) {
			this.setState({
				currentPage: Math.ceil(this.state.items.length / this.state.itemsPerPage)
			});
		}
	};
	
	nextPage = () => {
		if(this.state.currentPage < Math.ceil(this.state.items.length / this.state.itemsPerPage)) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});
		}
	};
	
	render(){
		
		const {items,currentPage,itemsPerPage} = this.state;
		const lastIndex = currentPage * itemsPerPage;
		const firstIndex = lastIndex - itemsPerPage;
		const currentItems = items.slice(firstIndex,lastIndex);
		const totalPages = Math.ceil(items.length / itemsPerPage);
		
		return(
			<div>
				<div style={{"display":this.state.show ? "block" : "none"}}>
					<MyToast show = {this.state.show} message={"Item Deleted Successfully"} type={"danger"}/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header>
						<FontAwesomeIcon icon={faList}/>Product List					
				</Card.Header>
				<Card.Body>
					<Table bordered hover striped variant="dark">
					<thead>
					    <tr>
					      <th>Product Code</th>
					      <th>Product Name</th>
					      <th>Price</th>
					      <th>GST%</th>
					      <th>Actions</th>
					    </tr>
					</thead>
					<tbody>
					   {
						   this.state.items.length === 0 ?
						  <tr align="center">
					      	<td colSpan="5">No Items Available</td>
					      </tr> :
					    	currentItems.map((item)=>(
					      <tr key={item.id}>
					      	<td>{item.product_code}</td>					      							      	
					      	<td>{item.product_name}</td>
					      	<td>{item.product_price}</td>
					      	<td>{item.product_gst}</td>					      	
					      	<td>
					      		<ButtonGroup>					      			
					      			<Link to={"edit/"+item.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}						      			
					      			<Button size="sm" variant="outline-danger" onClick={this.deleteItem.bind(this,item.id)}><FontAwesomeIcon icon={faTrash}/></Button>
					      		</ButtonGroup>
					      	</td>
					      </tr>
					      ))
					  } 
					  </tbody>
					 </Table>
					</Card.Body>
					{items.length > 0 ?
						    <Card.Footer>
							    <div style={{"float":"left"}}>
							    	Showing Page {currentPage} of {totalPages}
							    </div>
							    <div style={{"float":"right"}}>
						    		<InputGroup size="sm">
						    			<InputGroup.Prepend>
						    				<Button type="button" variant="outline-info" disabled={currentPage===1?true:false}
						    					onClick={this.firstPage}>
						    					<FontAwesomeIcon icon={faFastBackward}/>First
						    				</Button>
			                                <Button type="button" variant="outline-info" disabled={currentPage===1?true:false}
			                                	onClick={this.prevPage}>
			                                	<FontAwesomeIcon icon={faStepBackward}/>Prev
						    				</Button>
						    			</InputGroup.Prepend>
						    			<FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
						    				onChange={this.changePage}/>
						    			<InputGroup.Append>
							    			<Button type="button" variant="outline-info" disabled={currentPage===totalPages?true:false}
							    				onClick={this.nextPage}>
							    				<FontAwesomeIcon icon={faStepForward}/>Next
						    				</Button>
			                                <Button type="button" variant="outline-info" disabled={currentPage===totalPages?true:false}
			                                	onClick={this.lastPage}>
			                                	<FontAwesomeIcon icon={faFastForward}/>Last
						    				</Button>
						    			</InputGroup.Append>
						    		</InputGroup>
							    </div>
						    </Card.Footer> : null
				            }
				    </Card>
			</div>
		);
	}
}