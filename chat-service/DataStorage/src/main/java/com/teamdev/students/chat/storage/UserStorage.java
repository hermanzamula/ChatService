package com.teamdev.students.chat.storage;

import com.teamdev.students.chat.data.User;

import java.util.Collection;

public interface UserStorage {

    void add(User user);

    Collection<User> findAll();

    User find(String username);

}
