package com.teamdev.students.chat.util;


import com.teamdev.students.chat.controller.dto.UserData;
import com.teamdev.students.chat.controller.dto.request.MessagePostRequest;
import com.teamdev.students.chat.controller.dto.request.PrivateMessagePostRequest;
import com.teamdev.students.chat.controller.dto.request.UserRegistrationRequest;
import com.teamdev.students.chat.controller.dto.response.*;
import com.teamdev.students.chat.data.Message;
import com.teamdev.students.chat.data.PrivateMessage;
import com.teamdev.students.chat.data.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;


public class ControllerUtil {

	public static MessageResponse toResponse(final Message message) throws ChatServiceException {
		if (message == null) {
			throw new ChatServiceException("Message not found");
		}
		return new MessageResponse(message.getSender().getName(), message.getText(),
				message.getSender().getColor(), message.getPostedAt());
	}

	public static PrivateMessageResponse toResponse(final PrivateMessage message) throws ChatServiceException {
		if (message == null) {
			throw new ChatServiceException("Message not found");
		}
		return new PrivateMessageResponse(message.getRecipient().getName(), message.getSender().getColor(),
				message.getText(), message.getPostedAt(), message.getSender().getName());
	}

	public static MessageResponseList toResponseArray(Collection<Message> messages) throws ChatServiceException {
		final Collection<MessageResponse> responses = new ArrayList<MessageResponse>();
		for (Message message : messages) {
			responses.add(toResponse(message));
		}
		return new MessageResponseList(responses, responses.isEmpty());
	}

	public static Message fromRequest(final MessagePostRequest request, boolean found, User user)
			throws ChatServiceException {
		if (!found) {
			throw new ChatServiceException("User \'" + request.getUsername() + "\' not found");
		}
		return new Message(UniqueIdCreator.createUniqueIndex(), request.getText(), user, new Date());
	}

	public static PrivateMessage fromPrivateRequest(final PrivateMessagePostRequest request,
													User sender, User recipient)
			throws ChatServiceException {
		if (sender == null || recipient == null) {
			throw new ChatServiceException("User not found");
		}
		return new PrivateMessage(UniqueIdCreator.createUniqueIndex(), request.getText(),
				sender, recipient, new Date());
	}

	public static User fromRequest(UserRegistrationRequest request) {
		return new User(UniqueIdCreator.createUniqueIndex(), request.getUsername().trim(),
				request.getPassword().trim(), request.getColor());
	}

	public static UserRegistrationResponse toResponse(boolean userNotExists, String username, String color) {
		String message = "Registration passed successfully";
		if (!userNotExists) {
			message = "Registration failed";
		}
		return new UserRegistrationResponse(userNotExists, username, color, message);
	}


	public static PrivateMessageResponseList toResponse(final Collection<PrivateMessage> privateMessages) throws ChatServiceException {
		final Collection<PrivateMessageResponse> responses = new ArrayList<PrivateMessageResponse>();
		for (PrivateMessage m : privateMessages) {
			responses.add(toResponse(m));
		}
		return new PrivateMessageResponseList(privateMessages.isEmpty(), responses);
	}


	public static UserListResponse toUserListResponse(Collection<User> userList) {
		final Collection<UserData> users = new ArrayList<UserData>();
		for (User user : userList) {
			users.add(new UserData(user.getName(), user.getId(), user.getColor()));
		}
		return new UserListResponse(users);
	}
}
