package com.teamdev.students.chat.data;

public class User {

    private Long id;
    private String name;
    private String password;
	private String color;

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getPassword() {
        return password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User(Long Id, String name, String password, String color) {
        this.id = Id;
        this.name = name;
        this.password = password;
		this.color = color;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
