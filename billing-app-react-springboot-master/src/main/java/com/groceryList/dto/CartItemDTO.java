package com.groceryList.dto;

import java.math.BigDecimal;

public class CartItemDTO {
    private Long id;
    private String productCode;
    private String productName;
    private BigDecimal productPrice;
    private BigDecimal productGst; // Using BigDecimal for precision
    private Integer quantity;
    private double unitPrice;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }
    
    // existing getters and setters

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }


    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public BigDecimal getProductGst() {
        return productGst;
    }

    public void setProductGst(BigDecimal productGst) {
        this.productGst = productGst;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
