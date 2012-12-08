package com.teamdev.students.service.chat.controller.dto.request;

public class UserLoginRequest extends UserRequest {

    private String password;


    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}
