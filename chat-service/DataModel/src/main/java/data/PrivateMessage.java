package data;

import java.util.Date;

public class PrivateMessage extends Message {

    private Long recipientId;

    public PrivateMessage(Long messageId, String text, User senderId, Date postedAt, Long recipientId) {
        super(messageId, text, senderId, postedAt);
        this.recipientId = recipientId;
    }

    public Long getRecipientId() {
        return recipientId;
    }
}
