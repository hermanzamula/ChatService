package com.teamdev.students.service.chat.controller.dto.response;


import java.text.SimpleDateFormat;
import java.util.Date;

public class MessageResponse {

    public static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("HH:mm:ss");
    private String text;
    private String username;
    private String date;



    public MessageResponse(String username, String text, Date date) {
        this.text = text;
        this.username = username;
        this.date = DATE_FORMAT.format(date);
    }

    public String getDate() {
        return date;
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
        this.date = DATE_FORMAT.format(date);
    }

    @Override
    public String toString() {
        return "MessageResponse{" +
                "text='" + text + '\'' +
                ", username='" + username + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
