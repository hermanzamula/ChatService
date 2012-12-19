package com.teamdev.students.chat.service;

import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;
import com.teamdev.students.chat.storage.ChatMessageStorage;
import com.teamdev.students.chat.storage.MessageMapStorage;
import com.teamdev.students.chat.storage.UserMapStorage;
import com.teamdev.students.chat.storage.UserStorage;
import com.teamdev.students.chat.util.ChatServiceException;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.teamdev.students.chat.service.ExternalMessages.LEFT_CHAT_MESSAGE;

@Service
public class ChatService {

	private static final Logger LOGGER = Logger.getLogger(ChatService.class);

	private static final ChatMessageStorage MESSAGE_STORAGE = new MessageMapStorage();
	private static final UserStorage USER_STORAGE = new UserMapStorage();

	//Store user data
	private static final Map<User, Long> USER_LIST = new HashMap<User, Long>();    //Store users and its last request date
	private static final long LIST_EMPTY = -1;

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
		USER_LIST.put(user, MESSAGE_STORAGE.getLastMessageId());
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
		final long lastMessage = USER_LIST.get(user);
		List<Message> messages = new ArrayList<Message>();
		if (lastMessage == MESSAGE_STORAGE.getLastMessageId()) {
			return messages;
		}
		messages = MESSAGE_STORAGE.getLastsPublicAfter(lastMessage);
		final long lastMessageId = getLastMessageId(messages);
		if (lastMessageId != LIST_EMPTY) {
			USER_LIST.put(user, lastMessageId);
		}
		return messages;
	}

	private long getLastMessageId(List<? extends Message> messages) {
		if (messages.isEmpty()) {
			return LIST_EMPTY;
		}
		return messages.get(messages.size() - 1).getMessageId();
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
		final long lastMessage = USER_LIST.get(user);
		if (lastMessage == MESSAGE_STORAGE.getLastMessageId()) {
			return  new ArrayList<PrivateMessage>();
		}
		return MESSAGE_STORAGE.getLastsPrivateAfter(lastMessage, user);
	}


	public Collection<User> getUserList() {
		return USER_LIST.keySet();
	}
}
