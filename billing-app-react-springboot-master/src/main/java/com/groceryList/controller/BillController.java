package com.groceryList.controller;

import com.groceryList.dto.CartItemDTO;
import com.groceryList.models.Bill;
import com.groceryList.exception.InvalidCartItemException;
import com.groceryList.service.AuditLogService;
import com.groceryList.service.BillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.StringUtils;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class BillController {

    private static final Logger logger = LoggerFactory.getLogger(BillController.class);

    @Autowired
    private BillService billService;

    @Autowired
    private AuditLogService auditLogService;

    @PostMapping("/SaveBill")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Bill> handleSaveBillRequest(@RequestBody List<CartItemDTO> cartItems) throws InvalidCartItemException {
        validateCartItems(cartItems);

        logger.info("Received save bill request for {} items.", cartItems.size());
        try {
            Bill savedBill = billService.saveBill(cartItems);
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            auditLogService.logBillSaved(savedBill.getId(), savedBill.getTotalAmount().doubleValue(), username);
            return ResponseEntity.ok(savedBill);
        } catch (Exception e) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            auditLogService.logFailedBillSaveAttempt(e.getMessage(), username);
            throw e; // Re-throw the exception to be handled by the global exception handler
        }
    }

    private void validateCartItems(List<CartItemDTO> cartItems) throws InvalidCartItemException {
        if (cartItems == null || cartItems.isEmpty()) {
            throw new InvalidCartItemException("Cart items cannot be empty.");
        }

        for (CartItemDTO item : cartItems) {
            if (item == null) {
                throw new InvalidCartItemException("Cart item cannot be null.");
            }

            if (StringUtils.isEmpty(item.getProductName())) {
                throw new InvalidCartItemException("Product ID cannot be empty.");
            }

            if (item.getQuantity() <= 0) {
                throw new InvalidCartItemException("Quantity must be greater than zero.");
            }

            if (item.getUnitPrice() <= 0.0) {
                throw new InvalidCartItemException("Price must be greater than zero.");
            }

            // You can add more specific validations as needed, e.g., checking product ID format,
            // price range, etc.
        }
    }
}