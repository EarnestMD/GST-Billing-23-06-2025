package com.groceryList.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "item") // Assuming your table is named 'items'
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String product_code;
    private String product_name;
    private Double product_price; // Added this field
    private Double product_gst;   // Added this field

    // Constructors
    public Item() {
    }

    public Item(String product_code, String product_name, Double product_price, Double product_gst) {
        this.product_code = product_code;
        this.product_name = product_name;
        this.product_price = product_price;
        this.product_gst = product_gst;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProduct_code() {
        return product_code;
    }

    public void setProduct_code(String product_code) {
        this.product_code = product_code;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Double getProduct_price() {
        return product_price;
    }

    public void setProduct_price(Double product_price) {
        this.product_price = product_price;
    }

    public Double getProduct_gst() {
        return product_gst;
    }

    public void setProduct_gst(Double product_gst) {
        this.product_gst = product_gst;
    }

    @Override
    public String toString() {
        return "Item{" +
               "id=" + id +
               ", product_code='" + product_code + '\'' +
               ", product_name='" + product_name + '\'' +
               ", product_price=" + product_price +
               ", product_gst=" + product_gst +
               '}';
    }
}
