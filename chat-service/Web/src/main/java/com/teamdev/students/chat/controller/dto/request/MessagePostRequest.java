package com.teamdev.students.chat.controller.dto.request;

public class MessagePostRequest {

    private String username;
    private String text;

    public String getText() {
        return text;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUsername() {
        return username;
    }
}
