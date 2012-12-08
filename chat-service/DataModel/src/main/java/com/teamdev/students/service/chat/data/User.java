package com.teamdev.students.service.chat.data;

public class User {

    private Long id;
    private String name;
    private String password;

    public String getPassword() {
        return password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User(Long Id, String name, String password) {
        this.id = Id;
        this.name = name;
        this.password = password;
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
