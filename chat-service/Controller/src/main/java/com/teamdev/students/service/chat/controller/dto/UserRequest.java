package com.teamdev.students.service.chat.controller.dto;


public class UserRequest {

    private String username;

    public String getUsername() {
        return username;
    }

    public UserRequest(String username) {
        this.username = username;
    }
}
