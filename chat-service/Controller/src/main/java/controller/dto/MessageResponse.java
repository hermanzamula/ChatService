package controller.dto;


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

    @Override
    public String toString() {
        return "MessageResponse{" +
                "text='" + text + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
