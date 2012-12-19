package com.teamdev.students.chat.data;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.User;

import java.util.Date;

public class PrivateMessage extends Message {

    private User recipient;

    public PrivateMessage(long messageId, String text, User sender, User recipient, Date postedAt) {
        super(messageId, text, sender, postedAt);
        this.recipient = recipient;
    }

    @Override
    public String toString() {
        return "PrivateMessage{" +
                "recipient='" + recipient + '\'' +
                '}';
    }

    public User getRecipient() {
        return recipient;
    }

}
