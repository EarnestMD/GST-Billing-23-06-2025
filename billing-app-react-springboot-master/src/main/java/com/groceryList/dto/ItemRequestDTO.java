package com.groceryList.dto;

import com.groceryList.model.Item; // Assuming Item is now in com.groceryList.model

// This DTO is used for incoming requests (e.g., creating or updating an item)
public class ItemRequestDTO {
    private String product_code;
    private String product_name;
    private Double product_price;
    private Double product_gst;

    // Getters and Setters
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

    // Method to convert DTO to Entity (for saving/updating)
    public Item toEntity() {
        Item item = new Item();
        item.setProduct_code(this.product_code);
        item.setProduct_name(this.product_name);
        item.setProduct_price(this.product_price);
        item.setProduct_gst(this.product_gst);
        return item;
    }
}