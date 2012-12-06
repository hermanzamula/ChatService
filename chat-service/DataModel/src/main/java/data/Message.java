package data;

import java.util.Date;

public class Message {

    private  Long messageId;
    private String text;
    private User sender;
    private Date postedAt;

    @Override
    public String toString() {
        return "data.Message{" +
                "messageId=" + messageId +
                ", text='" + text + '\'' +
                ", sender=" + sender +
                ", postedAt=" + postedAt +
                '}';
    }

    public Message(Long messageId, String text, User sender, Date postedAt) {
        this.messageId = messageId;
        this.text = text;
        this.sender = sender;
        this.postedAt = postedAt;
    }

    public Long getMessageId() {
        return messageId;
    }

    public String getText() {
        return text;
    }

    public User getSender() {
        return sender;
    }

    public Date getPostedAt() {
        return postedAt;
    }

}
