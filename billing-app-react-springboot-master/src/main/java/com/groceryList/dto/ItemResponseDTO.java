package com.groceryList.dto;

import com.groceryList.model.Item; // Assuming Item is now in com.groceryList.model

// This DTO is used for outgoing responses (e.g., fetching item details)
public class ItemResponseDTO {
    private Long id; // Include ID for response
    private String product_code;
    private String product_name;
    private Double product_price;
    private Double product_gst;

    // Constructor to convert Entity to DTO (for sending responses)
    public ItemResponseDTO(Item item) {
        this.id = item.getId();
        this.product_code = item.getProduct_code();
        this.product_name = item.getProduct_name();
        this.product_price = item.getProduct_price();
        this.product_gst = item.getProduct_gst();
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
}