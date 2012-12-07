package controller.dto;


public class UserLoginRequest {

    private String userName;
    private String password;

    public UserLoginRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
