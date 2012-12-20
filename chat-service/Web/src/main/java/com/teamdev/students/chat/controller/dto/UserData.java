package com.teamdev.students.chat.controller.dto;


public class UserData {
    private String username;
	private  String color;

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}


    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserData(String username,  String  color) {

        this.username = username;
		this.color = color;
    }
}
