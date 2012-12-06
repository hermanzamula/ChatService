package controller.dto;

import java.util.Date;

public class MessagePostRequest {

    private String text;
    private String username;

    public MessagePostRequest(String username, String text, Date date) {
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
