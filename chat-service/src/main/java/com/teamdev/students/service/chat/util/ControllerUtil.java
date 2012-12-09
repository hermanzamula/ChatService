package com.teamdev.students.service.chat.util;


import com.teamdev.students.service.chat.controller.dto.request.MessagePostRequest;
import com.teamdev.students.service.chat.controller.dto.request.PrivateMessagePostRequest;
import com.teamdev.students.service.chat.controller.dto.request.UserRegistrationRequest;
import com.teamdev.students.service.chat.controller.dto.response.MessageResponse;
import com.teamdev.students.service.chat.controller.dto.response.UserRegistrationResponse;
import com.teamdev.students.service.chat.data.Message;
import com.teamdev.students.service.chat.data.PrivateMessage;
import com.teamdev.students.service.chat.data.User;

import java.util.Date;

import static com.teamdev.students.service.chat.util.UniqueIdCreator.createUniqueIndex;


public class ControllerUtil {

    public static MessageResponse toResponse(Message message) throws ChatServiceException {
        if (message == null) {
            throw new ChatServiceException("Message not found");
        }
        return new MessageResponse(message.getSender().getName(), message.getText(), message.getPostedAt());
    }

    public static MessageResponse[] toResponseArray(Message[] messages) {
        MessageResponse[] responses = new MessageResponse[messages.length];
        String sender;
        String text;
        Date date;

        for (int i = 0; i < responses.length; i++) {
            sender = messages[i].getSender().getName();
            text = messages[i].getText();
            date = messages[i].getPostedAt();
            responses[i] = new MessageResponse(sender, text, date);
        }
        return responses;
    }

    public static Message fromRequest(MessagePostRequest request, User user)
            throws ChatServiceException {
        if (user == null) {
            throw new ChatServiceException("User \'" + request.getUsername() + "\' not found");
        }
        return new Message(createUniqueIndex(), request.getText(), user, new Date());
    }

    public static Message fromPrivateRequest(PrivateMessagePostRequest request, User sender,
                                             User recipient) throws ChatServiceException {

        if (sender == null) {
            throw new ChatServiceException("User (sender) '" + request.getUsername() + "' not found");
        }

        if (recipient == null) {
            throw new ChatServiceException("User (recipient) '" + request.getRecipient() +
                    "' not found. Sender: " + request.getUsername() + "\'");
        }
        return new PrivateMessage(createUniqueIndex(), request.getText(), sender, recipient, new Date());
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
}
