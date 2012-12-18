package com.teamdev.students.chat.service;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;
import com.teamdev.students.chat.storage.ChatMessageStorage;
import com.teamdev.students.chat.storage.UserStorage;
import com.teamdev.students.chat.util.ChatServiceException;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.teamdev.students.chat.service.ExternalMessages.LEFT_CHAT_MESSAGE;
import static com.teamdev.students.chat.storage.ChatStorageFactory.createMessageStorage;
import static com.teamdev.students.chat.storage.ChatStorageFactory.createUserStorage;
import static com.teamdev.students.chat.storage.StorageType.MAP_STORAGE;

@Service
public class ChatService {

	private static final Logger LOGGER = Logger.getLogger(ChatService.class);

	private static final ChatMessageStorage MESSAGE_STORAGE = createMessageStorage(MAP_STORAGE);
	private static final UserStorage USER_STORAGE = createUserStorage(MAP_STORAGE); //Store user data
    private static final Map<User, Date> USER_LIST = new HashMap<User, Date>();  //Store users and its last request date

	public synchronized void postMessage(final Message message) {
		LOGGER.debug("post message: \'" + message + " " + message.getPostedAt());
		MESSAGE_STORAGE.add(message);
	}

	public synchronized boolean postPrivate(final PrivateMessage message) throws ChatServiceException {
		LOGGER.debug("post private message: '" + message);
		if (isAlreadyEntered(message.getRecipient())) {
			MESSAGE_STORAGE.addPrivate(message);
			return true;
		}
		throw new ChatServiceException("User '" + message.getRecipient().getName() + "' offline");
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
			addUser(user);
			return true;
		}
		return false;
	}

	private void addUser(User user) {
		USER_LIST.put(user, new Date());
	}


	public void exitChat(final String username) {

		LOGGER.debug(username + LEFT_CHAT_MESSAGE);
		final User user = USER_STORAGE.getByName(username.trim());
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


	public User findUser(final String username) {
		return USER_STORAGE.getByName(username.trim());
	}

	public synchronized Collection<Message> getMessages(String username) {
		final User user = findUser(username.trim());
		final Date lastDate = USER_LIST.get(user);
		final Date end = new Date();
		final Collection<Message> messages = MESSAGE_STORAGE.getByDateRange(lastDate, end);
		USER_LIST.put(user, end);
		return messages;
	}

	/**
	 * @param user - new User
	 * @return true - registration passed successfully and false otherwise
	 */
	public synchronized boolean registerAndEnter(User user) {
		final boolean isNotExists = !isUserExists(user.getName());
		if (isNotExists) {
			USER_STORAGE.add(user);
			addUser(user);
		}
		return isNotExists;
	}

	public boolean isUserExists(String username) {
		return findUser(username) != null;
	}

	public synchronized Collection<PrivateMessage> getPrivates(final String username) {
		final User user = findUser(username.trim());
		final Date lastDate = USER_LIST.get(user);
		final Date date = new Date();
		LOGGER.debug("last: " + lastDate.getTime() + " new: " + date.getTime());
		final Collection<PrivateMessage> messages = MESSAGE_STORAGE.getPrivateByDateRange(lastDate, date, user);
		USER_LIST.put(user, date);
		return messages;
	}

	public Collection<User> getUserList() {
		return USER_LIST.keySet();
	}
}
