package com.teamdev.students.service.chat.controller.dto.response;


import java.util.Date;

public class MessageResponse {

    private String text;
    private String username;
    private Date date;

    public Date getDate() {
        return date;
    }

    public MessageResponse(String username, String text, Date date) {
        this.text = text;
        this.username = username;
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public String getUsername() {
        return username;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "MessageResponse{" +
                "text='" + text + '\'' +
                ", username='" + username + '\'' +
                ", date=" + date +
                '}';
    }
}
