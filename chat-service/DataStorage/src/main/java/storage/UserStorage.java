package storage;

import data.User;

import java.util.Collection;

public interface UserStorage {

    void add(User user);

    User get(Long userId);

    Collection<User> getAll();

    User getByName(String username);

}
