package controller.dto;


public class UserLoginRequest extends UserRequest {

    private String password;

    public String getPassword() {
        return password;
    }

    public UserLoginRequest(String username, String password) {
        super(username);
        this.password = password;
    }
}
