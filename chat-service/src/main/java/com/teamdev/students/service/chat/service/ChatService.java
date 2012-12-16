package com.teamdev.students.service.chat.service;

import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.PrivateMessage;
import com.teamdev.students.service.chat.data.User;
import com.teamdev.students.service.chat.storage.MessageStorage;
import com.teamdev.students.service.chat.storage.UserStorage;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.teamdev.students.service.chat.service.ExternalMessages.LEFT_CHAT_MESSAGE;
import static com.teamdev.students.service.chat.storage.ChatStorageFactory.createMessageStorage;
import static com.teamdev.students.service.chat.storage.ChatStorageFactory.createUserStorage;
import static com.teamdev.students.service.chat.storage.StorageType.FROM_MAP;

@Service
public class ChatService {

    private static final Logger LOGGER = Logger.getLogger(ChatService.class);

    private static final MessageStorage MESSAGE_STORAGE = createMessageStorage(FROM_MAP);
    private static final UserStorage USER_STORAGE = createUserStorage(FROM_MAP); //Store user data
  //  private static final Map<User, ArrayList<PrivateMessage>> USER_LIST = new HashMap<User, ArrayList<PrivateMessage>>();


    //Store all changes such  users login, users logout for each user
   // private static final Map<String/*username*/, List<String>> CHANGES_FOR_USER = new HashMap<String, List<String>>();


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
            final User user = findUser(message.getRecipient().getName());
           // USER_LIST.get(user).add(message);
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
        final User user = USER_STORAGE.getByName(username.trim());

        if (user == null) {
            return false;
        }

        if (!isAlreadyEntered(user) &&
                user.getPassword().equalsIgnoreCase(password.trim())) {
            // USER_LIST.put(user, new ArrayList<PrivateMessage>());
            //CHANGES_FOR_USER.put(user.getName(), new ArrayList<String>());
           // setChanges(username + ExternalMessages.ENTER_TO_CHAT_MESSAGE);
            return true;
        }
        return false;
    }

   /* private void setChanges(final String message) {
        final Set<String> users = CHANGES_FOR_USER.keySet();
        for (String user : users) {
            CHANGES_FOR_USER.get(user).add(message);
        }
    } */

    public void exitChat(final String username) {

        LOGGER.debug(username + LEFT_CHAT_MESSAGE);
        final User user = USER_STORAGE.getByName(username.trim());
        USER_LIST.remove(user);
        setChanges(username + LEFT_CHAT_MESSAGE);
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
        return isAlreadyEntered(findUser(username.trim()));
    }

    public User findUser(final String username) {
        return USER_STORAGE.getByName(username.trim());
    }

    public Collection<Message> getMessageHistory() {
        return MESSAGE_STORAGE.getHistory();
    }

    public void registerAndEnter(User user) {
        USER_STORAGE.add(user);
        enterChat(user.getName(), user.getPassword());
    }

    public boolean isUserExists(String username) {
        return findUser(username) != null;
    }

    public Collection<PrivateMessage> getPrivates(String username) {

        final List<PrivateMessage> messageList = USER_LIST.get(findUser(username));
        final List<PrivateMessage> newPrivateMessages = new ArrayList<PrivateMessage>(messageList);
        messageList.clear();
        return newPrivateMessages;
    }

    public Collection<User> getUserList() {
        return USER_LIST.keySet();
    }

   /* public List<String> getChangeList(final String username) {
        //TODO may work incorrectly...
        final List<String> changes = CHANGES_FOR_USER.get(username);
        CHANGES_FOR_USER.get(username).clear();
        return changes;
    } */
}
