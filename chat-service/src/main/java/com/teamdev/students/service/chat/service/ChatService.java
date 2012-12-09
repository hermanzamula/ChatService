package com.teamdev.students.service.chat.service;

import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.PrivateMessage;
import com.teamdev.students.service.chat.data.User;
import com.teamdev.students.service.chat.storage.*;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.teamdev.students.service.chat.storage.ChatStorageFactory.*;
import static com.teamdev.students.service.chat.storage.StorageType.*;

@Service
public class ChatService {

    private static final Logger LOGGER = Logger.getLogger(ChatService.class);

    private static final MessageStorage MESSAGE_STORAGE = createMessageStorage(FROM_MAP);
    private static final UserStorage USER_STORAGE = createUserStorage(FROM_MAP); //Store user data

    /**List of users that enter to chat.
     * Contains last posted private messages (after last request on private messages)  */
    private static final Map<User, List<PrivateMessage>> USER_LIST = new HashMap<User, List<PrivateMessage>>();

    public Message findMessage(final Long idMessage) {
        LOGGER.debug("Get message for id " + idMessage);
        return MESSAGE_STORAGE.get(idMessage);
    }

    public synchronized void postMessage(final Message message) {
        LOGGER.debug("post message: \'" + message);
        MESSAGE_STORAGE.add(message);
    }

    public synchronized boolean postPrivate(final PrivateMessage message) {
        LOGGER.debug("post private message: '" + message);
        if (isAlreadyEntered(message.getRecipient())) {
            final User user = findUser(message.getRecipient());
            USER_LIST.get(user).add(message);
			MESSAGE_STORAGE.addPrivate(message);
            return true;
        }
        return false;
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
            USER_LIST.put(user, new ArrayList<PrivateMessage>());
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
    private boolean isAlreadyEntered(final User user) {
        return user != null && USER_LIST.containsKey(user);
    }

    public boolean isAlreadyEntered(final String username) {
        return isAlreadyEntered(findUser(username));
    }

    public User findUser(final String username) {
        return USER_STORAGE.getByName(username);
    }

    public Collection<Message> getMessageHistory() {
        return MESSAGE_STORAGE.getHistory();
    }

    public void registerAndEnter(User user) {
        USER_STORAGE.add(user);
        USER_LIST.put(user, new ArrayList<PrivateMessage>());
    }

    public boolean isUserExists(String username) {
        return findUser(username) != null;
    }

    public Collection<PrivateMessage> getPrivates(String username) {

        final List<PrivateMessage> messageList = USER_LIST.get(findUser(username));
        final List<PrivateMessage> privateMessages = new ArrayList<PrivateMessage>(messageList);
        messageList.clear();
        return privateMessages;
    }
}
