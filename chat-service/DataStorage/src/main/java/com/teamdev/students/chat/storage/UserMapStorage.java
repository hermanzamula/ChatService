package com.teamdev.students.chat.storage;


import com.teamdev.students.chat.data.User;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class UserMapStorage implements UserStorage {


    private final Map<Long, User> users = new HashMap<Long, User>();
    private  long userIdIncrement = 0 ;

    public UserMapStorage() {
		++ userIdIncrement;
        users.put(userIdIncrement, new User(userIdIncrement, "Gogol", "Nikolai", "red"));
		++ userIdIncrement;
        users.put(userIdIncrement, new User(userIdIncrement, "Tolstoy", "Lev", "black"));
		++userIdIncrement;
        users.put(userIdIncrement, new User(userIdIncrement, "Lermontov", "Yuri", "blue"));
		++ userIdIncrement;
        users.put(userIdIncrement, new User(userIdIncrement, "Pushkin", "Alexandr", "pink"));
    }

    @Override
    public void add(User user) {
        user.setId(++userIdIncrement);
        users.put(user.getId(), user);
    }

    @Override
    public User get(Long userId) {
        return users.get(userId);
    }

    @Override
    public Collection<User> getAll() {
        return users.values();
    }

    @Override
    public User getByName(String username) {

        if (username == null) {
            throw new NullPointerException("[UserStorage]: Username is null!");
        }

        for (User user : getAll()) {
            if (user.getName().equalsIgnoreCase(username)) {
                return user;
            }
        }
        return null;
    }


}
