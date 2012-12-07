package com.teamdev.students.service.chat.controller.dto;

public class MessagePostRequest {

    private String text;
    private String username;

    public MessagePostRequest(String username, String text) {
        this.text = text;
        this.username = username;
    }

    public String getText() {
        return text;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String toString() {
        return "MessageResponse{" +
                "text='" + text + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
