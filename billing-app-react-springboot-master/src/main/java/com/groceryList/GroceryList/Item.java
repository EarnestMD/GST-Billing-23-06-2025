package com.groceryList.GroceryList;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "product_code"
        }),
        @UniqueConstraint(columnNames = {
                "product_name"
        })
})
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String product_code;
	private String product_name;
	private double product_price;
	private int product_gst;

	public String getProduct_code() {
		return product_code;
	}

	public void setProduct_code(String product_code) {
		this.product_code = product_code;
	}
	
	public String getProduct_name() {
		return product_name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public double getProduct_price() {
		return product_price;
	}

	public void setProduct_price(double product_price) {
		this.product_price = product_price;
	}

	public int getProduct_gst() {
		return product_gst;
	}

	public void setProduct_gst(int product_gst) {
		this.product_gst = product_gst;
	}
}
