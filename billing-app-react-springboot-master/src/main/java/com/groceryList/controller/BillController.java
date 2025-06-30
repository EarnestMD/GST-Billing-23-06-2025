package com.groceryList.controller;

import com.groceryList.dto.CartItemDTO;
import com.groceryList.model.Bill;
import com.groceryList.service.BillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class BillController {

    private static final Logger logger = LoggerFactory.getLogger(BillController.class);

    @Autowired
    private BillService billService;

    @PostMapping("/SaveBill")
    public ResponseEntity<Bill> handleSaveBillRequest(@RequestBody List<CartItemDTO> cartItems) {
        // Add validation to prevent processing empty or null requests
        if (cartItems == null || cartItems.isEmpty()) {
            logger.warn("Received an empty or null bill request. Rejecting.");
            return ResponseEntity.badRequest().build(); // Return 400 Bad Request
        }

        logger.info("Received save bill request for {} items in the backend.", cartItems.size());
        Bill savedBill = billService.saveBill(cartItems);
        logger.info("Bill with ID {} was saved. Total: {}", savedBill.getId(), savedBill.getTotalAmount());
        return ResponseEntity.ok(savedBill);
    }
}