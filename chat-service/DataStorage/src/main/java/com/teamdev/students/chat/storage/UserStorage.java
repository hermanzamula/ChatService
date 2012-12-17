package com.teamdev.students.chat.storage;

import com.teamdev.students.chat.data.User;

import java.util.Collection;

public interface UserStorage {

    void add(User user);

    User get(Long userId);

    Collection<User> getAll();

    User getByName(String username);

}
