package com.groceryList.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService {

    private static final Logger logger = LoggerFactory.getLogger(AuditLogService.class);

    public void logBillSaved(Long billId, Double totalAmount, String username) {
        logger.info("Audit: Bill saved. Bill ID: {}, Total Amount: {}, User: {}", billId, totalAmount, username);
    }

    // You can add other audit logging methods as needed, e.g., for bill updates, deletions, etc.
    public void logFailedBillSaveAttempt(String reason, String username) {
        logger.warn("Audit: Failed attempt to save bill. Reason: {}, User: {}", reason, username);
    }
}