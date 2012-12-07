package storage;


import data.User;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class UserStorageImpl implements UserStorage {


    private final Map<Long, User> users = new HashMap<Long, User>();

    public UserStorageImpl() {
        users.put(1L, new User(1L, "Gogol", "Nikolai"));
        users.put(2L, new User(2L, "Tolstoy", "Lev"));
        users.put(3L, new User(3L, "Lermontov", "Yuri"));
        users.put(4L, new User(4L, "Pushkin", "Alexandr"));
    }

    @Override
    public void add(User user) {
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
            throw new NullPointerException("[storage.UserStorage]: Username is null!");
        }

        for (User user : getAll()) {
            if (user.getName().equalsIgnoreCase(username)) {
                return user;
            }
        }
        return null;
    }


}
