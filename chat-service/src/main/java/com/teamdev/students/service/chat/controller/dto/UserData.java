package com.teamdev.students.service.chat.controller.dto;


public class UserData {
    private String username;
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserData(String username, Long id) {

        this.username = username;
        this.id = id;
    }
}
