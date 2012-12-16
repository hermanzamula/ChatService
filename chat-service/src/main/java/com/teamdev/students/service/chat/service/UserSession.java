package com.teamdev.students.service.chat.service;


import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(value = "session")
public class UserSession {
    String username;

    public String getUsername() {
        return username;
    }

    public UserSession(String username) {

        this.username = username;
    }
}
