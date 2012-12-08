package com.teamdev.students.service.chat.controller.dto.response;


public class UserResponse {

    boolean isOk;
    String userName;

    public UserResponse(boolean ok, String userName) {
        isOk = ok;
        this.userName = userName;
    }

    public boolean isOk() {
        return isOk;
    }

    public String getUserName() {
        return userName;
    }

    public void setIsOk(boolean isOk) {
       this.isOk = isOk;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
