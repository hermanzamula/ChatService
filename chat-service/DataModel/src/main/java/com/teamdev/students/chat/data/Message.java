package com.teamdev.students.chat.data;

import com.teamdev.students.chat.data.User;

import java.util.Date;

public class Message implements Comparable<Date> {

    private long messageId;
    private String text;
    private User sender;
    private Date postedAt;

    @Override
    public String toString() {
        return "Message{" +
                "messageId=" + messageId +
                ", text='" + text + '\'' +
                ", sender=" + sender +
                ", postedAt=" + postedAt +
                '}';
    }

    public Message(long messageId, String text, User sender, Date postedAt) {
        this.messageId = messageId;
        this.text = text;
        this.sender = sender;
        this.postedAt = postedAt;
    }

    public long getMessageId() {
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

	@Override
	public int compareTo(Date o) {
		return postedAt.compareTo(o);
	}
}
