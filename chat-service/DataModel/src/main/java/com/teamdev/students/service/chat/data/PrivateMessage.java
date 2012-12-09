package com.teamdev.students.service.chat.data;

import java.util.Date;

public class PrivateMessage extends Message {

    private String recipient;

    public PrivateMessage(Long messageId, String text, String sender, String recipient, Date postedAt) {
        super(messageId, text, sender, postedAt);
        this.recipient = recipient;
    }

    @Override
    public String toString() {
        return "PrivateMessage{" +
                "recipient='" + recipient + '\'' +
                '}';
    }

    public String getRecipient() {
        return recipient;
    }
}
