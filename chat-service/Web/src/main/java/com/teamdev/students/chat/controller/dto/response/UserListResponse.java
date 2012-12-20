package com.teamdev.students.chat.controller.dto.response;


import com.teamdev.students.chat.controller.dto.UserData;

import java.util.Collection;

public class UserListResponse {

    private Collection<UserData> users;

    public UserListResponse(Collection<UserData> users) {

        this.users = users;
    }

	public Collection<UserData> getUsers() {
		return users;
	}
}
