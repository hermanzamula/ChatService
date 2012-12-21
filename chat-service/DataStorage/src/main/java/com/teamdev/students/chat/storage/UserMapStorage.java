package com.teamdev.students.chat.storage;


import com.teamdev.students.chat.data.User;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class UserMapStorage implements UserStorage {


    private final Map<Long, User> users = new HashMap<Long, User>();
    private  long userIdIncrement = 0 ;

    @Override
    public void add(User user) {
        user.setId(++userIdIncrement);
        users.put(user.getId(), user);
    }

    @Override
    public Collection<User> findAll() {
        return users.values();
    }

    @Override
    public User find(String username) {

        if (username == null) {
            throw new NullPointerException("[UserStorage]: Username is null!");
        }

        for (User user : findAll()) {
            if (user.getName().equalsIgnoreCase(username)) {
                return user;
            }
        }
        return null;
    }


}
