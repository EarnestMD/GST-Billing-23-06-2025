import React,{Component} from 'react';
import SearchItem from './SearchItem';
import {Card,Table} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';

export default class Billing extends Component {
	
	constructor(props){
		super(props);
		this.state = {
				items : [],
				cart:[],
				notClicked : true
		};
		this.handleAddItem = this.handleAddItem.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
	}
	
	handleAddItem = (selectedItem) => {
		let cartItem = this.state.cart;
		let productQty = selectedItem.quantity;
		console.log(productQty);
		cartItem.push(selectedItem);
		this.setState({
			cart: cartItem,
			notClicked : false
		});
	}
	
	updateQuantity = (index, val) => {
	    this.setState({
	      cart: this.state.cart.map((item, i) => (
	        i === index ? {...item, quantity: val} : item
	      ))
	    })
	}
	
	render(){
		
		return (
		
			<div>
				<div>
					<SearchItem 
					addItem={this.handleAddItem}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white"}>
				<Card.Header>
						<FontAwesomeIcon icon={faList}/>Billing List					
				</Card.Header>
				<Card.Body>
					<Table bordered hover striped variant="dark">
					<thead>
					    <tr>
					      <th>Product Code</th>
					      <th>Product Name</th>
					      <th>Price</th>
					      <th>GST%</th>
					      <th>Quantity</th>
					      <th>Subtotal</th>
					    </tr>
					</thead>
					<tbody>
					{
						   (this.state.notClicked) ?
						  <tr align="center">
					      	<td colSpan="6"></td>
					      </tr> :
					    	  this.state.cart.map((item,i)=>(
						    <tr key={i}>
					      	<td>{item.product_code}</td>					      							      	
					      	<td>{item.product_name}</td>
					      	<td>{item.product_price}</td>
					      	<td>{item.product_gst}</td>
					      	<td>
					      	<input 
					          type="text" 
					          value={item.quantity} className={"info-border bg-dark text-white"}
					          onChange={e => this.updateQuantity(i, parseInt(e.target.value) || 0)}
					        />
					      	</td>
					      	<td>{Math.round((item.product_price*item.quantity*(1+item.product_gst/100))*100)/100}</td>
					      </tr>
					))}
					</tbody>
					<tfoot>
						<tr>
							<th colSpan="5" align="center"><h3>Total</h3></th>
							<th><Total cart={this.state.cart} /></th>
						</tr>
					</tfoot>
					</Table>
				</Card.Body>
				</Card>
			</div>
		)
	}
}

const Total = ({ cart }) => (
	<h3> 
			{cart.reduce((sum, i) => (
		      sum += Math.round((i.product_price*i.quantity*(1+i.product_gst/100))*100)/100
		    ), 0)}
	</h3>
)