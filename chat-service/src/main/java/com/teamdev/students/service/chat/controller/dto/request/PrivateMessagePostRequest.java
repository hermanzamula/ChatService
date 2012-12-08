package com.teamdev.students.service.chat.controller.dto.request;


public class PrivateMessagePostRequest extends MessagePostRequest {

    private String recipient;

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }


    @Override
    public String toString() {
        return "PrivateMessagePostRequest{" +
                "recipient='" + recipient + '\'' +
                '}';
    }
}
