import React, { Component } from 'react';
import SearchItem from './SearchItem';
import api from '../services/api';
import MyToast from './MyToast';

import { Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPrint, faUndo, faSave } from '@fortawesome/free-solid-svg-icons';

export default class Billing extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			notClicked: true,
			showToast: false,
			toastMessage: '',
			toastType: ''
		};
	}

	handleAddItem = (selectedItem) => {
		this.setState({
			// Use spread syntax to avoid direct state mutation
			cart: [...this.state.cart, selectedItem],
			notClicked: false
		});
	}

	updateQuantity = (index, val) => {
		this.setState({
			cart: this.state.cart.map((item, i) => (
				i === index ? { ...item, quantity: val } : item
			))
		})
	}

	handleSave = () => {
		const { cart } = this.state;
		if (cart.length === 0) {
			alert("Cannot save an empty bill. Please add items to the cart.");
			return;
		}

		// Map frontend state (snake_case) to backend DTO (camelCase)
		const billData = cart.map(item => ({
			productCode: item.product_code,
			productName: item.product_name,
			productPrice: item.product_price,
			productGst: item.product_gst,
			quantity: item.quantity
		}));

		api.post("/bills/SaveBill", billData)
			.then(response => {
				console.log("Bill saved successfully:", response.data);
				this.setState({ showToast: true, toastMessage: "Bill Saved Successfully!", toastType: "success" });
			})
			.catch(error => {
				console.error("Error saving bill:", error);
				this.setState({ showToast: true, toastMessage: "Could not save the bill.", toastType: "danger" });
			});
	}

	handlePrint = () => {
		const { cart } = this.state;
		if (cart.length === 0) {
			alert("Cannot print an empty bill. Please add items to the cart.");
			return;
		}

		// This now only triggers the browser's print dialog
		window.print();
	}

	handleReset = () => {
		this.setState({
			cart: [],
			notClicked: true
		});
	}

	render() {

		return (

			<div>
				<MyToast
					show={this.state.showToast}
					message={this.state.toastMessage}
					type={this.state.toastType}
					onClose={() => this.setState({ showToast: false })}
				/>
				<div className="no-print">
					<SearchItem
						addItem={this.handleAddItem}
					/>
				</div>
				<Card className={"border border-dark bg-dark text-white printable-area"}>
					<Card.Header>
						<div className="print-header">
							<h4 style={{ textAlign: 'center' }}>Your Store Name</h4>
							<p style={{ textAlign: 'center', margin: 0 }}>123 Main Street, Anytown, USA</p>
							<p style={{ textAlign: 'center', margin: 0 }}>Date: {new Date().toLocaleDateString()}</p>
						</div>
						<div className="no-print"><FontAwesomeIcon icon={faList} /> Billing List</div>
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
										this.state.cart.map((item, i) => (
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
												<td>{calculateSubtotal(item).toFixed(2)}</td>
											</tr>
										))}
							</tbody>
							<tfoot>
								<tr>
									<th colSpan="5" align="center"><h3>Total</h3></th>
									<th><h3><Total cart={this.state.cart} /></h3></th>
								</tr>
							</tfoot>
						</Table>


					</Card.Body>
					<Card.Footer style={{ "textAlign": "right" }} className="no-print">
						<Button size="sm" variant="success" type="button" onClick={this.handleSave}>
							<FontAwesomeIcon icon={faSave} />Save
						</Button>{' '}
						<Button size="sm" variant="info" type="button" onClick={this.handlePrint}>
							<FontAwesomeIcon icon={faPrint} />Print
						</Button>{' '}
						<Button size="sm" variant="danger" type="button" onClick={this.handleReset}>
							<FontAwesomeIcon icon={faUndo} />Reset
						</Button>
					</Card.Footer>

				</Card>
			</div>
		)
	}
}

const calculateSubtotal = (item) => {
	if (!item || !item.product_price || !item.quantity) {
		return 0;
	}
	const price = Number(item.product_price);
	const quantity = Number(item.quantity);
	const gst = Number(item.product_gst) || 0;

	const subtotal = price * quantity * (1 + gst / 100);
	return Number(subtotal.toFixed(2));
};

const Total = ({ cart }) => {
	const total = cart.reduce((sum, item) => sum + calculateSubtotal(item), 0);
	return total.toFixed(2);
};