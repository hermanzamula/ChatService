package com.teamdev.students.service.chat.controller.dto.response;


import java.util.Date;

public class PrivateMessageResponse extends MessageResponse {

    private String from;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public PrivateMessageResponse(String username, String text, Date date, String from) {

        super(username, text, date);
        this.from = from;
    }

    @Override
    public String toString() {
        return "PrivateMessageResponse{" +
                "from='" + from + '\'' +
                '}';
    }
}
