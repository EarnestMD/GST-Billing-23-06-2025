package com.groceryList.exception;

public class InvalidCartItemException extends Exception {

    public InvalidCartItemException(String message) {
        super(message);
    }

    public InvalidCartItemException(String message, Throwable cause) {
        super(message, cause);
    }
}