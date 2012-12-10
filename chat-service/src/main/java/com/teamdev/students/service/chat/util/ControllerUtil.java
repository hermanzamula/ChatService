package com.teamdev.students.service.chat.util;


import com.teamdev.students.service.chat.controller.dto.UserData;
import com.teamdev.students.service.chat.controller.dto.request.MessagePostRequest;
import com.teamdev.students.service.chat.controller.dto.request.PrivateMessagePostRequest;
import com.teamdev.students.service.chat.controller.dto.request.UserRegistrationRequest;
import com.teamdev.students.service.chat.controller.dto.response.*;
import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.PrivateMessage;
import com.teamdev.students.service.chat.data.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import static com.teamdev.students.service.chat.util.UniqueIdCreator.createUniqueIndex;


public class ControllerUtil {

    public static MessageResponse toResponse(final Message message) throws ChatServiceException {
        if (message == null) {
            throw new ChatServiceException("Message not found");
        }
        return new MessageResponse(message.getSender(), message.getText(), message.getPostedAt());
    }

    public static MessageResponseList toResponseArray(Collection<Message> messages) {
        final Collection<MessageResponse> responses = new ArrayList<MessageResponse>();
        for (Message m : messages) {
            final MessageResponse response = new MessageResponse(m.getSender(), m.getText(), m.getPostedAt());
            responses.add(response);
        }
        return new MessageResponseList(responses, responses.isEmpty());
    }

    public static Message fromRequest(final MessagePostRequest request, boolean found)
            throws ChatServiceException {
        if (!found) {
            throw new ChatServiceException("User \'" + request.getUsername() + "\' not found");
        }
        return new Message(createUniqueIndex(), request.getText(), request.getUsername(), new Date());
    }

    public static PrivateMessage fromPrivateRequest(final PrivateMessagePostRequest request, boolean isRecipientFound)
            throws ChatServiceException {
        if (!isRecipientFound) {
            throw new ChatServiceException("User (recipient) '" + request.getRecipient() +
                    "' not found. Sender: " + request.getUsername() + "\'");
        }
        return new PrivateMessage(createUniqueIndex(), request.getText(),
                request.getUsername(), request.getRecipient(), new Date());
    }

    public static User fromRequest(UserRegistrationRequest request) {
        return new User(createUniqueIndex(), request.getUsername(), request.getPassword());
    }

    public static UserRegistrationResponse toResponse(boolean userNotExists, String username) {
        String message = "Registration passed successfully";
        if (!userNotExists) {
            message = "Registration failed";
        }
        return new UserRegistrationResponse(userNotExists, username, message);
    }


    public static PrivateMessageResponseList toResponse(final Collection<PrivateMessage> privateMessages) {
        final Collection<PrivateMessageResponse> responses = new ArrayList<PrivateMessageResponse>();
        for (PrivateMessage m : privateMessages) {
            final PrivateMessageResponse response = new PrivateMessageResponse(m.getRecipient(),
                    m.getText(), m.getPostedAt(), m.getSender());
            responses.add(response);
        }
        return new PrivateMessageResponseList(privateMessages.isEmpty(), responses);
    }


    public static UserListResponse toResponse(Collection<User> userList) {
        final Collection<UserData> users = new ArrayList<UserData>();
        for (User user : userList){
            users.add(new UserData(user.getName(), user.getId()));
        }
        return new UserListResponse(users);
    }


    public static ChangesResponse toResponse(List<String> changeList) {
        return new ChangesResponse(changeList.isEmpty(), changeList);
    }
}
