package data;

import java.util.Date;

public class PrivateMessage extends Message {

    private User recipient;

    public PrivateMessage(Long messageId, String text, User sender, User recipient, Date postedAt) {
        super(messageId, text, sender, postedAt);
        this.recipient = recipient;
    }

    public User getRecipient() {
        return recipient;
    }
}
