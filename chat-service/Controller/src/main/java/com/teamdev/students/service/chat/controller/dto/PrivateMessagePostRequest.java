package com.teamdev.students.service.chat.controller.dto;


import java.util.Date;

public class PrivateMessagePostRequest extends MessagePostRequest {

    private String recipient;

    public String getRecipient() {
        return recipient;
    }

    public PrivateMessagePostRequest(String sender, String recipient, String text, Date date) {
        super(sender, text);
        this.recipient = recipient;
    }
}
