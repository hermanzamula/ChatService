package com.teamdev.students.chat.controller.dto.response;


import java.util.Collection;

public class PrivateMessageResponseList {

    private Collection<PrivateMessageResponse> messages;
    private boolean empty;

    public PrivateMessageResponseList(boolean empty, Collection<PrivateMessageResponse> messages) {
        this.empty = empty;
        this.messages = messages;
    }

    public Collection<PrivateMessageResponse> getMessages() {
        return messages;
    }
    public boolean isEmpty() {
        return empty;
    }

}
