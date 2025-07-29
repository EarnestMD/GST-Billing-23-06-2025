package com.groceryList.service;

import com.groceryList.dto.CartItemDTO;
import com.groceryList.models.Bill;
import com.groceryList.models.BillItem;
import com.groceryList.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    @Transactional
    public Bill saveBill(List<CartItemDTO> cartItems) {
        Bill bill = new Bill();
        bill.setBillDate(LocalDate.now());

        List<BillItem> billItems = cartItems.stream()
                .filter(Objects::nonNull) // Add a safety check to skip any null items in the list
                .map(cartItem -> {
                    BillItem billItem = new BillItem();
                    // Use correct camelCase getters from the updated CartItemDTO
                    billItem.setProductCode(cartItem.getProductCode());
                    billItem.setProductName(cartItem.getProductName());
                    billItem.setProductPrice(cartItem.getProductPrice());
                    billItem.setProductGst(cartItem.getProductGst());
                    billItem.setQuantity(cartItem.getQuantity());

                    // --- Perform calculations safely using BigDecimal ---

                    // Use default values if any of the required fields are null to prevent NullPointerException
                    BigDecimal price = cartItem.getProductPrice() != null ? cartItem.getProductPrice() : BigDecimal.ZERO;
                    BigDecimal quantity = cartItem.getQuantity() != null ? new BigDecimal(cartItem.getQuantity()) : BigDecimal.ZERO;
                    BigDecimal gst = cartItem.getProductGst() != null ? cartItem.getProductGst() : BigDecimal.ZERO;

                    // GST percentage (e.g., 18) to a decimal multiplier (e.g., 1.18)
                    BigDecimal gstMultiplier = BigDecimal.ONE.add(
                            gst.divide(new BigDecimal("100.00"), 2, RoundingMode.HALF_UP)
                    );

                    // Subtotal = (Price * Quantity) * (1 + GST/100)
                    BigDecimal subtotal = price
                            .multiply(quantity)
                            .multiply(gstMultiplier);

                    // Set subtotal, assuming the field in BillItem is also BigDecimal
                    billItem.setSubtotal(subtotal.setScale(2, RoundingMode.HALF_UP));

                    billItem.setBill(bill); // Link back to the parent bill
                    return billItem;
                }).collect(Collectors.toList());

        bill.setBillItems(billItems);
        
        // Sum the subtotals to get the total amount
        BigDecimal totalAmount = billItems.stream().map(BillItem::getSubtotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        bill.setTotalAmount(totalAmount.setScale(2, RoundingMode.HALF_UP));

        return billRepository.save(bill);
    }
}