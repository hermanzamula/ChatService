package com.teamdev.students.service.chat.util;


public class ChatServiceException extends Exception {


    private String errorMessage;

    public ChatServiceException(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
