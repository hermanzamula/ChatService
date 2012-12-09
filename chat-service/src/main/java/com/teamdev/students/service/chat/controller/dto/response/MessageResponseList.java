package com.teamdev.students.service.chat.controller.dto.response;


import java.util.Collection;

public class MessageResponseList {

    private Collection<MessageResponse> messages;
    private boolean empty;

    public MessageResponseList(boolean empty) {
        this.empty = empty;
    }

    public Collection<MessageResponse> getMessages() {
        return messages;
    }

    public void setMessages(Collection<MessageResponse> messages) {
        this.messages = messages;
    }

    public MessageResponseList(Collection<MessageResponse> messages, boolean empty) {
        this.messages = messages;
        this.empty = empty;
    }

    public boolean isEmpty() {
        return empty;
    }

    public void setEmpty(boolean empty) {
        this.empty = empty;
    }

}
