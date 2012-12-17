package com.teamdev.students.chat.controller.dto;


public class UserData {
    private String username;
    private Long id;
	private  String color;

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserData(String username, Long id, String  color) {

        this.username = username;
        this.id = id;
		this.color = color;
    }
}
