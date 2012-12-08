package com.teamdev.students.service.chat.controller.dto.response;


public class UserRegistrationResponse extends UserResponse {

    String text;

    public UserRegistrationResponse(boolean ok, String userName, String text) {
        super(ok, userName);
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
