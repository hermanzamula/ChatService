package controller.dto;


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
}
