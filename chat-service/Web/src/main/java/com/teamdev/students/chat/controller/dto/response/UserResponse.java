package com.teamdev.students.chat.controller.dto.response;


public class UserResponse {

    boolean isOk;
    String username;
	String color;

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public UserResponse(boolean ok, String username, String color) {
        isOk = ok;
        this.username = username;
    }

    public boolean isOk() {
        return isOk;
    }

    public String getUsername() {
        return username;
    }

    public void setIsOk(boolean isOk) {
       this.isOk = isOk;
    }

    @Override
    public String toString() {
        return "UserResponse{" +
                "isOk=" + isOk +
                ", username='" + username + '\'' +
                '}';
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
