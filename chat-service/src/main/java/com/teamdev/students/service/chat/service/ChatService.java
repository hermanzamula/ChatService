package com.teamdev.students.service.chat.service;

import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.User;
import com.teamdev.students.service.chat.storage.MessageStorage;
import com.teamdev.students.service.chat.storage.MessageStorageImpl;
import com.teamdev.students.service.chat.storage.UserStorage;
import com.teamdev.students.service.chat.storage.UserStorageImpl;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ChatService {

    private static final Logger LOGGER = Logger.getLogger(ChatService.class);

    private static final MessageStorage MESSAGE_STORAGE = new MessageStorageImpl();

    //Store user data
    private static final UserStorage USER_STORAGE = new UserStorageImpl();

    //List of users that enter to chat
    private static final List<User> USER_LIST = new ArrayList<User>();

    public Message findMessage(final Long idMessage) {
        LOGGER.debug("Get message for id " + idMessage);
        return MESSAGE_STORAGE.get(idMessage);
    }

    public synchronized void postMessage(final Message message) {
        LOGGER.debug("post message: \'" + message);
        MESSAGE_STORAGE.add(message);
    }

    /**
     * @return true, if such user exists in data storage, false - no such user exists
     */
    public boolean enterChat(final String username, final String password) {
        LOGGER.debug("User " + username + " try to enter chat");
        final User user = USER_STORAGE.getByName(username);

        if (user == null) {
            return false;
        }

        if (!isAlreadyEntered(user) &&
                user.getPassword().equalsIgnoreCase(password)) {
            USER_LIST.add(user);
            return true;
        }

        return false;
    }

    public void exitChat(final String username) {
        LOGGER.debug("user" + username + " left chat");
        final User user = USER_STORAGE.getByName(username);
        USER_LIST.remove(user);
    }

    /**
     * Find user in current user list
     *
     * @return true - such user exists in user list, false - user not exists in storage or in user list
     */
    public boolean isAlreadyEntered(final User user) {
        return user != null && USER_LIST.contains(user);
    }

    public User findUser(final String username) {
        return USER_STORAGE.getByName(username);
    }

    public Collection<Message> getMessageHistory() {
        return MESSAGE_STORAGE.getHistory();
    }

    public void registerAndEnter(User user) {
        USER_STORAGE.add(user);
        USER_LIST.add(user);
    }

    public boolean isUserExists(String username) {
        return findUser(username) != null;
    }
}
