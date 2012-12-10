package com.teamdev.students.service.chat.controller.dto.response;


import com.teamdev.students.service.chat.controller.dto.UserData;

import java.util.Collection;

public class UserListResponse {

    private Collection<UserData> users;

    public Collection<UserData> getUsers() {
        return users;
    }

    public void setUsers(Collection<UserData> users) {
        this.users = users;
    }

    public UserListResponse(Collection<UserData> users) {

        this.users = users;
    }
}
